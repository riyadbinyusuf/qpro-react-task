import GenerateInputField from "@/components/FormBuilder/GenerateInputField";
import useFormBuilder from "@/hooks/useFormBuilder";
import { Fragment, useActionState } from "react";

export default function FormPreviewPage() {
  const { formFields } = useFormBuilder();
  // const [] = useActionState();
  console.log({ formFields });
  if (!formFields) {
    return <div>There is no form</div>;
  }
  return (
    <div>
      <div className="">
        {formFields?.length > 0 ? (
          <form>
            {formFields.map((field: any, idx: number) => {
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
                  </div>
                </Fragment>
              );
            })}{" "}
            <button type="submit">Subit</button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
