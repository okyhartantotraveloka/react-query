import Layout from "../../components/layouts"

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient()

function getDataKey () {
  return ['disabled-query'];
};

function useDataExample() {
  const keys = getDataKey();
  const { isLoading, isFetching,error, data, refetch} = useQuery(keys, () =>
    fetch('http://localhost:8080/react-query').then(res => {
      if (res.status === 400) {
        throw new Error(res.statusText)
      }
      return res.json();
    }),
    {
      enabled: false,
    }
  )
  
  return {
    isLoading,
    isFetching,
    error,
    data,
    refetch,
  }
}

function Content() {
  const { isLoading, isFetching, error, data, refetch } = useDataExample();
  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;
  if (isFetching) return 'Refreshing';

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
      <strong>👀 {data?.subscribers_count}</strong>{' '}
      <strong>✨ {data?.stargazers_count}</strong>{' '}
      <strong>🍴 {data?.forks_count}</strong>
      <button onClick={() => refetch()}> refetch </button>
    </div>
  )
}

function AutoFetching() {
    return (
        <Layout>
            <QueryClientProvider client={queryClient}>
                <Content />
            </QueryClientProvider>
        </Layout>
    )
}

export default AutoFetching;