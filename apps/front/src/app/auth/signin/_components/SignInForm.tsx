"use client";
import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/actions/auth";
import React, { useActionState } from "react";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);
  return (
    <form className="flex flex-col gap-2 justify-center" action={action}>
      {!!state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
      {/* email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="abc@gmail.com"
          type="email"
          defaultValue={state?.data?.email}
        ></Input>
      </div>
      {!!state?.errors?.email && (
        <p className="text-red-500 text-sm"> {state?.errors?.email} </p>
      )}

      {/* password */}
      <div>
        <Label htmlFor="email">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={state?.data?.password}
        ></Input>
      </div>
      {!!state?.errors?.password && (
        <p className="text-red-500 text-sm"> {state?.errors?.password} </p>
      )}

      <SubmitButton>Sign in</SubmitButton>
    </form>
  );
};

export default SignInForm;
