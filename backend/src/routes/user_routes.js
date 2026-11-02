import { Router } from 'express';
import {
  create_user_handler,
  get_user_by_id_handler,
  list_users_handler,
} from '../controllers/user_controller.js';
import { validate_request } from '../middlewares/validate_request.js';
import { create_user_schema, get_user_by_id_schema } from '../validators/user_validator.js';

const user_routes = Router();

user_routes.get('/', list_users_handler);
user_routes.post('/', validate_request(create_user_schema), create_user_handler);
user_routes.get('/:id', validate_request(get_user_by_id_schema), get_user_by_id_handler);

export default user_routes;
