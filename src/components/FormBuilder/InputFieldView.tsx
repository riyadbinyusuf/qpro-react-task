import { FIELD_TYPES } from "@/utils/constants";
import { Fragment } from "react";
import styles from "./InputFieldView.module.css";
import type { InputField, InputOptions } from "@/utils/types";

export default function InputFieldView({ field }: { field: InputField }) {
  if (!field) return null;

  let inputGroup;
  let xtraAttrs = field?.extra_attrs ? field?.extra_attrs : {};

  switch (field.type) {
    case FIELD_TYPES.text:
      inputGroup = (
        <>
          <div className={`flex items-start flex-col`}>
            <label htmlFor={field.id}>{field.label}</label>
            <input type="text" name={field.name} id={field.id} />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.number:
      inputGroup = (
        <>
          <div className={`flex items-start flex-col`}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type="number"
              name={field.name}
              id={field.id}
              {...xtraAttrs}
            />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.email:
      inputGroup = (
        <>
          <div className={`flex items-start flex-col`}>
            <label htmlFor={field.id}>{field.label}</label>
            <input type="email" name={field.name} id={field.id} />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.url:
      inputGroup = (
        <>
          <div className={`flex items-start flex-col`}>
            <label htmlFor={field.id}>{field.label}</label>
            <input type="url" name={field.name} id={field.id} />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.file:
      inputGroup = (
        <>
          <div className={`flex items-start flex-col`}>
            <label htmlFor={field.id}>{field.label}</label>
            <input type="file" name={field.name} id={field.id} />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.range:
      inputGroup = (
        <>
          <div className={`flex items-start flex-col`}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type="range"
              name={field.name}
              id={field.id}
              {...xtraAttrs}
            />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.date:
      inputGroup = (
        <>
          <div className={`flex items-start flex-col`}>
            <label htmlFor={field.id}>{field.label}</label>
            <input type="date" name={field.name} id={field.id} />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.textarea:
      const cols = xtraAttrs?.cols
        ? typeof xtraAttrs?.cols === "string"
          ? parseInt(xtraAttrs?.cols)
          : xtraAttrs?.cols
        : 30;
      const rows = xtraAttrs?.rows
        ? typeof xtraAttrs?.rows === "string"
          ? parseInt(xtraAttrs?.rows)
          : xtraAttrs?.rows
        : 5;
      inputGroup = (
        <>
          <div className={`flex items-start flex-col`}>
            <label htmlFor={field.id}>{field.label}</label>
            <textarea id={field.id} name={field.name} cols={cols} rows={rows} />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.radio:
      inputGroup = (
        <>
          <div className={`flex items-start flex-col`}>
            <label htmlFor={field.id}>{field.label}</label>
            {field?.options &&
              field?.options?.length > 0 &&
              field.options.map((option: InputOptions) => {
                return (
                  <Fragment key={option.id}>
                    <div className="">
                      <input
                        type="radio"
                        id={option.id}
                        name={field.name}
                        value={option.value}
                      />
                      <label htmlFor={option.id}>{option.label}</label>
                    </div>
                  </Fragment>
                );
              })}
            {/* <input type="radio" id="html" name="fav_language" value="HTML" />
              <label htmlFor="html">HTML</label>
              <br />
              <input type="radio" id="css" name="fav_language" value="CSS" />
              <label htmlFor="css">CSS</label> */}
          </div>
        </>
      );
      break;
    case FIELD_TYPES.checkbox:
      inputGroup = (
        <>
          <div className={`flex items-start flex-col`}>
            <label htmlFor={field.id}>{field.label}</label>
            {field?.options &&
              field?.options?.length > 0 &&
              field.options.map((option: InputOptions) => {
                return (
                  <Fragment key={option.id}>
                    <div className="">
                      <input
                        type="checkbox"
                        id={option.id}
                        name={option.name}
                        value={option.value}
                      />
                      <label htmlFor={option.id}>{option.label}</label>
                    </div>
                  </Fragment>
                );
              })}
            {/* <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label htmlFor="vehicle1"> I have a bike</label>
              <br />
              <input
                type="checkbox"
                id="vehicle2"
                name="vehicle2"
                value="Car"
              />
              <label htmlFor="vehicle2"> I have a car</label> */}
          </div>
        </>
      );
      break;
    case FIELD_TYPES.select:
      inputGroup = (
        <>
          <div className={`flex items-center ${styles["gap-10"]}`}>
            <label htmlFor={field.id}>{field.label}</label>
            <select id={field.id} name={field.name}>
              {field?.options &&
                field?.options?.length > 0 &&
                field.options.map((option: InputOptions) => {
                  return (
                    <Fragment key={option.id}>
                      <option value={option.value}>{option.label}</option>
                    </Fragment>
                  );
                })}
            </select>
          </div>
        </>
      );
      break;
    default:
      inputGroup = null;
  }

  return inputGroup;
}
