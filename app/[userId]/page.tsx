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
          <table className="w-full">
            <thead className="border-b-2 border-gray-900/10">
              <tr>
                <th>Form ID</th>
                <th>Status</th>
              </tr>
              {/* <th></th> */}
            </thead>
            <tbody>
              {user &&
                user.forms.map(form => (
                  <tr key={form.id}>
                    <td className="divide-y divide-gray-900/5 py-2">{form.id}</td>
                    <td className="divide-y divide-gray-900/5 py-2">{form.status}</td>
                    <td className="divide-y divide-gray-900/5 py-2">
                      {form.status === formStatus.in_progress && (
                        <Link href={`/${userId}/${form.id}/form1`} className="">
                          <button className="bg-sky-500 py-2 px-4 text-white rounded-full">Resume</button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end space-x-4 max-w-xl mx-auto w-full py-4">
          <NewFormButton userId={userId} />
        </div>
      </div>
    </main>
  );
}
