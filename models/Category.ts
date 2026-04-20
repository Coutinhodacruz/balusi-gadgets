import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    id: number;
    name: string;
    subtitle: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
    {
        id: { type: Number, required: true, unique: true },
        name: { type: String, required: true },
        subtitle: { type: String, required: true },
        image: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
