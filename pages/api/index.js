// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from 'openai'

export default async function handler (req, res) {
  const configuration = new Configuration({
    apiKey: req.body.key
  })
  const openai = new OpenAIApi(configuration)
  const respuesta = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: req.body.datoss
  })
  const datos = await respuesta.data
  console.log('Tokens:', datos.usage.total_tokens)
  res.status(200).json({ result: datos.choices })
}
