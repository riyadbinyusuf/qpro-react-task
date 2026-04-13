import useFormBuilder from "@/hooks/useFormBuilder";
import styles from "./FormBuilder.module.css";
import { Fragment, useState } from "react";
import { nanoid } from "nanoid";
import { FIELD_TYPES, FORM_DATA_STORAGE_KEY } from "@/utils/constants";
import GenerateInputField from "./GenerateInputField";
import { saveToStorage } from "@/utils/helpers";

export default function FormBuilder() {
  const {
    inputTypes,
    inputFields,
    formFields,
    handleAddFormField,
    handleRemoveFormField,
    setFormFields,
  } = useFormBuilder();
  const [selectedField, setSelectedField] = useState<any>(null);
  const [fieldOptions, setFieldOptions] = useState<any[]>([]);
  const [fieldOption, setFieldOption] = useState<any>({});

  const handleInputType = (type: string) => {
    setSelectedField(inputFields[type]);
  };
  // console.log({ formFields, selectedField, fieldOptions, fieldOption });

  const handleChange = (key: string, value: string) => {
    setSelectedField((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleOptionChange = (key: string, value: string) => {
    setFieldOption((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleAddOption = () => {
    const option = {
      ...fieldOption,
      id: nanoid(5),
    };
    const updatedOptions = [...fieldOptions, option];
    setFieldOptions(updatedOptions);
    setFieldOption({});
  };

  const handleUpdateOption = (idx: number, key: string, value: string) => {
    const copiedOptionFields = [...fieldOptions];
    copiedOptionFields[idx] = {
      ...copiedOptionFields[idx],
      [key]: value,
    };
    setFieldOptions(copiedOptionFields);
  };

  const handleAddField = () => {
    const field = { ...selectedField };
    if (
      selectedField?.type &&
      ["radio", "checkbox", "select"].includes(selectedField.type)
    ) {
      field["options"] = fieldOptions;
    }
    handleAddFormField(field);
    setFieldOptions([]);
    setSelectedField(null);
  };

  return (
    <div className={styles["fb-grid"]}>
      <div className={styles["input-selector"]}>
        {/* <div className={styles["type-section"]}>
          <label>Select Input Type</label>
          <br />
          <select
            name="field_type"
            onChange={(e) => handleInputType(e.target.value as string)}
          >
            <option value="" defaultChecked>
              Select Type
            </option>
            {inputTypes.map((type: string) => {
              return (
                <Fragment key={type}>
                  <option value={type}>{type}</option>
                </Fragment>
              );
            })}
          </select>
        </div> */}
        {/* <div className={styles["field-selector"]}>
          {selectedField && (
            <>
              <fieldset>
                <label htmlFor="label">Label</label>
                <br />
                <input
                  type="text"
                  id="label"
                  value={selectedField?.label ?? ""}
                  onChange={(e) => handleChange("label", e.target.value)}
                />
              </fieldset>
              <br />
              {selectedField?.options && (
                <>
                  <div>
                    {fieldOptions.map((item: any, idx: number) => {
                      return (
                        <div key={item.id}>
                          <label htmlFor="option_label">Option Label</label>
                          <input
                            type="text"
                            id="option_label"
                            value={item.value}
                            onChange={(e) =>
                              handleUpdateOption(idx, "label", e.target.value)
                            }
                          />
                          <br />
                          <label htmlFor="option_value">Option Value</label>
                          <input
                            type="text"
                            id="option_value"
                            value={item.value}
                            onChange={(e) =>
                              handleUpdateOption(idx, "value", e.target.value)
                            }
                          />
                        </div>
                      );
                    })}
                    <div>
                      <fieldset>
                        <label htmlFor="option_label">Option Label</label>
                        <input
                          type="text"
                          id="option_label"
                          value={fieldOption?.label ?? ""}
                          onChange={(e) =>
                            handleOptionChange("label", e.target.value)
                          }
                        />
                        <br />
                        <button onClick={handleAddOption}>Add option</button>
                      </fieldset>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <button className={styles["add-field"]} onClick={handleAddField}>
          Add Field
        </button> */}
      </div>
      <div className={styles["form-preview"]}>
        <div className="">
          <h2>Form builder</h2>
        </div>
        <div className={styles["preview"]}>
          {formFields?.length > 0 &&
            formFields.map((field: any, idx: number) => {
              return (
                <Fragment key={field.id}>
                  <div
                    className=""
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <GenerateInputField field={field} />
                    <button
                      type="button"
                      onClick={() => {
                        let copiedFields = [...formFields];
                        copiedFields.splice(idx, 1);
                        setFormFields(copiedFields);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </Fragment>
              );
            })}
        </div>
        <div className="">
          <div className="">
            {selectedField && (
              <>
                <fieldset>
                  <label htmlFor="label">Add Field Label</label>
                  <br />
                  <input
                    type="text"
                    id="label"
                    value={selectedField?.label ?? ""}
                    onChange={(e) => {
                      // handleChange("label", e.target.value)
                      const val = e.target.value;
                      setSelectedField((prev: any) => ({
                        ...prev,
                        label: val,
                        name: val.trim().toLowerCase().replaceAll(" ", "_"),
                      }));
                    }}
                  />
                </fieldset>
                <br />
                {[
                  FIELD_TYPES.checkbox,
                  FIELD_TYPES.radio,
                  FIELD_TYPES.select,
                ].includes(selectedField.type) &&
                  selectedField && (
                    <>
                      <div>
                        <div className="">
                          {fieldOptions?.length > 0 &&
                            fieldOptions.map((option: any, idx: number) => {
                              return (
                                <Fragment key={option.id}>
                                  <div
                                    className=""
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    {/* <GenerateInputField field={option} /> */}
                                    {[
                                      FIELD_TYPES.checkbox,
                                      FIELD_TYPES.radio,
                                    ].includes(selectedField?.type) ? (
                                      <>
                                        <input
                                          type={selectedField?.type}
                                          id={option.id}
                                          {...{
                                            name:
                                              selectedField?.type === "radio"
                                                ? selectedField?.name
                                                : option.name,
                                          }}
                                        />
                                        <label htmlFor={option.id}>
                                          {option.label}
                                        </label>
                                      </>
                                    ) : (
                                      <option value={option.value}>
                                        {option.label}
                                      </option>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        let copiedOptions = [...fieldOptions];
                                        copiedOptions.splice(idx, 1);
                                        setFieldOptions(copiedOptions);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </Fragment>
                              );
                            })}
                        </div>
                        <fieldset>
                          <label htmlFor="option_label">Add Option Label</label>
                          <input
                            type="text"
                            id="option_label"
                            value={fieldOption?.label ?? ""}
                            onChange={(e) => {
                              // handleOptionChange("label", e.target.value)
                              const val = e.target.value;
                              setFieldOption((prev: any) => {
                                return {
                                  id: nanoid(5),
                                  label: val,
                                  value: val,
                                  name: val
                                    .trim()
                                    .toLowerCase()
                                    .replaceAll(" ", "_"),
                                };
                              });
                            }}
                          />
                          <br />
                          <button
                            onClick={() => {
                              let copiedFieldOptions = [...fieldOptions];
                              const newOption = {
                                ...fieldOption,
                              };
                              copiedFieldOptions.push(newOption);
                              console.log({ newOption, copiedFieldOptions });
                              setFieldOptions(copiedFieldOptions);
                              setFieldOption(null);
                            }}
                          >
                            Add option
                          </button>
                        </fieldset>
                      </div>
                    </>
                  )}
              </>
            )}
          </div>
          <hr />
          <br />
          <select
            name="field_type"
            value={selectedField?.type ?? ""}
            onChange={(e) => handleInputType(e.target.value as string)}
          >
            <option value="" defaultChecked>
              Select Type
            </option>
            {inputTypes.map((type: string) => {
              return (
                <Fragment key={type}>
                  <option value={type}>{type}</option>
                </Fragment>
              );
            })}
          </select>
          <hr />
          <br />
          <button
            // disabled={!!selectedField}
            onClick={() => {
              let copiedFormFields = [...formFields];
              const newField = {
                ...selectedField,
                id: nanoid(6),
              };
              if (
                [
                  FIELD_TYPES.checkbox,
                  FIELD_TYPES.radio,
                  FIELD_TYPES.select,
                ].includes(newField.type) &&
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
              // if (copiedFormFields.length <= 0) {}
            }}
            type="button"
          >
            + Add Field
          </button>
        </div>
        <button
          onClick={() => {
            saveToStorage(FORM_DATA_STORAGE_KEY, formFields);
          }}
          type="button"
          className={styles["save-form"]}
        >
          Save Form
        </button>
      </div>
    </div>
  );
}
