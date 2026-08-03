import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Field } from "@/components/forms/field";
import { Input, Select, Textarea } from "@/components/forms/input";
import { Checkbox, RadioGroup, Switch } from "@/components/forms/choice";
import { FileUpload } from "@/components/forms/file-upload";
import { ProgressBar, StepProgress } from "@/components/forms/progress";
import { NewsletterSignup } from "@/components/forms/newsletter-signup";

const meta: Meta = {
  title: "Forms/All Controls",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Every control sits inside `<Field>`, which wires label/hint/error ids " +
          "(`for`, `aria-describedby`, `aria-invalid`) automatically. Errors use " +
          "`role=alert`, are specific, and never scold. Select/checkbox/radio are " +
          "native inputs under the styling — platform keyboard, screen-reader, and " +
          "mobile behavior comes free. All rows are ≥44px touch targets.",
      },
    },
  },
};
export default meta;

export const TextInput: StoryObj = {
  render: () => (
    <div className="w-96">
      <Field label="Street address" hint="Where the home is located." required>
        <Input name="address" autoComplete="street-address" placeholder="123 Main Street" />
      </Field>
    </div>
  ),
};

export const WithError: StoryObj = {
  render: () => (
    <div className="w-96">
      <Field label="ZIP code" error="Enter a 5-digit ZIP code like 37066." required>
        <Input name="zip" inputMode="numeric" autoComplete="postal-code" defaultValue="370" />
      </Field>
    </div>
  ),
};

export const TextareaField: StoryObj = {
  render: () => (
    <div className="w-96">
      <Field label="Project details" hint="Your goals, current concerns, and anything you'd like us to know.">
        <Textarea name="details" />
      </Field>
    </div>
  ),
};

export const SelectField: StoryObj = {
  render: () => (
    <div className="w-96">
      <Field label="Property type" required>
        <Select name="propertyType" defaultValue="">
          <option value="" disabled>Choose one…</option>
          <option>Single-family home</option>
          <option>Townhome</option>
          <option>Condo</option>
          <option>Other</option>
        </Select>
      </Field>
    </div>
  ),
};

export const Choices: StoryObj = {
  render: function ChoicesStory() {
    const [contact, setContact] = useState("phone");
    const [reminders, setReminders] = useState(true);
    return (
      <div className="flex w-96 flex-col gap-6">
        <Checkbox label="Text me appointment reminders" description="Standard message rates may apply." defaultChecked />
        <RadioGroup
          legend="Preferred contact method"
          name="contact"
          value={contact}
          onChange={setContact}
          options={[
            { value: "phone", label: "Phone call" },
            { value: "text", label: "Text message" },
            { value: "email", label: "Email" },
          ]}
        />
        <Switch label="Monthly maintenance reminders" checked={reminders} onChange={setReminders} />
      </div>
    );
  },
};

export const Upload: StoryObj = {
  render: () => (
    <div className="w-[28rem]">
      <Field label="Photos of the area" hint="Photos help us prepare an accurate estimate.">
        <FileUpload accept="image/*,.pdf" />
      </Field>
    </div>
  ),
  parameters: {
    docs: { description: { story: "A real file input does the work; the drop zone is enhancement only." } },
  },
};

export const Progress: StoryObj = {
  render: () => (
    <div className="flex w-[28rem] flex-col gap-10">
      <ProgressBar label="Uploading photos" value={64} />
      <StepProgress
        steps={["Property", "Services", "Details", "Photos", "Contact", "Confirm"]}
        currentStep={3}
      />
    </div>
  ),
  parameters: {
    docs: { description: { story: "StepProgress is the Part 9 estimate-flow indicator; the current step carries `aria-current=step`." } },
  },
};

export const Newsletter: StoryObj = {
  render: () => (
    <div className="w-[28rem]">
      <NewsletterSignup onSubscribe={async () => {}} />
    </div>
  ),
};
