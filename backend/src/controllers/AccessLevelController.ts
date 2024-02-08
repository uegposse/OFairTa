import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database/prisma";

const accessLevelSchema = z.object({
  name: z.string(),
});

export const createAccessLevel = async (req: Request, res: Response) => {
  try {
    const { name } = accessLevelSchema.parse(req.body);

    const isAccessLevel = await prisma.accessLevel.findUnique({
      where: { name },
    });

    if (isAccessLevel) {
      return res
        .status(400)
        .json({ message: "Já existe um nível de acesso com este nome!" });
    }

    const accessLevel = await prisma.accessLevel.create({
      data: {
        name,
      },
    });

    return res.status(201).json(accessLevel);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getAllAccessLevel = async (req: Request, res: Response) => {
  try {
    const accessLevel = await prisma.accessLevel.findMany();

    if (accessLevel.length <= 0) {
      return res
        .status(204)
        .json({ message: "Nenhum nível de acesso encontrado." });
    }

    return res.status(200).json(accessLevel);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
