export const fetchItems = async (page: number, pageSize: number): Promise<string[]> => {
  // Simulate an API call (replace with your actual API call)
  const controller = new AbortController();
  const { signal: fetchSignal } = controller;
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?page=${page}&pageSize=${pageSize}`, {
    signal: fetchSignal,
  });
  const data = await response.json();

  return data;
};
