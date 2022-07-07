import Layout from "../../components/layouts"

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const stateQueryClient = new QueryClient();

const getTodos = () => {
  return fetch('http://localhost:8080/core').then(res => {
    return res.json();
  })
}

const postTodo = (data) => {
  return fetch('http://localhost:8080/core', {
    method: 'post',
    body: JSON.stringify(data)
  }).then(res => {
    return res.json();
  })
}

const deleteTodo = (data) => {
  return fetch('http://localhost:8080/core', {
    method: 'delete',
    body: JSON.stringify(data)
  }).then(res => {
    return res.json();
  })
}

const queryKeyTodo = () => ['core'];

function useTodosData() {
  // Queries
  const { data, error, isLoading } = useQuery(queryKeyTodo(), getTodos, {
    initialData: []
  });

  return {
    data,
    error, 
    isLoading
  }
}

function Content() {
  // Queries
  const { data, error, isLoading } = useTodosData();

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message

  const queryClient = useQueryClient();
  // Mutations
  const postMutation = useMutation(postTodo, {
    onSuccess: (newData) => {

      // When you already had a new data and don’t need to refetch
      queryClient.setQueryData(queryKeyTodo(), newData)
    },
  });

  // Mutations
  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(queryKeyTodo())
    },
  })

  return (
    <div>
      <button
        onClick={() => {
          postMutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
          })
        }}
      >
        Add Todo
      </button>
      <ul>
        {data.map(todo => (
          <li key={todo.id}>
            <div style={{
              display: "flex"
            }}>
              <div>{todo.title}</div>
              <button
                onClick={() => {
                  deleteMutation.mutate(todo)
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
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