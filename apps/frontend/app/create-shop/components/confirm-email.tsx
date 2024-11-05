"use client";

import { useSignUp } from "@clerk/nextjs";
import { Button } from "@repo/ui/components/ui/button";

const ConfirmEmail = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const handleConfirmEmail = async () => {
    const result = await signUp?.prepareEmailAddressVerification();
    console.log({ result });
  };

  return (
    <div>
      ConfirmEmail
      <Button onClick={handleConfirmEmail}>Confirm email</Button>
    </div>
  );
};

export default ConfirmEmail;
