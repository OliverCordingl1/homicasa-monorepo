# @homicasa/multistep

A reusable React multistep component designed to stop multi-step forms being so damn difficult

## Quick start

```tsx
import { MultiStepFormProvider, MultiStepForm } from "@homicasa/multistep";

const config = {
	steps: [StepOne, StepTwo],
	stepSchemas: [stepOneSchema, stepTwoSchema],
	fullSchema,
	defaultValues,
	// Called when the final submit is triggered
	onSubmit: async ({ value }) => {
		await myApi.save(value);
	},
};

export function Example() {
	return (
		<MultiStepFormProvider config={config}>
			<MultiStepForm />
		</MultiStepFormProvider>
	);
}
```
