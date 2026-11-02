import { prisma } from '../lib/prisma_client.js';

export const get_health_status = async () => {
  let database = 'up';

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    database = 'down';
  }

  return {
    status: database === 'up' ? 'ok' : 'degraded',
    uptime_seconds: Math.floor(process.uptime()),
    database,
    timestamp: new Date().toISOString(),
  };
};
