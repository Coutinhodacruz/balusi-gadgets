import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();
        
        // Fetch all products from the database
        const products = await Product.find({}).sort({ createdAt: -1 }).lean();
        
        return NextResponse.json({ products }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ message: 'Error fetching products', error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        
        const data = await req.json();
        
        const newProduct = await Product.create(data);
        
        return NextResponse.json({ product: newProduct }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating product:', error);
        return NextResponse.json({ message: 'Error creating product', error: error.message }, { status: 500 });
    }
}
