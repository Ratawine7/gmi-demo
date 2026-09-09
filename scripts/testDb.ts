import dotenv from 'dotenv';
import mongoose from 'mongoose';
import databaseConnect, { databaseDisconnect } from '@/config/database';

dotenv.config({ path: ['config/config.env', '.env.local'] });

async function main() {
  const started = Date.now();
  await databaseConnect();

  const admin = mongoose.connection.db?.admin();
  const ping = await admin?.ping();
  const collections = await mongoose.connection.db?.listCollections().toArray();

  console.log(`ping: ${JSON.stringify(ping)}`);
  console.log(`database: ${mongoose.connection.name}`);
  console.log(`collections: ${collections?.map((c) => c.name).join(', ') || '(none yet)'}`);
  console.log(`connected in ${Date.now() - started}ms`);

  await databaseDisconnect();
}

main().catch((error) => {
  console.error('Connection test failed:', error instanceof Error ? error.message : error);
  process.exit(1);
});
