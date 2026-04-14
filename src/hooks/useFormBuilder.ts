import {
  FIELD_TYPES,
  FORM_DATA_STORAGE_KEY,
  inputFields,
} from "@/utils/constants";
import { saveToStorage } from "@/utils/helpers";
import type { InputField } from "@/utils/types";
import { nanoid } from "nanoid";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect, useNavigate } from "react-router";

export default function useFormBuilder() {
  const inputTypes = Object.keys(FIELD_TYPES);
  const [fields, setFields] = useState([]);
  const [formFields, setFormFields] = useState<any>([]);
  const [selectedField, setSelectedField] = useState<any>(null);
  const [fieldOptions, setFieldOptions] = useState<any[]>([]);
  const [fieldOption, setFieldOption] = useState<any>({});

  const navigate = useNavigate();

  const handleInputType = (type: string) => {
    setSelectedField(inputFields[type]);
  };

  const handleAddFormField = () => {
    let copiedFormFields = [...formFields];
    const newField = {
      ...selectedField,
      id: nanoid(6),
    };
    if (
      [FIELD_TYPES.checkbox, FIELD_TYPES.radio, FIELD_TYPES.select].includes(
        newField.type,
      ) &&
      fieldOptions?.length > 0
    ) {
      newField.options = fieldOptions;
    }
    copiedFormFields.push(newField);
    console.log({ newField, copiedFormFields });
    setFormFields(copiedFormFields);
    setFieldOptions([]);
    setFieldOption(null);
    setSelectedField(null);
  };

  const handleAddFieldLabel = (val: string) => {
    setSelectedField((prev: InputField) => ({
      ...prev,
      label: val,
      name: val.trim().toLowerCase().replaceAll(" ", "_"),
    }));
  };

  const handleOptionRemove = (idx: number) => {
    let copiedOptions = [...fieldOptions];
    copiedOptions.splice(idx, 1);
    setFieldOptions(copiedOptions);
  };

  const handleAddOptionLabel = (val: string) => {
    setFieldOption(() => {
      return {
        id: nanoid(5),
        label: val,
        value: val,
        name: val.trim().toLowerCase().replaceAll(" ", "_"),
      };
    });
  };

  const handleAddOption = () => {
    let copiedFieldOptions = [...fieldOptions];
    const newOption = {
      ...fieldOption,
    };
    copiedFieldOptions.push(newOption);
    console.log({ newOption, copiedFieldOptions });
    setFieldOptions(copiedFieldOptions);
    setFieldOption(null);
  };

  const handleRemoveField = (idx: number) => {
    let copiedFields = [...formFields];
    copiedFields.splice(idx, 1);
    setFormFields(copiedFields);
  };

  const handleExtraAttrUpdate = (key: string, val: string) => {
    let copiedField = {
      ...selectedField,
      extra_attrs: {
        ...selectedField.extra_attrs,
        [key]: val,
      },
    };
    console.log({ key, val, copiedField });
    setSelectedField(copiedField);
  };

  const handleSaveToStorage = () => {
    if (formFields?.length <= 0) {
      toast.error("No field added!")
      return;
    };

    saveToStorage(FORM_DATA_STORAGE_KEY, formFields);
    
    toast.success("Form save to storage successfully");
    navigate("/form-preview");
  };

  return {
    inputFields,
    inputTypes,
    fields,
    setFields,
    formFields,
    selectedField,
    fieldOption,
    fieldOptions,
    setFormFields,
    handleInputType,
    handleAddFieldLabel,
    handleAddFormField,
    handleAddOption,
    handleAddOptionLabel,
    handleOptionRemove,
    handleRemoveField,
    handleExtraAttrUpdate,
    handleSaveToStorage,
  };
}
