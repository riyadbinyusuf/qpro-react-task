import type { CommonAttrs, InputField } from "./types";

export const FIELD_TYPES = {
  text: "text",
  number: "number",
  email: "email",
  url: "url",
  range: "range",
  file: "file",
  date: "date",
  textarea: "textarea",
  radio: "radio",
  checkbox: "checkbox",
  select: "select",
};

export const FORM_DATA_STORAGE_KEY = "form_data";

const commonAttrs: CommonAttrs = {
  id: "",
  label: "",
  name: "",
};

export const inputFields: Record<string, InputField> = {
  text: {
    type: "text",
    ...commonAttrs,
  },
  number: {
    type: "number",
    ...commonAttrs,
    extra_attrs: {
      step: 1,
      min: 1,
      max: Infinity,
    },
  },
  email: {
    type: "email",
    ...commonAttrs,
  },
  password: {
    type: "password",
    ...commonAttrs,
  },
  file: {
    type: "file",
    ...commonAttrs,
  },
  radio: {
    type: "radio",
    ...commonAttrs,
    options: [
      {
        id: "",
        value: "",
        label: "",
        name: "",
      },
    ],
  },
  checkbox: {
    type: "checkbox",
    ...commonAttrs,
    options: [
      {
        ...commonAttrs,
        value: "",
      },
    ],
  },
  select: {
    type: "select",
    ...commonAttrs,
    options: [
      {
        ...commonAttrs,
        value: "",
      },
    ],
  },
  date: {
    type: "date",
    ...commonAttrs,
  },
  range: {
    type: "range",
    ...commonAttrs,
    extra_attrs: {
      min: 0,
      max: Infinity,
    },
  },
  url: {
    type: "url",
    ...commonAttrs,
  },
  textarea: {
    type: "textarea",
    ...commonAttrs,
    extra_attrs: {
      rows: 5,
      cols: 30,
    },
  },
};
