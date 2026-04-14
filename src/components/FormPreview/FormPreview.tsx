import InputFieldView from "@/components/FormBuilder/InputFieldView";
import { Fragment, useActionState, useEffect, useState } from "react";
import styles from "./FormPreview.module.css";
import { formAction } from "@/actions/form";
import type { FormStateType, InputField } from "@/utils/types";
import { getFromStorage } from "@/utils/helpers";
import { FORM_DATA_STORAGE_KEY } from "@/utils/constants";
import { Link } from "react-router";

export default function FormPreview() {
  const [mount, setMount] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [_, dispatchAction, isPending] = useActionState<
    FormStateType,
    FormData
  >(formAction, { status: "", message: "", data: undefined });

  useEffect(() => {
    if (window !== undefined) {
      const savedForm = getFromStorage(FORM_DATA_STORAGE_KEY);
      if (savedForm) {
        setFormFields(savedForm);
      }
      setMount(true);
    }
  }, []);

  if (mount && formFields?.length <= 0) {
    return (
      <>
        <div className={`center-x ${styles["py-60"]}`}>
          There is no saved form. Please go to&nbsp;
          <Link to="/form-builder">Form Builder</Link>&nbsp;to build the form
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="center-x">
        {formFields?.length > 0 ? (
          <form
            className={`flex flex-col ${styles["gap-16"]}`}
            action={dispatchAction}
          >
            {formFields.map((field: InputField, idx: number) => {
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
                    <InputFieldView field={field} />
                  </div>
                </Fragment>
              );
            })}{" "}
            <button type="submit" className="button">
              {isPending ? "Submitting" : "Submit"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
