"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMultiStep } from "@homicasa/multistep";
import type { E164Number } from "libphonenumber-js";
import { type BusinessOnboardingStepOneSchemaType as StepOneSchemaType } from "@homicasa/schemas";

export function StepOne() {
  const { form } = useMultiStep<StepOneSchemaType>();

  return (
    <div className="space-y-4 w-full">
      <FieldSet>
        <FieldLegend>Business Details</FieldLegend>
        <FieldGroup>
          <form.Field
            name="businessDisplayName"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Business Display Name
                  </FieldLabel>
                  <Input
                    name={field.name}
                    id={field.name}
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    aria-describedby={`${field.name}-error`}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* Business Type Selector */}
          <form.Field
            name="businessType"
            children={(field) => {
              const handleBusinessTypeChange = (value: string) => {
                const currentValue = field.state.value;

                // Reset businessLegalName when switching types
                if (value === "sole_trader" && currentValue !== "sole_trader") {
                  // Switching to sole_trader: set to object
                  form.setFieldValue("businessLegalName", {
                    firstName: "",
                    lastName: "",
                  });
                } else if (
                  value !== "sole_trader" &&
                  currentValue === "sole_trader"
                ) {
                  // Switching from sole_trader: set to string
                  form.setFieldValue("businessLegalName", "");
                }

                field.handleChange(value as typeof field.state.value);
              };

              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Business Type</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={handleBusinessTypeChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="How is your business structured?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sole_trader">Sole Trader</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="limited_company">
                        Limited Company
                      </SelectItem>
                      <SelectItem value="llp">LLP</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              );
            }}
          />

          <form.Subscribe
            selector={(state) => state.values.businessType}
            children={(businessType) =>
              businessType === "sole_trader" ? (
                <div className="grid grid-cols-2 gap-x-4">
                  <form.Field
                    name="businessLegalName.firstName"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>
                            First Name
                          </FieldLabel>
                          <Input
                            name={field.name}
                            id={field.name}
                            value={field.state.value || ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            aria-invalid={isInvalid}
                            aria-describedby={`${field.name}-error`}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="businessLegalName.lastName"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel htmlFor={field.name}>
                            Last Name
                          </FieldLabel>
                          <Input
                            name={field.name}
                            id={field.name}
                            value={field.state.value || ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            aria-invalid={isInvalid}
                            aria-describedby={`${field.name}-error`}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </div>
              ) : (
                <form.Field
                  name="businessLegalName"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    const value =
                      typeof field.state.value === "string"
                        ? field.state.value
                        : "";
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Business Legal Name
                        </FieldLabel>
                        <Input
                          name={field.name}
                          id={field.name}
                          value={value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                          aria-describedby={`${field.name}-error`}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              )
            }
          />

          <form.Field
            name="businessEmail"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Business Email</FieldLabel>
                  <Input
                    type="email"
                    name={field.name}
                    id={field.name}
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    aria-describedby={`${field.name}-error`}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="businessPhone"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Business Phone</FieldLabel>
                  <Input
                    type="tel"
                    name={field.name}
                    id={field.name}
                    value={field.state.value || ""}
                    onChange={(e) =>
                      field.handleChange(e.target.value as E164Number)
                    }
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    aria-describedby={`${field.name}-error`}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
