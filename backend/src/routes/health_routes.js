import { Router } from 'express';
import { health_check } from '../controllers/health_controller.js';

const health_routes = Router();

health_routes.get('/', health_check);

export default health_routes;
