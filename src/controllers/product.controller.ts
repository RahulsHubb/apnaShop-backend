import { Request, Response } from "express";

export const getProducts = (_: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: [
      { id: 1, name: "T-Shirt", price: 999 },
      { id: 2, name: "Shoes", price: 2999 },
    ],
  });
};
