import { PrismaClient } from '@prisma/client';
import { env } from '../config/env.js';

const global_for_prisma = globalThis;

export const prisma =
  global_for_prisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (env.NODE_ENV !== 'production') {
  global_for_prisma.prisma = prisma;
}
