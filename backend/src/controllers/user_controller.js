import { create_user, get_user_by_id, list_users } from '../services/user_service.js';
import { success_response } from '../utils/api_response.js';

export const create_user_handler = async (req, res, next) => {
  try {
    const user = await create_user(req.validated.body);
    return success_response(res, {
      status_code: 201,
      message: 'User created',
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

export const list_users_handler = async (req, res, next) => {
  try {
    const users = await list_users();
    return success_response(res, { message: 'Users fetched', data: users });
  } catch (error) {
    return next(error);
  }
};

export const get_user_by_id_handler = async (req, res, next) => {
  try {
    const user = await get_user_by_id(req.validated.params.id);
    return success_response(res, { message: 'User fetched', data: user });
  } catch (error) {
    return next(error);
  }
};
