import { Request, Response, NextFunction } from "express";
import { products } from "../data/products";
import { Product } from "../types/product";
import { AppError } from "../utils/AppError";

// GET ALL PRODUCTS
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// GET PRODUCT BY ID
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const product = products.find((product) => product.id === id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// CREATE PRODUCT
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newProduct: Product = {
      id:
        products.length > 0
          ? Math.max(...products.map((product) => product.id)) + 1
          : 1,

      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
      stock: Number(req.body.stock),
      description: req.body.description
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE PRODUCT
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const productIndex = products.findIndex(
      (product) => product.id === id
    );

    if (productIndex === -1) {
      return next(new AppError("Product not found", 404));
    }

    products[productIndex] = {
      ...products[productIndex],
      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
      stock: Number(req.body.stock),
      description: req.body.description
    };

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: products[productIndex]
    });
  } catch (error) {
    next(error);
  }
};

// DELETE PRODUCT
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const productIndex = products.findIndex(
      (product) => product.id === id
    );

    if (productIndex === -1) {
      return next(new AppError("Product not found", 404));
    }

    products.splice(productIndex, 1);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};