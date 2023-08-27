"use client";

import { form, formStatus } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SubmitFormButton(props: { userId: number; formId: number }) {
  const { userId, formId } = props;
  const router = useRouter();

  const onSubmitForm = async () => {
    try {
      const postData = async () => {
        const body = { formId, data: { status: formStatus.submitted } };
        const response = await fetch("/api/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        return response.json();
      };

      postData().then(data => {
        router.push(`/${userId}`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="bg-sky-500 py-2 px-4 text-white rounded-full" onClick={onSubmitForm}>
      Submit Form
    </button>
  );
}
