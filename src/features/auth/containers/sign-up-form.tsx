"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { SubmitButton } from "../ui/submit-button";

import { BottomLink } from "../ui/bottom-link";
import { ErrorMessage } from "../ui/error-message";
import { right } from "@/shared/lib/either";
import { AuthFields } from "../ui/auth-fields";
import { useActionState } from "@/shared/lib/react";
import { signUpAction } from "../actions/sign-up";

export function SignUpForm() {
  const [formState, action, isPenging] = useActionState(
    signUpAction,
    right(undefined)
  );

  return (
    <AuthFormLayout
      title="Sign Up"
      description="Create your account"
      action={action}
      fields={<AuthFields />}
      error={<ErrorMessage error={formState} />}
      actions={<SubmitButton isPending={isPenging}>Sign Up</SubmitButton>}
      link={
        <BottomLink
          text="Already have an account?"
          linkText="Sign in"
          url="/sign-in"
        />
      }
    />
  );
}
