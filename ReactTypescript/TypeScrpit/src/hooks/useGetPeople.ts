import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Post } from "../types/index";

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const useGetPosts = (): UseQueryResult<Post[]> => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 10, 
  });
};

export default useGetPosts;