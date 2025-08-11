"use server";

import { print } from "graphql";
import { fetchGraphQL } from "../fetchGraphQL";
import { CREATE_USER_MUTATION } from "../gqlQueries";
import { SignupFormState } from "../types/formState";
import { SignUpFormSchema } from "../zodSchemas/signUpFormSchema";
import { redirect } from "next/navigation";

export async function signUp(
  state: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const validateFields = SignUpFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validateFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validateFields.error.flatten().fieldErrors,
    };

  const data = await fetchGraphQL(print(CREATE_USER_MUTATION), {
    input: {
      ...validateFields.data,
    },
  });

  if (data.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message: "something went wrong",
    };
  }

  redirect("/auth/signin");
}
