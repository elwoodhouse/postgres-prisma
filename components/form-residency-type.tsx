"use client";

import { form, formQuestions } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormResidencyType(props: { userId: number; form: form }) {
  const { userId, form } = props;
  const [residencyType, setResidencyType] = useState(form.residency_type);
  const router = useRouter();

  const onValueChange = (event: any) => {
    setResidencyType(event.target.value);
  };

  const onUpdateForm = async (event: any) => {
    event.preventDefault();
    try {
      const postData = async () => {
        if (residencyType !== form.residency_type) {
          const body = { formId: form.id, data: { residency_type: residencyType } };
          const response = await fetch("/api/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          return response.json();
        } else {
          return Promise.resolve(true);
        }
      };

      postData().then(data => {
        router.push(`/${userId}/${form.id}/form2`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onUpdateForm}>
      <div className="flex justify-center">
        <div className="w-[fit-content]">
          {Object.entries(formQuestions.residencyType.options).map(([key, value]) => (
            <div key={key} className="radio w-[fit-content]">
              <label>
                <input className="mr-2" type="radio" value={key} checked={residencyType === key} onChange={onValueChange} />
                {value}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end space-x-4 max-w-xl mx-auto w-full py-4">
        <button className="bg-sky-500 py-2 px-4 text-white rounded-full" type="submit">
          Next
        </button>
      </div>
    </form>
  );
}
