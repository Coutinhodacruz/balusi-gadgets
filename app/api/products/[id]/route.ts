import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const id = (await params).id;
        const data = await req.json();
        
        const updatedProduct = await Product.findOneAndUpdate({ id }, data, { new: true });
        
        if (!updatedProduct) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        
        return NextResponse.json({ product: updatedProduct }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error updating product', error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const id = (await params).id;
        
        const deletedProduct = await Product.findOneAndDelete({ id });
        
        if (!deletedProduct) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error deleting product', error: error.message }, { status: 500 });
    }
}
