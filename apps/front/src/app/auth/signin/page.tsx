import Link from "next/link";
import React from "react";
import SignInForm from "./_components/SignInForm";

const SignInPage = () => {
  return (
    <div className="bg-white p-8 border rounded-md shadow-md w-96 flex flex-col justify-center items-center gap-3">
      <h1 className=" text-center text-2xl font-bold mb-4">Sign in page</h1>

      <SignInForm></SignInForm>
      {/* signin form */}
      <Link href={"/auth/forgot"}>Forgot your password</Link>
    </div>
  );
};

export default SignInPage;
