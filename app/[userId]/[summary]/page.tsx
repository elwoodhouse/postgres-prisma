import NavBar from "@/components/nav-bar";
import SubmitFormButton from "@/components/submit-form-button";
import prisma from "@/lib/prisma";
import { formQuestions, formStatus } from "@/lib/utils";
import Link from "next/link";

export default async function Page(props: { params: { userId: string; summary: string } }) {
  const userId = parseInt(props.params.userId);
  const formId = parseInt(props.params.summary);
  const form = await prisma.forms.findUnique({
    where: {
      id: formId,
    },
  });
  const isFormComplete = form?.residency_type && form?.residency_date && form?.residency_address;
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      {form && <NavBar form={form} userId={userId} route="" />}
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <div className="divide-y divide-gray-900/5">
          <h6 className="mb-1 max-w-xl mx-auto w-full bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-left font-medium tracking-tight text-transparent">
            Review:
          </h6>
          <table className="w-full">
            <tbody>
              <tr key="residencyType">
                <td className="font-bold pt-4">{formQuestions.residencyType.summary}</td>
                <td className="pt-4">{form && form.residency_type ? (formQuestions.residencyType.options as any)[form.residency_type] : ""}</td>
              </tr>
              <tr key="residencyDate">
                <td className="py-4 font-bold">{formQuestions.residencyDate.summary}</td>
                <td className="py-4">{form && form.residency_date && form.residency_date.toISOString().split("T")[0]}</td>
              </tr>
              <tr key="residencyAddress">
                <td className="font-bold">{formQuestions.residencyAddress.summary}</td>
                <td>
                  {form && form.residency_address && (
                    <textarea
                      readOnly
                      value={form.residency_address}
                      id="residency_address"
                      rows={4}
                      cols={40}
                      className="p-2 border-2 border-solid border-gray-900/10 bg-inherit"
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between space-x-4 max-w-xl mx-auto w-full py-4">
          <Link href={`/${userId}`}>
            <button className="bg-gray-900/10 py-2 px-4 text-black rounded-full">Dashboard</button>
          </Link>
          {isFormComplete && form.status !== formStatus.submitted && <SubmitFormButton userId={userId} formId={form.id} />}
        </div>
      </div>
    </main>
  );
}
