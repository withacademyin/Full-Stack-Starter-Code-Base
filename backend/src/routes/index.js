import { Router } from 'express';
import health_routes from './health_routes.js';
import user_routes from './user_routes.js';

const api_routes = Router();

api_routes.use('/health', health_routes);
api_routes.use('/users', user_routes);

export default api_routes;
