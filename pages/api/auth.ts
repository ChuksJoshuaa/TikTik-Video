// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const user = req.body;
      //To create users to the sanity platform
      client
        .createIfNotExists(user)
        .then(() => res.status(200).json("Login success"));
    }
  } catch (error) {
    res.status(404).json({ msg: error });
  }
}
