import { Fragment } from "react";
import InputFieldView from "./InputFieldView";
import useFormBuilder from "@/hooks/useFormBuilder";
import { FIELD_TYPES } from "@/utils/constants";
import styles from "./FormBuilder.module.css";
import type { InputField, InputOptions } from "@/utils/types";

export default function FormBuilder() {
  const {
    inputTypes,
    formFields,
    selectedField,
    fieldOption,
    fieldOptions,
    handleInputType,
    handleAddFieldLabel,
    handleAddFormField,
    handleAddOption,
    handleAddOptionLabel,
    handleOptionRemove,
    handleRemoveField,
    handleExtraAttrUpdate,
    handleSaveToStorage,
  } = useFormBuilder();

  return (
    <div className={`center-x`}>
      <div className={styles["form-preview"]}>
        <div className="">
          <h1 className={styles.pageTitle}>Form builder</h1>
        </div>
        <div className={`flex flex-col gap-10 ${styles["mb-20"]}`}>
          {formFields?.length > 0 &&
            formFields.map((field: InputField, idx: number) => {
              return (
                <Fragment key={field.id}>
                  <div className={`flex justify-between items-end gap-10`}>
                    <InputFieldView field={field} />
                    <button
                      type="button"
                      onClick={() => handleRemoveField(idx)}
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
                    onChange={(e) => handleAddFieldLabel(e.target.value)}
                  />
                </fieldset>
                <br />
                {[
                  FIELD_TYPES.checkbox,
                  FIELD_TYPES.radio,
                  FIELD_TYPES.select,
                ].includes(selectedField.type) && (
                  <>
                    <div>
                      <div className="">
                        {fieldOptions?.length > 0 &&
                          fieldOptions.map((option: InputOptions, idx: number) => {
                            return (
                              <Fragment key={option.id}>
                                <div className="flex justify-between items-center">
                                  <div>
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
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleOptionRemove(idx)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </Fragment>
                            );
                          })}
                      </div>
                      <fieldset
                        className={`flex items-center gap-10 ${styles["mt-20"]}`}
                      >
                        <input
                          type="text"
                          id="option_label"
                          value={fieldOption?.label ?? ""}
                          placeholder="Type new option label"
                          onChange={(e) => handleAddOptionLabel(e.target.value)}
                        />
                        <button
                          disabled={!fieldOption?.id}
                          onClick={() => handleAddOption()}
                        >
                          Add option
                        </button>
                      </fieldset>
                    </div>
                  </>
                )}
                <br />
                {selectedField?.extra_attrs &&
                  Object.keys(selectedField?.extra_attrs)?.length > 0 && (
                    <>
                      <h2>Attributes: </h2>
                      {Object.entries(selectedField?.extra_attrs).map(
                        ([key, value]: any) => {
                          return (
                            <div key={key} className="flex items-center gap-10">
                              <label>{key}</label>
                              <input
                                type="text"
                                name={key}
                                defaultValue={value}
                                onChange={(e) =>
                                  handleExtraAttrUpdate(key, e.target.value)
                                }
                              />
                            </div>
                          );
                        },
                      )}
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
            disabled={!selectedField?.name}
            onClick={() => handleAddFormField()}
            type="button"
          >
            + Add Field
          </button>
        </div>
        <button
          onClick={handleSaveToStorage}
          type="button"
          className={`button`}
        >
          Save Form
        </button>
      </div>
    </div>
  );
}
