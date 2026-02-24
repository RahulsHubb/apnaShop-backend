import mongoose, { Schema, Document, Types } from "mongoose";

export interface IVariant {
  size?: string;
  color?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sku: string;
}

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  category: Types.ObjectId;
  brand?: Types.ObjectId;
  images: string[];
  variants: IVariant[];
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
}

const variantSchema = new Schema<IVariant>(
  {
    size: String,
    color: String,

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    originalPrice: {
      type: Number,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { _id: false }
);

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    variants: [variantSchema],

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    tags: [String],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
