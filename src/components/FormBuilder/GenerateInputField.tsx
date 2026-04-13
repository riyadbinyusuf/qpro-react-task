import { FIELD_TYPES } from "@/utils/constants";
import { Fragment } from "react/jsx-runtime";

export default function GenerateInputField({field}: any) {

  if (!field) return null;

  let inputGroup;
  switch (field.type) {
    case FIELD_TYPES.text:
      inputGroup = (
        <>
          <div className="">
            <label htmlFor={field.id}>{field.label}</label>
            <input type="text" name={field.name} id={field.id} />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.number:
      inputGroup = (
        <>
          <div className="">
            <label htmlFor={field.id}>{field.label}</label>
            <input type="number" name={field.name} id={field.id} />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.email:
      inputGroup = (
        <>
          <div className="">
            <label htmlFor={field.id}>{field.label}</label>
            <input type="email" name={field.name} id={field.id} />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.url:
      inputGroup = (
        <>
          <div className="">
            <label htmlFor={field.id}>{field.label}</label>
            <input type="url" name={field.name} id={field.id} />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.file:
      inputGroup = (
        <>
          <div className="">
            <label htmlFor={field.id}>{field.label}</label>
            <input type="file" name={field.name} id={field.id} />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.range:
      inputGroup = (
        <>
          <div className="">
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type="range"
              name={field.name}
              id={field.id}
              min={0}
              max={10}
            />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.date:
      inputGroup = (
        <>
          <div className="">
            <label htmlFor={field.id}>{field.label}</label>
            <input type="date" name={field.name} id={field.id} />
          </div>
        </>
      );
      break;
    case FIELD_TYPES.textarea:
      inputGroup = (
        <>
          <div className="">
            <label htmlFor={field.id}>{field.label}</label>
            <textarea
              id={field.id}
              name={field.name}
              rows={field?.extra_attrs?.rows}
              cols={field?.extra_attrs?.cols}
            ></textarea>
          </div>
        </>
      );
      break;
    case FIELD_TYPES.radio:
      inputGroup = (
        <>
          <div className="">
            <label htmlFor={field.id}>{field.label}</label>
            {field?.options?.length > 0 &&
              field.options.map((option: any) => {
                return (
                  <Fragment key={option.id}>
                    <input
                      type="radio"
                      id={option.id}
                      name={field.name}
                      value={option.value}
                    />
                    <label htmlFor={option.id}>{option.label}</label>
                    <br />
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
          <div className="">
            <label htmlFor={field.id}>{field.label}</label>
            {field?.options?.length > 0 &&
              field.options.map((option: any) => {
                return (
                  <Fragment key={option.id}>
                    <input
                      type="checkbox"
                      id={option.id}
                      name={option.name}
                      value={option.value}
                    />
                    <label htmlFor={option.id}>{option.label}</label>
                    <br />
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
          <div className="">
            <label htmlFor={field.id}>{field.label}</label>
            <select id={field.id} name={field.name}>
              {field?.options?.length > 0 &&
                field.options.map((option: any) => {
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

  // console.log({field, inputGroup})
  return inputGroup;
}
