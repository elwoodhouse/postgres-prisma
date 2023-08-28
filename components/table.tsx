import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Table() {
  const users = await prisma.users.findMany({
    include: {
      forms: true,
    },
  });

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="divide-y divide-gray-900/5">
        <h6 className="pb-2 max-w-xl mx-auto w-full bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-left font-medium tracking-tight text-transparent">
          Select User:
        </h6>
        {users.map(user => (
          <div key={user.name} className="flex items-center justify-between py-3">
            <Link href={`/${user.id}`} className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <Image src={user.image} alt={user.name} width={48} height={48} className="rounded-full ring-1 ring-gray-900/5" />
                <div className="space-y-1">
                  <p className="font-medium leading-none">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{user.forms.length} forms created.</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
