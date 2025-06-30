"use server";

import { fetchGraphQL } from "../fetchGraphQL";
import { print } from "graphql";
import { GET_POSTS } from "../gqlQueries";
import { Post } from "../types/modelTypes";

export const fetchPosts = async () => {
  const data = await fetchGraphQL(print(GET_POSTS));

  return data.posts as Post[];
};
