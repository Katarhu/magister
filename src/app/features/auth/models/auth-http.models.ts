export interface LoginRequestBody {
  username: string;
  password: string;
}

export interface LoginResponseBody {
  access_token: string;
}

export interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}
