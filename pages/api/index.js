// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from 'openai'

export default async function handler (req, res) {
  console.log(req.body.datoss ?? 'no hay datos')
  const configuration = new Configuration({
    apiKey: req.body.key
  })
  const openai = new OpenAIApi(configuration)
  const respuesta = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: req.body.datoss
  })
  const datos = await respuesta.data
  res.status(200).json({ result: datos })
}
