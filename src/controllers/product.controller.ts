import { Request, Response } from "express";
import Product from "../models/product.model.js";
import slugify from "slugify";
import mongoose from "mongoose";

export const getProductVariants = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params; //Payload

    const product = await Product.findById(productId).select("variants");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      variants: product.variants,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addVariant = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params; //Use this at the url first
    const { size, color, price, originalPrice, stock, sku } = req.body; //Payload

    if (!price || !stock || !sku) {
      return res.status(400).json({
        success: false,
        message: "Price, stock and SKU are required",
      });
    }

    // Check duplicate SKU globally
    const skuExists = await Product.findOne({
      "variants.sku": sku,
    });

    if (skuExists) {
      return res.status(400).json({
        success: false,
        message: "SKU already exists",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.variants.push({
      size,
      color,
      price,
      originalPrice,
      stock,
      sku,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Variant added successfully",
      variants: product.variants,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateVariant = async (req: Request, res: Response) => {
  try {
    const { productId, sku } = req.params;
    const updates = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: productId, "variants.sku": sku },
      {
        $set: Object.keys(updates).reduce((acc: any, key) => {
          acc[`variants.$.${key}`] = updates[key];
          return acc;
        }, {}),
      },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Variant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Variant updated successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteVariant = async (req: Request, res: Response) => {
  try {
    const { productId, sku } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check variant exists
    const variantExists = product.variants.find(v => v.sku === sku);

    if (!variantExists) {
      return res.status(404).json({
        success: false,
        message: "Variant not found",
      });
    }

    // Prevent deleting last variant (important safety rule)
    if (product.variants.length === 1) {
      return res.status(400).json({
        success: false,
        message: "Product must have at least one variant",
      });
    }

    // Remove variant
    product.variants = product.variants.filter(v => v.sku !== sku);

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Variant deleted successfully",
      variants: product.variants,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// for postProduct api payload is below

// {
//   "title": "Classic Cotton Shirt",
//   "description": "Premium quality cotton shirt",
//   "category": "65b123abc...",
//   "brand": "65b321def...",
//   "images": ["shirt1.jpg", "shirt2.jpg"],
//   "variants": [
//     {
//       "size": "M",
//       "color": "Red",
//       "price": 999,
//       "originalPrice": 1299,
//       "stock": 10,
//       "sku": "SHIRT-RED-M"
//     }
//   ],
//   "tags": ["cotton", "summer"],
//   "isFeatured": true
// }

export const postProduct = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      category,
      brand,
      images,
      variants,
      tags,
      isFeatured,
    } = req.body;

    // Basic validation
    if (!title || !description || !category || !images || !variants) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Generate slug
    let slug = slugify(title, { lower: true, strict: true });

    // Ensure unique slug
    const existingSlug = await Product.findOne({ slug });
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    const newProduct = new Product({
      title,
      slug,
      description,
      category,
      brand,
      images,
      variants,
      tags,
      isFeatured,
    });

    if (!variants.length) {
      return res.status(400).json({
        success: false,
        message: "At least one variant is required",
      });
    }
    const skuExists = await Product.findOne({
      "variants.sku": { $in: variants.map((v: any) => v.sku) },
    });

    if (skuExists) {
      return res.status(400).json({
        success: false,
        message: "One or more SKUs already exist",
      });
    } //This code can be ignre also condition apply

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      rating,
      search,
      sort,
    } = req.query;

    const query: any = { isActive: true };

    // Category filter
    if (category) {
      query.category = category;
    }

    // Rating filter
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Price filter (based on variants price)
    if (minPrice || maxPrice) {
      query["variants.price"] = {};
      if (minPrice) query["variants.price"].$gte = Number(minPrice);
      if (maxPrice) query["variants.price"].$lte = Number(maxPrice);
    }

    // Sorting
    let sortOption: any = { createdAt: -1 };

    if (sort === "price-asc") sortOption = { "variants.price": 1 };
    if (sort === "price-desc") sortOption = { "variants.price": -1 };
    if (sort === "rating") sortOption = { rating: -1 };
    if (sort === "newest") sortOption = { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .populate("category", "name slug")
      .populate("brand", "name")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    return res.status(200).json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalProducts: total,
      data: products,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updates = { ...req.body };

    // Prevent manual slug override
    delete updates.slug;

    // If title is updated → regenerate slug
    if (updates.title) {
      let newSlug = slugify(updates.title, { lower: true, strict: true });

      const existingSlug = await Product.findOne({
        slug: newSlug,
        _id: { $ne: productId },
      });

      if (existingSlug) {
        newSlug = `${newSlug}-${Date.now()}`;
      }

      updates.slug = newSlug;
    }
    if (updates.variants && updates.variants.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product must have at least one variant",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(productId)
      .populate("category", "name slug")
      .populate("brand", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully (soft delete)",
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



