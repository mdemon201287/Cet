import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
}

const categorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
