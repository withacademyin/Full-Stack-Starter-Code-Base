import { get_health_status } from '../services/health_service.js';
import { success_response } from '../utils/api_response.js';

export const health_check = async (req, res, next) => {
  try {
    const data = await get_health_status();
    return success_response(res, { message: 'Service health', data });
  } catch (error) {
    return next(error);
  }
};
