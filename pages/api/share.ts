import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const { userId, postId, share } = req.body;
      const data = share
        ? await client
            .patch(postId)
            .setIfMissing({ shares: [] })
            .insert("after", "shares[-1]", [
              {
                _key: uuidv4(),
                _ref: userId,
              },
            ])
            .commit()
        : await client
            .patch(postId)
            .unset([`shares[_ref=="${userId}"]`])
            .commit();

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(404).json({ msg: error });
  }
}
