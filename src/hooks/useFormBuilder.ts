import { FIELD_TYPES, FORM_DATA_STORAGE_KEY } from "@/utils/constants";
import { getFromStorage } from "@/utils/helpers";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export default function useFormBuilder() {
  const inputTypes = Object.keys(FIELD_TYPES);
  const commonAttrs = {
    id: "",
    label: "",
    name: "",
  };
  const inputFields: any = {
    text: {
      type: "text",
      ...commonAttrs,
    },
    number: {
      type: "number",
      ...commonAttrs,
      extra_attrs: {
        step: true,
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
        min: true,
        max: true,
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
        cols: 20,
      },
    },
  };
  const [fields, setFields] = useState([]);
  const [formFields, setFormFields] = useState<any>([]);

  const handleAddFormField = (inputField: any) => {
    const inputId = inputField.name?.trim().toLowerCase() + "_" + nanoid(5);
    const updatedFormFields = [...formFields, { ...inputField, id: inputId }];
    setFormFields(updatedFormFields);
  };

  const handleRemoveFormField = (id: string) => {
    const copiedFiels = [...formFields];
    const filterFields = copiedFiels.filter((f: any) => f.id !== id);
    setFormFields(filterFields);
  };

  useEffect(() => {
    if (window !== undefined) {
      const savedForm = getFromStorage(FORM_DATA_STORAGE_KEY);
      console.log({savedForm})
      if (savedForm) {
        setFormFields(savedForm);
      }
    }
  }, [])

  return {
    inputFields,
    inputTypes,
    fields,
    setFields,
    formFields,
    setFormFields,
    handleAddFormField,
    handleRemoveFormField,
  };
}
