"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { SubmitButton } from "../ui/submit-button";

import { BottomLink } from "../ui/bottom-link";
import { ErrorMessage } from "../ui/error-message";
import { AuthFields } from "../ui/auth-fields";
import { useActionState } from "@/shared/lib/react";
import { signInAction } from "../actions/sign-in";
import { AuthFormState } from "@/shared/types/auth";

export function SignInForm() {
  const [state, action, isPenging] = useActionState(
    signInAction,
    {} as AuthFormState
  );

  return (
    <AuthFormLayout
      title="Sign In"
      description="Wellcome back! Please sign in to your account"
      action={action}
      fields={<AuthFields {...state} />}
      error={<ErrorMessage error={state.errors?._errors} />}
      actions={<SubmitButton isPending={isPenging}>Sign In</SubmitButton>}
      link={
        <BottomLink
          text="Don't have an account?"
          linkText="Sign up"
          url="/sign-up"
        />
      }
    />
  );
}
