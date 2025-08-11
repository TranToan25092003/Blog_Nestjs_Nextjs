"use client";

import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions/auth";
import React, { useActionState } from "react";

const SignUpForm = () => {
  const [state, action] = useActionState(signUp, undefined);
  return (
    <form action={action} className="flex flex-col gap-2">
      {!!state?.message && (
        <p className="text-red-500 text-sm"> {state.message} </p>
      )}

      {/* name */}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="john Doe"
          defaultValue={state?.data?.name}
        ></Input>
      </div>
      {!!state?.errors?.name && (
        <p className="text-red-500 text-sm"> {state?.errors?.name} </p>
      )}

      {/* email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="john@example.com"
          type="email"
          defaultValue={state?.data?.email}
        ></Input>
      </div>
      {!!state?.errors?.email && (
        <p className="text-red-500 text-sm"> {state?.errors?.email} </p>
      )}

      {/* password */}
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={state?.data?.password}
        ></Input>
      </div>
      {!!state?.errors?.password && (
        <div className="text-red-500 text-sm">
          <p>Password must:</p>
          <ul>
            {state?.errors?.password.map((err) => {
              return <li key={err}>{err}</li>;
            })}
          </ul>
        </div>
      )}

      {/* submit button */}
      <SubmitButton>Sign up</SubmitButton>
    </form>
  );
};

export default SignUpForm;
