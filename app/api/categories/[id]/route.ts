import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const id = (await params).id;
        const data = await req.json();
        
        const updatedCategory = await Category.findOneAndUpdate({ id: Number(id) }, data, { new: true });
        
        if (!updatedCategory) {
            return NextResponse.json({ message: 'Category not found' }, { status: 404 });
        }
        
        return NextResponse.json({ category: updatedCategory }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error updating category', error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const id = (await params).id;
        
        const deletedCategory = await Category.findOneAndDelete({ id: Number(id) });
        
        if (!deletedCategory) {
            return NextResponse.json({ message: 'Category not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error deleting category', error: error.message }, { status: 500 });
    }
}
