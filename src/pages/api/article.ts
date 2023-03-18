// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { getExtractedArticle, validateUrl, summerizeArticle, expoundArticle } from "@/modules"

type Data = {
  name: string,
  content?: Object
}


async function processArticle(url: string) {
  const article = await getExtractedArticle(url)

  if (!article) {
    return null
  }

  if (!article.content) {
    return {
      title: "Invalid Article",
    }
  }

  const summary = await summerizeArticle(article.content);

  return {
    title: article.title,
    summary: summary,
    url: article.url,
    links: article.links,
    source: article.source
  }

}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if (req.method !== 'POST') {
    res.status(405).json({ name: 'Method not allowed' })
    return
  }
  const { url } = req.body as { url: string }
  const isValidUrl = await validateUrl(url);

  if (!isValidUrl) {
    res.status(400).json({ name: 'Invalid URL' })
    return
  }

  const response = await processArticle(url);

  // console.log(response)

  if (!response) {
    res.status(400).json({ name: 'Invalid Data' })
    return
  }

  res.status(200).json({ name: 'Success', content: response })
}
