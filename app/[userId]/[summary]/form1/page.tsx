import FormResidencyType from "@/components/form-residency-type";
import prisma from "@/lib/prisma";
import { formQuestions } from "@/lib/utils";

export default async function Page(props: { params: { userId: string; summary: string } }) {
  const userId = parseInt(props.params.userId);
  const formId = parseInt(props.params.summary);
  const form = await prisma.forms.findUnique({
    where: {
      id: formId,
    },
  });
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <h6 className="py-4 max-w-xl mx-auto w-full bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-left font-medium tracking-tight text-transparent">
          {formQuestions.residencyType.question}
        </h6>
        {form && <FormResidencyType form={form} userId={userId} />}
      </div>
    </main>
  );
}
