// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from 'openai'

export default async function handler (req, res) {
  const configuration = new Configuration({
    apiKey: req.body.key
  })
  const openai = new OpenAIApi(configuration)
  const respuesta = await openai.createChatCompletion({
    model: req.body.modelo,
    messages: req.body.data
  })
  const datos = await respuesta.data
  const tokens = datos.usage.total_tokens
  console.log(tokens)
  res.status(200).json({ result: datos.choices, tokens })
}
