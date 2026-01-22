import api from '../../lib/api';

export const getPublicAvailability = async ({
  userId,
  date,
  timezone,
}) => {
  const res = await api.get(
    `/availability/public/${userId}`,
    {
      params: {
        date,
        tz: timezone,
      },
    }
  );

  return res.data;
};
