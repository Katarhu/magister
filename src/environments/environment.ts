const API_URL = 'http://fake-api-url.com';

export const environment = {
  endpoints: {
    auth: {
      register: `${API_URL}/auth/register`,
      login: `${API_URL}/auth/login`,
      logout: `${API_URL}/auth/logout`,
    },
    users: {
      me: `${API_URL}/profile`,
      changePassword: `${API_URL}/profile`,
    },
    analyses: {
      predict: `${API_URL}/analysis/predict`,
      fetchPredictedAnalyses: `${API_URL}/analysis/history`,
    },
  },
};
