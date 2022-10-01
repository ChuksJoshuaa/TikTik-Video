import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const { userId, accountId, follow } = req.body;

      const data = follow
        ? await client
            .patch(accountId)
            .setIfMissing({ follows: [] })
            .insert("after", "follows[-1]", [
              {
                _key: uuidv4(),
                _ref: userId,
              },
            ])
            .commit()
        : await client
            .patch(accountId)
            .unset([`follows[_ref=="${userId}"]`])
            .commit();

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(404).json({ msg: error });
  }
}
