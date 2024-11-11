const API_URL = 'http://localhost:8000';

export const environment = {
  endpoints: {
    auth: {
      register: `${API_URL}/auth/register`,
      login: `${API_URL}/auth/login`,
      logout: `${API_URL}/auth/logout`,
    },
    users: {
      me: `${API_URL}/auth/profile`,
      changePassword: `${API_URL}/auth/profile`,
    },
    analyses: {
      predict: `${API_URL}/analysis/predict`,
      fetchAnalysis: (id: string) => `${API_URL}/analysis/${id}`,
      fetchPredictedAnalyses: `${API_URL}/analysis/history`,
    },
  },
};
