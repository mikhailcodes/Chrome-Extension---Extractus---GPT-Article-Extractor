// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { summerizeArticle } from "@/modules"

type Data = {
  name: string,
  content?: Object
}


async function processArticle(article: string) {
  const summary = await summerizeArticle(article);
  return summary
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.status(405).json({ name: 'Method not allowed' })
    return
  }

  const { article } = req.body as { article: string }

  const response = await processArticle(article);

  if (!response) {
    res.status(400).json({ name: 'Invalid Data' })
    return
  }

  res.status(200).json({ name: 'Success', content: response })
}
