"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { type Session } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { accountSchemas } from "@homicasa/schemas";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";

export function AccountForm({ session }: { session: Session | null }) {
  const {
    mutate,
    isPending: isLoading,
    isError,
  } = useMutation({
    ...trpc.accounts.updateAccountInformation.mutationOptions(),
    onSuccess: () => {
      toast.success("Account information updated successfully.");
    },
    onError: (error) => {
      toast.error(
        error.message || "There was an error updating your account information."
      );
    },
  });

  if (!session) {
    return null;
  }

  const form = useForm({
    defaultValues: {
      firstName: session.user.firstName || "",
      lastName: session.user.lastName || "",
      email: session.user.email || "",
    },
    validators: {
      onSubmit: accountSchemas.updateProfileFormSchema,
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      mutate(values.value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(e);
      }}
    >
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Manage your personal information and account settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="py-6">
        <FieldSet>
          <FieldGroup className="grid grid-cols-2 gap-4">
            <form.Field
              name="firstName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="David"
                      aria-invalid={isInvalid}
                      autoComplete="given-name"
                      disabled={isLoading}
                    />
                  </Field>
                );
              }}
            />
            <form.Field
              name="lastName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Brent"
                      aria-invalid={isInvalid}
                      autoComplete="family-name"
                      disabled={isLoading}
                    />
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="david.brent@wernhamhogg.co.uk"
                      aria-invalid={isInvalid}
                      autoComplete="email"
                      disabled={isLoading}
                    />
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </FieldSet>
      </CardContent>
      <CardFooter className="justify-end">
        <Button type="submit" disabled={!form.state.isValid || isLoading}>
          Save Changes
        </Button>
      </CardFooter>
    </form>
  );
}
