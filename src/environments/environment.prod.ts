const API_URL = 'http://fake-api-url.com';

export const environment = {
  endpoints: {
    auth: {
      register: `${API_URL}/auth/register`,
      login: `${API_URL}/auth/login`,
      logout: `${API_URL}/auth/logout`,
    },
    users: {
      me: `${API_URL}/users/me`,
      changePassword: `${API_URL}/users/password`,
    },
    analysis: {
      predict: `${API_URL}/predict`,
    },
  },
};
