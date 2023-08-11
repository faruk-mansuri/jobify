import { ChartsContainer, StatsContainer } from '../Components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const { data } = await customFetch.get('/jobs/stats');
    return data;
  },
};

export const loader = (queryClient) => {
  return async () => {
    const data = await queryClient.ensureQueryData(statsQuery);
    // ensureQueryData - return data from cache if it is still available if not then it refetches
    return null;
  };
};

const Stats = () => {
  // const { defaultStats, monthlyApplications } = useLoaderData();
  const { data } = useQuery(statsQuery);
  const { defaultStats, monthlyApplications } = data;

  // The useQuery hook will use the cached data from the loader if available, but it will also re-fetch the data in the background to keep it fresh. The loader function is optional, but it can improve the user experience by avoiding loading spinners or stale data1.
  // re-rew the stale time
  // 2 - Refetch on focus is a feature of React Query that automatically refetches the data when the window or tab gets focus. This is useful to keep the data fresh and up to date when the user returns to your application

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
