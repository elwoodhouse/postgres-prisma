"use client";

import { useRouter } from "next/navigation";

export default function NewFormButton(props: { userId: number }) {
  const { userId } = props;
  const router = useRouter();

  const onCreateNewForm = async () => {
    try {
      const postData = async () => {
        const body = { userId };

        const response = await fetch("/api/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        return response.json();
      };

      postData().then(data => {
        router.push(`/${userId}/${data.id}/form1`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="bg-sky-500 py-2 px-4 text-white rounded-full" onClick={onCreateNewForm}>
      New Form
    </button>
  );
}
