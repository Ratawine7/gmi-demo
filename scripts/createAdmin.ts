import dotenv from 'dotenv';
import databaseConnect, { databaseDisconnect } from '@/config/database';
import { hashPassword } from '@/lib/adminAuth';
import { AdminModel } from '@/models/Admin';

dotenv.config({ path: ['config/config.env', '.env.local'] });

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || 'GMI Admin';

  if (!email || !password) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD before running npm run admin:create.');
  }

  if (password.length < 12) {
    throw new Error('ADMIN_PASSWORD must be at least 12 characters long.');
  }

  await databaseConnect();

  const passwordHash = hashPassword(password);
  const admin = await AdminModel.findOneAndUpdate(
    { email },
    { $set: { email, name, passwordHash, role: 'admin', isActive: true } },
    { upsert: true, returnDocument: 'after' }
  );

  console.log(`Admin account ready: ${admin.email}`);
}

createAdmin()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await databaseDisconnect();
  });
