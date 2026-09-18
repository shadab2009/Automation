import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() { const email=process.env.SEED_EMAIL ?? 'admin@example.com'; const password=process.env.SEED_PASSWORD ?? 'ChangeMe123!'; const user=await prisma.user.upsert({where:{email},update:{},create:{email,passwordHash:await bcrypt.hash(password,12),profile:{create:{displayName:'Shadab'}},settings:{create:{}}}}); console.log(`Seeded ${user.email}`); }
main().finally(()=>prisma.$disconnect());
