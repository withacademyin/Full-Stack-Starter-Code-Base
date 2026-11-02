import { prisma } from '../lib/prisma_client.js';
import { AppError } from '../utils/app_error.js';

export const create_user = async ({ email, full_name }) => {
  return prisma.user.create({
    data: { email, full_name },
  });
};

export const list_users = async () => {
  return prisma.user.findMany({
    orderBy: { created_at: 'desc' },
  });
};

export const get_user_by_id = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};
