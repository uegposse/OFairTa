import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database/prisma";

const storeSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
});

const storeUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
});

export const createStore = async (req: Request, res: Response) => {
  try {
    const { name, description } = storeSchema.parse(req.body);
    const { id } = req.user;

    const store = await prisma.store.create({
      data: {
        name,
        description,
        user: {
          connect: { id: id },
        },
      },
    });

    return res.status(201).json(store);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllStore = async (req: Request, res: Response) => {
  try {
    const store = await prisma.store.findMany({
      select: {
        id: true,
        name: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!store) {
      return res.status(400).json({ message: "Nenhuma banca encontrada" });
    }

    return res.status(200).json(store);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllStoreByOwner = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const stores = await prisma.store.findMany({
      where: {
        userId: id,
      },
    });

    if (!stores) {
      return res.status(400).json({ message: "Nenhuma banca encontrada" });
    }

    return res.status(200).json(stores);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getUniqueStoreByOwner = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    const { id } = req.user;

    const stores = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
      include: {
        products: true,
      },
    });

    if (stores?.userId !== id) {
      return res
        .status(400)
        .json({ message: "Usuário não e dono desta banca." });
    }

    if (!stores) {
      return res.status(400).json({ message: "Nenhuma banca encontrada" });
    }

    return res.status(200).json(stores);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateStore = async (req: Request, res: Response) => {
  try {
    const { name, description } = storeUpdateSchema.parse(req.body);
    const { id } = req.user;
    const { storeId } = req.params;

    const isStore = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (isStore?.userId !== id) {
      return res
        .status(400)
        .json({ message: "Banca não pertence e esse usuário." });
    }

    if (!isStore) {
      return res.status(400).json({ message: "Banca não encontrada." });
    }

    const updateStore = await prisma.store.update({
      where: { id: storeId },
      data: {
        name,
        description,
      },
    });

    return res.status(200).json(updateStore);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteStore = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { storeId } = req.params;

    const isStore = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (isStore?.userId !== id) {
      return res
        .status(400)
        .json({ message: "Banca não pertence e esse usuário." });
    }

    if (!isStore) {
      return res.status(400).json({ message: "Banca não encontrada." });
    }

    await prisma.store.delete({
      where: { id: storeId },
    });

    return res.status(200).json({ message: "Banca excluida com sucesso." });
  } catch (error) {
    return res.status(400).json(error);
  }
};
