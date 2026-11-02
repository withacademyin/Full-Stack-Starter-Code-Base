import { z } from 'zod';

export const create_user_schema = z.object({
  body: z.object({
    email: z.string().email('Valid email is required'),
    full_name: z.string().min(2, 'full_name must be at least 2 characters').max(100),
  }),
});

export const get_user_by_id_schema = z.object({
  params: z.object({
    id: z.string().min(1, 'id is required'),
  }),
});
