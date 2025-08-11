import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} aria-disabled={pending}>
      {pending ? <span className="animate-pulse">Submitting</span> : children}
    </Button>
  );
};

export default SubmitButton;
