import { GetSignedUrlConfig } from "@google-cloud/storage";
import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "../database/prisma";
import { storage } from "../firebase";

export const createUser = async (req: Request, res: Response) => {
  const userSchema = z.object({
    name: z
      .string()
      .min(3, { message: "O nome deve conter no mínimo 3 caracteres." }),
    email: z.string().email(),
    cpf: z
      .string()
      .min(11, { message: "O CPF deve conter no mínimo 11 caracteres." }),
    password: z
      .string()
      .min(6, { message: "A senha deve conter no mínimo 6 caracteres." }),
    accessLevelName: z.string(),
  });
  try {
    const { name, email, cpf, password, accessLevelName } = userSchema.parse(
      req.body
    );

    const isUser = await prisma.user.findUnique({ where: { email } });

    if (isUser) {
      return res
        .status(400)
        .json({ message: "Já existe um usuário com este e-mail!" });
    }

    const isAccessLevel = await prisma.accessLevel.findUnique({
      where: { name: accessLevelName },
    });

    if (!isAccessLevel) {
      return res
        .status(400)
        .json({ message: "Nível de acesso não encontrado!" });
    }

    const hash_password = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash_password,
        cpf,
        accessLevels: {
          connect: {
            id: isAccessLevel.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        accessLevels: {
          select: {
            name: true,
          },
        },
      },
    });

    if (users.length <= 0) {
      res.status(204).json({ message: "Nenhum usuário encontrado!" });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getUniqueUser = async (req: Request, res: Response) => {
  const { id } = req.user;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      cpf: true,
      image: true,
      accessLevels: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!user) {
    return res.status(404).json({ message: "usuário não encontrado!" });
  }

  return res.status(200).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, cpf } = req.body;
    const { id } = req.user;

    const isUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!isUser) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        cpf,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        accessLevels: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({ message: "Usuário apagado com sucesso." });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const addProfileImage = async (req: Request, res: Response) => {
  const { id } = req.user;

  const isUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isUser) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  const requestImage = req.file as Express.Multer.File;

  console.log(requestImage);

  if (!requestImage) {
    return res
      .status(400)
      .json({ message: "Nenhum arquivo de imagem enviado." });
  }

  const bucket = storage.bucket();

  const fileRef = bucket.file(requestImage.originalname);
  const fileStream = fileRef.createWriteStream({
    metadata: {
      contentType: requestImage.mimetype,
    },
  });

  fileStream.on("error", (error) => {
    console.error(error);
    res.status(400).json(error + " Não foi possível carregar a imagem.");
  });

  fileStream.on("finish", () => {
    res.status(200).json("Imagem enviada com sucesso.");
  });

  fileStream.end(requestImage.buffer);

  const config: GetSignedUrlConfig = {
    action: "read",
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };

  const [url] = await fileRef.getSignedUrl(config);

  const updated = await prisma.user.update({
    where: {
      id,
    },
    data: {
      image: url,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return res.status(200).json(updated);
};

export class UserController {
  async createHistoryProducer(req: Request, res: Response) {
    const { id } = req.user;
    const { historyContent } = req.body;
    const history = await prisma.user.update({
      where: { id },
      data: {
        historiy: historyContent,
      },
    });

    return res.status(201).json(history);
  }
}
