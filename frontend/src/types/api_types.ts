export type Api_success_response<T> = {
  success: true;
  message: string;
  data: T;
};

export type Api_error_response = {
  success: false;
  message: string;
  errors?: unknown;
};

export type Health_status = {
  status: string;
  uptime_seconds: number;
  database: string;
  timestamp: string;
};

export type User = {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
};
