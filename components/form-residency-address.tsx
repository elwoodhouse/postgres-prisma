"use client";

import { form } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormResidencyAddress(props: { userId: number; form: form }) {
  const { userId, form } = props;
  const [residencyAddress, setResidencyAddress] = useState(form.residency_address ? form.residency_address : "");
  const router = useRouter();

  const onValueChange = (event: any) => {
    setResidencyAddress(event.target.value);
  };

  const onUpdateForm = async (event: any) => {
    event.preventDefault();
    try {
      const postData = async () => {
        if (residencyAddress && residencyAddress !== form.residency_address) {
          const body = { formId: form.id, data: { residency_address: residencyAddress } };
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
        router.push(`/${userId}/${form.id}`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onUpdateForm}>
      <div className="flex justify-center">
        <textarea
          value={residencyAddress}
          id="residency_address"
          name="residency_address"
          rows={4}
          cols={40}
          onChange={onValueChange}
          className="p-2 border-2 border-solid border-black"
        />
      </div>
      <div className="flex items-center justify-end space-x-4 max-w-xl mx-auto w-full py-4">
        <button className="bg-sky-500 py-2 px-4 text-white rounded-full" type="submit">
          Review
        </button>
      </div>
    </form>
  );
}
