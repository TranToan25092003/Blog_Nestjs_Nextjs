import { BACKEND_URL } from "./constants";

export const fetchGraphQL = async (query: string, variables = {}) => {
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();

  if (result?.errors) {
    console.log("GraphQL errors", result.errors);
    return result;
    // throw new Error("Failed to fetch data from GraphQl");
  }

  return result.data;
};
