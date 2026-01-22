import api from '../../lib/api';

export const loginWithGoogle = async idToken => {
  const res = await api.post('/auth/google', {
    idToken,
  });
  return res.data;
};
