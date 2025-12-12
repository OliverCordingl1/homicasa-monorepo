"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMultiStep } from "@homicasa/multistep";
import { z } from "zod";
import { CountrySelect } from "@/components/forms/country-select";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export const stepTwoSchema = z.object({
  businessAddressLine1: z.string().min(1, "Address Line 1 is required"),
  businessAddressLine2: z.string().optional(),
  businessAddressLine3: z.string().optional(),
  businessAddressLine4: z.string().optional(),
  businessCity: z.string().min(1, "City is required"),
  businessCounty: z.string().optional(),
  businessState: z.string().optional(),
  businessPostcode: z.string().min(1, "Postcode is required"),
  businessCountry: z.string().regex(/^[A-Z]{2}$/, "Invalid country code"), // ISO 3166-1 alpha-2
});

export function StepTwo() {
  const { form } = useMultiStep<z.infer<typeof stepTwoSchema>>();
  const [showLine3, setShowLine3] = useState(false);
  const [showLine4, setShowLine4] = useState(false);

  const addAddressLine = () => {
    if (!showLine3) {
      setShowLine3(true);
    } else if (!showLine4) {
      setShowLine4(true);
    }
  };

  const removeLine3 = () => {
    setShowLine3(false);
    form.setFieldValue("businessAddressLine3", "");
  };

  const removeLine4 = () => {
    setShowLine4(false);
    form.setFieldValue("businessAddressLine4", "");
  };

  return (
    <div className="space-y-4 w-full">
      <FieldSet>
        <FieldLegend>Business Address</FieldLegend>
        <FieldGroup>
          <form.Field
            name="businessAddressLine1"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Address Line 1</FieldLabel>
                  <Input
                    name={field.name}
                    id={field.name}
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    aria-describedby={`${field.name}-error`}
                    placeholder="Street address"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="businessAddressLine2"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Address Line 2 (Optional)
                  </FieldLabel>
                  <Input
                    name={field.name}
                    id={field.name}
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    aria-describedby={`${field.name}-error`}
                    placeholder="Apartment, suite, unit, etc."
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {showLine3 && (
            <form.Field
              name="businessAddressLine3"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={field.name}>
                        Address Line 3
                      </FieldLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeLine3}
                        className="h-auto p-0 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                    </div>
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
          )}

          {showLine4 && (
            <form.Field
              name="businessAddressLine4"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={field.name}>
                        Address Line 4
                      </FieldLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeLine4}
                        className="h-auto p-0 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                    </div>
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
          )}

          {(!showLine3 || !showLine4) && (
            <div className="-mt-4 ml-auto">
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={addAddressLine}
                className="w-fit text-xs p-0 h-auto text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Plus className="mr-1 h-4 w-4" />
                Add more address lines
              </Button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-x-4 -mt-3">
            <form.Field
              name="businessCity"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>City</FieldLabel>
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
              name="businessPostcode"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Postcode</FieldLabel>
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

          <div className="grid grid-cols-2 gap-x-4">
            <form.Field
              name="businessCounty"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      County/State (Optional)
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
              name="businessCountry"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                    <CountrySelect
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                      placeholder="Select a country"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
