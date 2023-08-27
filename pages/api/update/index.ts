import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { formId, data } = req.body;
  const result = await prisma.forms.update({
    data,
    where: {
      id: formId,
    },
  });

  return res.status(200).json(result);
}
