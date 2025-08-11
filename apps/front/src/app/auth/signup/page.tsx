import Link from "next/link";
import React from "react";
import SignUpForm from "./_components/signUpForm";

const SignupPage = () => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md  w-96 flex flex-col justify-center items-center">
      <h2 className="text-center text-2xl font-bold mb-4">sign up page</h2>
      <SignUpForm></SignUpForm>

      <div>
        <p>already have an account</p>
        <Link href={"/auth/signin"} className="underline">
          Signin
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
