export class AppError extends Error {
  constructor(message, status_code = 500, errors = null) {
    super(message);
    this.name = 'AppError';
    this.status_code = status_code;
    this.errors = errors;
    this.is_operational = true;
  }
}
