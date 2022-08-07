// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
// import { uuid } from "uuidv4";
import { v4 as uuidv4 } from "uuid";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const { userId, postId, like } = req.body;
      const data = like
        ? await client
            .patch(postId)
            .setIfMissing({ likes: [] })
            .insert("after", "likes[-1]", [
              {
                _key: uuidv4(),
                _ref: userId,
              },
            ])
            .commit()
        : await client
            .patch(postId)
            .unset([`likes[_ref=="${userId}"]`])
            .commit();

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(404).json({ msg: error });
  }
}
