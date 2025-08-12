import Link from "next/link";
import React from "react";

const SignInPanel = () => {
  return (
    <>
      <Link href={"/auth/signin"}>Sign In</Link>
      <Link href={"/auth/signup"}>Sign up</Link>
    </>
  );
};

export default SignInPanel;
