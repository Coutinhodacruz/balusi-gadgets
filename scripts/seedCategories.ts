import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

// Parse .env file manually since dotenv might not be installed
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

const CategorySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const DEFAULT_CATEGORIES = [
  {
    id: 1,
    name: 'iPhones',
    subtitle: 'Latest & UK Used',
    image: '/categories/iphones.jpg',
  },
  {
    id: 2,
    name: 'Samsung',
    subtitle: 'Galaxy Series',
    image: '/categories/samsung.jpg',
  },
  {
    id: 3,
    name: 'MacBooks',
    subtitle: 'Pro & Air Models',
    image: '/categories/macbooks.jpg',
  },
  {
    id: 4,
    name: 'HP Laptops',
    subtitle: 'Spectre & Pavilion',
    image: '/categories/hp-laptops.jpg',
  },
  {
    id: 5,
    name: 'Dell Laptops',
    subtitle: 'XPS & Inspiron',
    image: '/categories/dell-laptops.jpg',
  },
  {
    id: 6,
    name: 'Accessories',
    subtitle: 'AirPods & Watches',
    image: '/categories/accessories.jpg',
  },
  {
    id: 7,
    name: 'Smart Watches',
    subtitle: 'Apple & Android',
    image: '/categories/smart-watches.jpg',
  },
  {
    id: 8,
    name: 'Smart Glasses',
    subtitle: 'Premium Tech',
    image: '/categories/smart-glasses.jpg',
  },
];

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(uri);
        console.log('Connected to DB successfully!');

        // Clear existing to avoid duplicates when re-running
        await Category.deleteMany({});
        console.log('Cleared existing categories from collection.');

        await Category.insertMany(DEFAULT_CATEGORIES);
        console.log(`Inserted ${DEFAULT_CATEGORIES.length} categories successfully!`);
    } catch (e) {
        console.error('Error seeding categories:', e);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from DB.');
    }
}

seed();
