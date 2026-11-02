import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/app_error.js';
import { error_response } from '../utils/api_response.js';
import { env } from '../config/env.js';

export const not_found_handler = (req, res) => {
  return error_response(res, {
    status_code: 404,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export const error_handler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    return error_response(res, {
      status_code: err.status_code,
      message: err.message,
      errors: err.errors,
    });
  }

  if (err instanceof ZodError) {
    return error_response(res, {
      status_code: 400,
      message: 'Validation failed',
      errors: err.flatten().fieldErrors,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return error_response(res, {
        status_code: 409,
        message: 'A record with this unique field already exists',
        errors: { fields: err.meta?.target ?? null },
      });
    }

    if (err.code === 'P2025') {
      return error_response(res, {
        status_code: 404,
        message: 'Record not found',
      });
    }
  }

  console.error(err);

  return error_response(res, {
    status_code: 500,
    message: env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
};
