import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../Components';
import customFetch from '../utils/customFetch';
import { useLoaderData, useLocation } from 'react-router-dom';
import { useContext, createContext } from 'react';

const AllJobsContext = createContext();

export const loader = async ({ request }) => {
  // console.log(request.url);
  const newUrlObj = new URL(request.url);
  const queryString = [...newUrlObj.searchParams.entries()];
  // converting query String into [['key', 'value'], ['key', 'value']] format
  const params = Object.fromEntries(queryString);

  try {
    const { data } = await customFetch.get('/jobs', {
      params,
    });

    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
