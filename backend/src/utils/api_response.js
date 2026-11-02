export const success_response = (res, { status_code = 200, message = 'Success', data = null } = {}) => {
  return res.status(status_code).json({
    success: true,
    message,
    data,
  });
};

export const error_response = (res, { status_code = 500, message = 'Internal server error', errors = null } = {}) => {
  return res.status(status_code).json({
    success: false,
    message,
    errors,
  });
};
