import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const performSale = async (req: Request, res: Response) => {
  const { products, userSellerId } = req.body;
  const { id } = req.user;

  try {
    // Busca os produtos selecionados pelo usuário
    const productsByDatabase = await prisma.product.findMany({
      where: {
        id: { in: products.map((product: any) => product.id) },
      },
    });

    // Adiciona a quantidade de cada produto selecionado
    const productsWithQuantity = productsByDatabase.map((product) => {
      const { id, name, price } = product;
      const quantity = products.find((p: any) => p.id === product.id).quantity;
      return {
        id,
        name,
        price,
        quantity,
      };
    });

    // Calcula o valor total da venda
    let amount = 0;
    for (const product of productsWithQuantity) {
      amount += product.price * parseInt(product.quantity);
    }

    // Cria a venda no banco de dados
    const sale = await prisma.sale.create({
      data: {
        total_value: amount,
        date: new Date(),
        seller: { connect: { id: userSellerId } },
        buyer: { connect: { id: id } },
        saleProducts: {
          create: productsWithQuantity.map((product) => ({
            product: { connect: { id: product.id } },
            quantity: product.quantity,
          })),
        },
      },
      include: {
        saleProducts: true,
      },
    });

    // Atualiza a quantidade de cada produto vendido na tabela de produtos
    productsWithQuantity.map(async (product) => {
      await prisma.product.updateMany({
        where: { id: product.id },
        data: {
          quantity: {
            decrement: parseInt(product.quantity),
          },
        },
      });
    });

    res.status(200).json({ message: "Compra realizada com sucesso", sale });
  } catch (error) {
    res.status(400).json(error);
  }
};
export const getAllSales = async (req: Request, res: Response) => {
  try {
    const sales = await prisma.sale.findMany();

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getAllSaleByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const allSales = await prisma.sale.findMany({
      where: {
        buyerId: id,
      },
      select: {
        id: true,
        total_value: true,
        seller: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        status: true,
      },
    });

    return res.status(200).json(allSales);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getDetailsSaleByUserId = async (req: Request, res: Response) => {
  try {
    const { saleId } = req.params;

    const DetailsSales = await prisma.sale.findUnique({
      where: {
        id: saleId,
      },
      select: {
        id: true,
        total_value: true,
        saleProducts: {
          select: {
            product: {
              select: {
                id: true,
                image: true,
                name: true,
                price: true,
              },
            },
            quantity: true,
          },
        },
        createdAt: true,
        status: true,
      },
    });

    if (!DetailsSales) {
      return res
        .status(400)
        .json({ message: "Nenhum detalhe encontrado para essa compra." });
    }

    return res.status(200).json(DetailsSales);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getAllSaleByOwner = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const allSales = await prisma.sale.findMany({
      where: {
        sellerId: id,
      },
      select: {
        id: true,
        total_value: true,
        buyer: {
          select: {
            id: true,
            name: true,
          },
        },
        saleProducts: true,
        createdAt: true,
        status: true,
      },
    });

    return res.status(200).json(allSales);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const updateClosedSaleByOwner = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { saleId } = req.params;
    const { status } = req.body;

    const sale = await prisma.sale.findUnique({
      where: {
        id: saleId,
      },
    });

    if (sale?.sellerId !== id) {
      return res
        .status(400)
        .json({ message: "Está venda não pertence a esté vendedor." });
    }

    const updateSaleByOwner = await prisma.sale.update({
      where: {
        id: saleId,
      },
      data: {
        status,
      },
    });

    return res.status(200).json(updateSaleByOwner);
  } catch (error) {
    return res.status(400).json(error);
  }
};
