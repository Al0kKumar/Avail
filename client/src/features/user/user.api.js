import api from '../../lib/api';


export const getPublicUserBySlug = async slug => {
  const res = await api.get(`/users/public/slug/${slug}`);
  return res.data;
};

export const getMe = async slug => {
  const res = await api.get(`/users/me`);
  return res.data;
};