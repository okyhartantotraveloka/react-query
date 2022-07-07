import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import Layout from "../../components/layouts"


const stateQueryClient = new QueryClient();

async function fetchProjects(page = 0) {
  return fetch(`http://localhost:8080/pagination?page=${page}`).then(res => {
    return res.json();
  })
}

const paginationQueryKey = (page) => ['pagination', page]

const usePagination = () => {
  const [page, setPage] = useState(0);
 
  const { status, data, error, isLoading, isPreviousData } = useQuery(
    paginationQueryKey(page),
    () => fetchProjects(page),
    {
      keepPreviousData: true, 
      staleTime: 5000, // 5 seconds,
    }
  );

  const queryClient = useQueryClient();

  // Prefetch the next page!
  useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(paginationQueryKey(page + 1), () =>
        fetchProjects(page + 1)
      )
    }
  }, [data, page, queryClient])

  const prevPage = useCallback(
    () => {
      setPage((currentPage) => Math.max(currentPage - 1, 0))
    },
    [setPage]
  )

  const nextPage = useCallback(
    () => {
      setPage(old => (data?.hasMore ? old + 1 : old))
    },
    [setPage, data?.hasMore]
  )

  const disabledPrev = page === 0;

  const disableNext = isPreviousData || !data?.hasMore;

  return { 
    status, 
    data, 
    error, 
    isLoading, 
    isPreviousData, 
    prevPage,
    nextPage,
    disabledPrev,
    disableNext,
  };
}
 
function Content() {
  const { 
    status, 
    data, 
    error, 
    isLoading, 
    prevPage,
    nextPage,
    disableNext,
    disabledPrev,
  } = usePagination();

  return (
    <div>
      <p>
        In this example, each page of data remains visible as the next page is
        fetched. The buttons and capability to proceed to the next page are also
        supressed until the next page cursor is known. Each page is cached as a
        normal query too, so when going to previous pages, you'll see them
        instantaneously while they are also refetched invisibly in the
        background.
      </p>
      {status === 'loading' ? (
          <div>Loading...</div>
        ) : status === 'error' ? (
          <div>Error: {error.message}</div>
        ) : (
          // `data` will either resolve to the latest page's data
          // or if fetching a new page, the last successful page's data
          <div>
            {data.projects.map(project => (
              <p key={project.id}>{project.name}</p>
            ))}
          </div>
        )
      }
      <button
        onClick={prevPage}
        disabled={disabledPrev}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={nextPage}
        disabled={disableNext}
      >
        Next Page
      </button>
      {
        // Since the last page's data potentially sticks around between page requests,
        // we can use `isFetching` to show a background loading
        // indicator since our `status === 'loading'` state won't be triggered
        isLoading ? <span> Loading...</span> : null
      }{' '}
    </div>
  )
}

function Core() {
    return (
        <Layout>
            <QueryClientProvider client={stateQueryClient}>
                <Content />
            </QueryClientProvider>
        </Layout>
    )
}

export default Core;