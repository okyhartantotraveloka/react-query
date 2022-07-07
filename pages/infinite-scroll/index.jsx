import React from 'react';
import {
  QueryClientProvider,
  QueryClient,
  useInfiniteQuery,
} from 'react-query';
import Layout from "../../components/layouts"

const stateQueryClient = new QueryClient();

function useProjects() {
  const fetchProjects = ({ pageParam = 0 }) => fetch(`http://localhost:8080/pagination?page=${pageParam}`).then((res) => res.json())
 
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(['infinite-scroll'], fetchProjects, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length : false;
    },
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  }
}
 
function Content() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useProjects();

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'error') {
    return <p>Error: {error.message}</p>
  }

  return (
    <>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.projects.map(project => (
            <p key={project.id}>{project.name}</p>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}


function InfiniteScroll() {
  return (
    <Layout>
      <QueryClientProvider client={stateQueryClient}>
        <Content />
      </QueryClientProvider>
    </Layout>
  )
}

export default InfiniteScroll;