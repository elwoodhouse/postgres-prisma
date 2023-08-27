import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import NewFormButton from "@/components/new-form-button";
import { formStatus } from "@/lib/utils";

export default async function Page(props: { params: { userId: string } }) {
  const userId = parseInt(props.params.userId);
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    include: {
      forms: true,
    },
  });

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="flex items-center space-x-4 max-w-xl mx-auto w-full p-4">
        {user && <Image src={user.image} alt={user.name} width={48} height={48} className="rounded-full ring-1 ring-gray-900/5" />}
        <div className="space-y-1">
          <p className="font-medium leading-none">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <div className="divide-y divide-gray-900/5">
          {user && user.forms.length > 0 && (
            <table className="w-full">
              <thead className="border-b-2 border-gray-900/10">
                <tr>
                  <th className="w-1/3">Form ID</th>
                  <th className="w-1/3">Status</th>
                </tr>
              </thead>
              <tbody>
                {user.forms.map(form => (
                  <tr key={form.id}>
                    <td className="border-b-2 border-gray-900/5 py-2 w-1/3">{form.id}</td>
                    <td className="border-b-2 border-gray-900/5 py-2 w-1/3">{form.status}</td>
                    <td className="border-b-2 border-gray-900/5 py-2 w-1/3 text-end">
                      {form.status === formStatus.in_progress && (
                        <Link href={`/${userId}/${form.id}/form1`}>
                          <button className="bg-sky-500 py-1 px-3 text-white rounded-full">Resume</button>
                        </Link>
                      )}
                      {form.status === formStatus.submitted && (
                        <Link href={`/${userId}/${form.id}`}>
                          <button className="bg-gray-900/10 py-1 px-3 text-black rounded-full">Review</button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex items-center justify-between space-x-4 max-w-xl mx-auto w-full py-4">
          <Link href="/">
            <button className="bg-gray-900/10 py-2 px-4 text-black rounded-full">Log out</button>
          </Link>
          <NewFormButton userId={userId} />
        </div>
      </div>
    </main>
  );
}
