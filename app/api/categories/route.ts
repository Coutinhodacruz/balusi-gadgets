import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET() {
    try {
        await dbConnect();
        
        // Fetch all categories from the database, sort by id ascending
        const categories = await Category.find({}).sort({ id: 1 }).lean();
        
        return NextResponse.json({ categories }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ message: 'Error fetching categories', error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        
        const data = await req.json();
        
        // Let's create a Category
        const newCategory = await Category.create(data);
        
        return NextResponse.json({ category: newCategory }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating category:', error);
        return NextResponse.json({ message: 'Error creating category', error: error.message }, { status: 500 });
    }
}
