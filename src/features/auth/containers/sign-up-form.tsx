"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { SubmitButton } from "../ui/submit-button";

import { BottomLink } from "../ui/bottom-link";
import { ErrorMessage } from "../ui/error-message";
import { AuthFields } from "../ui/auth-fields";
import { useActionState } from "@/shared/lib/react";
import { signUpAction } from "../actions/sign-up";
import { AuthFormState } from "@/shared/types/auth";

export function SignUpForm() {
  const [state, action, isPenging] = useActionState(
    signUpAction,
    {} as AuthFormState
  );

  return (
    <AuthFormLayout
      title="Sign Up"
      description="Create your account"
      action={action}
      fields={<AuthFields {...state} />}
      error={<ErrorMessage error={state.errors?._errors} />}
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
