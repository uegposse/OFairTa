import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createAddress = async (req: Request, res: Response) => {
  try {
    const { street, city, neighborhood, CEP, state } = req.body;
    const { id } = req.user;

    const address = await prisma.address.create({
      data: {
        street,
        city,
        neighborhood,
        CEP,
        state,
        userId: id,
      },
    });

    return res.status(201).json(address);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const address = await prisma.address.findMany({
      where: {
        userId: id,
      },
    });

    return res.status(200).json(address);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { addressId } = req.params;
    const { id } = req.user;

    const address = await prisma.address.findUnique({
      where: {
        id: addressId,
      },
    });

    if (!address) {
      return res.status(404).json({ message: "Endereço não encontrado." });
    }

    if (address.userId !== id) {
      return res
        .status(400)
        .json({ message: "Endereço não partence a esse usuário." });
    }

    await prisma.address.delete({
      where: {
        id: addressId,
      },
    });

    return res.status(200).json({ message: "Endereço removido com sucesso." });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { street, city, neighborhood, CEP, state } = req.body;
    const { addressId } = req.params;
    const { id } = req.user;

    const address = await prisma.address.findUnique({
      where: {
        id: addressId,
      },
    });

    if (!address) {
      return res.status(404).json({ message: "Endereço não encontrado." });
    }

    if (address.userId !== id) {
      return res
        .status(400)
        .json({ message: "Endereço não partence a esse usuário." });
    }

    await prisma.address.update({
      where: {
        id: addressId,
      },
      data: {
        street,
        city,
        neighborhood,
        CEP,
        state,
      },
    });

    return res.status(200).send();
  } catch (error) {
    return res.status(400).json(error);
  }
};
