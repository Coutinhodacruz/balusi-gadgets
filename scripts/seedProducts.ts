import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

// Parse .env file manually
const envPath = path.resolve(process.cwd(), '.env');
let uri = '';
if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    const match = envFile.match(/MONGODB_URI=(.+)/);
    if (match) {
        uri = match[1].trim();
    }
}

if (!uri) uri = process.env.MONGODB_URI as string;

if (!uri) {
    console.error('Error: MONGODB_URI is not defined in .env.');
    process.exit(1);
}

const ProductSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    condition: { type: String, required: true },
    price: { type: Number, required: true },
    specs: { type: String, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const DEFAULT_PRODUCTS = [
  { id: '1', name: 'iPhone 16', category: 'phones', brand: 'Apple', condition: 'new', price: 1180000, specs: '256GB · A18 · Physical + eSIM', image: '/products/iphone-16.jpg' },
  { id: '2', name: 'iPhone 16', category: 'phones', brand: 'Apple', condition: 'new', price: 1440000, specs: '512GB · A18 · Physical + eSIM', image: '/products/iphone-16.jpg' },
  { id: '3', name: 'iPhone 16 Plus', category: 'phones', brand: 'Apple', condition: 'new', price: 1200000, specs: '128GB · A18 · 6.7" Display', image: '/products/iphone-16-plus.jpg' },
  { id: '4', name: 'Samsung S26 Ultra', category: 'phones', brand: 'Samsung', condition: 'new', price: 1620000, specs: '256GB (Black) · Physical + eSIM', image: '/products/samsung-s26-ultra.jpg' },
  { id: '5', name: 'Samsung S26 Ultra', category: 'laptops', brand: 'Samsung', condition: 'new', price: 1790000, specs: 'Premium Display · Latest Processor', image: '/products/samsung-s26-ultra.jpg' },
  { id: '6', name: 'Samsung Galaxy Z Fold 7', category: 'laptops', brand: 'Samsung', condition: 'new', price: 1700000, specs: 'Foldable Display · Premium Build', image: '/products/samsung-z-fold.jpg' },
  { id: '7', name: 'MacBook Pro 16"', category: 'laptops', brand: 'Apple', condition: 'new', price: 1800000, specs: 'M4 Pro · 16GB RAM · 512GB SSD', image: '/products/macbook-pro.jpg' },
  { id: '8', name: 'HP Spectre x360', category: 'laptops', brand: 'HP', condition: 'new', price: 850000, specs: 'Intel i7 · 16GB RAM · Touchscreen', image: '/products/hp-spectre-x360.jpg' },
  { id: '9', name: 'AirPods Pro 2', category: 'accessories', brand: 'Apple', condition: 'new', price: 185000, specs: 'Active Noise Cancellation · Wireless', image: '/products/airpods-pro.jpg' },
  { id: '10', name: 'Apple Watch Series 10', category: 'accessories', brand: 'Apple', condition: 'new', price: 290000, specs: 'AMOLED Display · Health Tracking', image: '/products/apple-watch.jpg' },
  { id: '11', name: 'Samsung Galaxy Buds', category: 'accessories', brand: 'Samsung', condition: 'new', price: 145000, specs: 'Wireless Earbuds · ANC · IPX7', image: '/products/samsung-buds.jpg' },
  { id: '12', name: 'Samsung Smart Watch', category: 'accessories', brand: 'Samsung', condition: 'used', price: 95000, specs: 'AMOLED Display · Fitness Features', image: '/products/samsung-watch.jpg' },
];

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(uri);
        console.log('Connected to DB successfully!');

        // Clear existing to avoid duplicates when re-running
        await Product.deleteMany({});
        console.log('Cleared existing products from collection.');

        await Product.insertMany(DEFAULT_PRODUCTS);
        console.log(`Inserted ${DEFAULT_PRODUCTS.length} products successfully!`);
    } catch (e) {
        console.error('Error seeding products:', e);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from DB.');
    }
}

seed();
