import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;
  const result = await prisma.forms.create({
    data: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  return res.status(200).json(result);
}
