import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
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

// User Schema exact copy to avoid import issues
const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true, select: false },
        role: { type: String, enum: ['user', 'admin'], default: 'admin' },
    },
    { timestamps: true }
);

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(uri);
        console.log('Connected!');

        const existingAdmin = await User.findOne({ email: 'admin@balusi.com' });
        if (existingAdmin) {
            console.log('Admin already exists. email: admin@balusi.com | password: admin');
            return;
        }

        await User.create({
            name: 'Balusi Admin',
            email: 'admin@balusi.com',
            password: 'admin',
            role: 'admin'
        });

        console.log('Admin user seeded successfully!');
        console.log('Email: admin@balusi.com');
        console.log('Password: admin');
        
    } catch (e) {
        console.error('Error seeding admin:', e);
    } finally {
        await mongoose.disconnect();
    }
}

seed();
