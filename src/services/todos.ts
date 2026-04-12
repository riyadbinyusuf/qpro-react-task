import { todosApi, usersApi } from "./endpoints";

export const fetchTodos = async ({ queryKey }: any) => {
  const [_key, filter] = queryKey;
  let url = todosApi;
  url += `?${filter}`;
  const res = await fetch(url);

  return res.json();
};

export const fetchUsers = async () => {
  const res = await fetch(usersApi);

  return res.json();
};
