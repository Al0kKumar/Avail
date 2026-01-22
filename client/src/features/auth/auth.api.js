import api from '../../lib/api';

export const loginWithGoogleCode = async code => {
  const res = await api.post('/auth/google/code', { code });
  return res.data;
};
