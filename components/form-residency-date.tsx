"use client";

import { form } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormResidencyDate(props: { userId: number; form: form }) {
  const { userId, form } = props;
  const [residencyDate, setResidencyDate] = useState(form.residency_date);
  const router = useRouter();

  const onValueChange = (event: any) => {
    setResidencyDate(new Date(event.target.value));
  };

  const onUpdateForm = async (event: any) => {
    event.preventDefault();
    try {
      const postData = async () => {
        if (residencyDate !== form.residency_date) {
          const body = { formId: form.id, data: { residency_date: residencyDate } };
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
        router.push(`/${userId}/${form.id}/form3`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onUpdateForm}>
      <div className="flex justify-center">
        <input
          value={residencyDate.toISOString().split("T")[0]}
          className="p-2 border-2 border-solid border-black"
          type="date"
          id="residency_date"
          name="residency_date"
          onChange={onValueChange}
        />
      </div>
      <div className="flex items-center justify-end space-x-4 max-w-xl mx-auto w-full py-4">
        <button className="bg-sky-500 py-2 px-4 text-white rounded-full" type="submit">
          Next
        </button>
      </div>
    </form>
  );
}
