// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export default async function handler (req, res) {
  console.log('req.body', req.body)
  const respuesta = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: req.body
  })
  const datos = await respuesta.data
  res.status(200).json({ result: datos })
}
