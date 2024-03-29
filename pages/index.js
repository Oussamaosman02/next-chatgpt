import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import ReactMarkdown from 'react-markdown'
import { useEffect, useRef, useState } from 'react'
import Float from '@/components/float'
import Tokens from '@/components/tokens'

const randNum = Math.random() * 1000

export default function Home () {
  // función para bajar cada vez que se recarga el componente
  const scroll = () => window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  })

  // constantes
  const refPre = useRef()
  const refKey = useRef()
  const refModel = useRef()
  const [apiKey, setApiKey] = useState('')
  const [conversation, setConversation] = useState([{ role: 'system', content: 'Eres una inteligencia artificial.' }])
  const [esp, setEsp] = useState('')
  const [tokens, setTokens] = useState(0)
  // recoger la api key si está ya en el navegador
  useEffect(() => {
    setApiKey(localStorage.getItem('key'))
  }, [apiKey, setApiKey])

  // manejamos el formulario del preguntas
  async function handleSubmit (e) {
    e.preventDefault()
    const pregunta = refPre.current.value
    const modelo = refModel.current.value
    scroll()
    if (pregunta && apiKey) {
      setEsp('Generando respuesta')
      const data = [...conversation, { role: 'user', content: pregunta }]
      setConversation([...data])
      refPre.current.value = ''
      const res = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ data, key: apiKey, modelo })
      })
      res.json().then((res) => {
        const resultado = res.result[0].message.content
        setTokens(res.tokens)
        setConversation([...data, { role: 'assistant', content: resultado }])
      }
      )
      setEsp('')
      scroll()
    } else {
      alert('Introduce una pregunta')
    }
    scroll()
  }
  function handleKey (e) {
    e.preventDefault()
    const valorKey = refKey.current.value
    if (valorKey) {
      setApiKey(valorKey)
      localStorage.setItem('key', valorKey)
    } else {
      alert('introduce la api key')
    }
  }
  return (
    <>
      <Head>
        <title>CReal-GPT</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Float />
        <Tokens tokens={tokens} />
        <form className={styles.pregunta} style={{ '--display': apiKey ? 'flex' : 'none' }} onSubmit={(e) => handleSubmit(e)}>
          <select ref={refModel}>
            <option value='gpt-3.5-turbo'>3</option>
            <option value='gpt-4'>4</option>
          </select>
          <input placeholder='Mensaje' ref={refPre} />
          <button>Enviar</button>
        </form>
        <ul className={styles.ul}>
          {
            conversation.length > 1
              ? (
                  conversation.map((rp, i) => {
                    let st
                    let random
                    let envelope
                    if (rp.role === 'user') {
                      st = styles.user
                      random = apiKey
                      envelope = (child) => child
                    } else if (rp.role === 'assistant') {
                      st = styles.ai
                      random = randNum
                      envelope = (child) => {
                        return (
                          <ReactMarkdown>
                            {child}
                          </ReactMarkdown>
                        )
                      }
                    } else {
                      st = styles.sys
                      envelope = (child) => child
                    }
                    return (
                      <li
                        className={st}
                        style={{ '--url': `url('https://api.dicebear.com/5.x/adventurer/svg?seed=${random}')` }}
                        key={i}
                      >

                        {
                          envelope(rp.content)
                        }
                      </li>
                    )
                  })
                )
              : (
                <li className={styles.nada}>
                  <h2>¿Qué necesitas?</h2>
                  <p>
                    Soy una IA muy sabia, una de las más capaces del mercado.
                  </p>
                  <h3>Esta IA puede:</h3>
                  <ul>
                    <li>Tener una variedad de aplicaciones, ya que interactúo con los usuarios en
                      tiempo real y ofrezco una experiencia de conversación más natural.
                    </li>
                    <li>Ser utilizada para proporcionar información y asistencia en tiempo real a los estudiantes,
                      responder preguntas sobre cursos y asignaciones, y ofrecer recomendaciones personalizadas para el aprendizaje.
                    </li>
                    <li>Proporcionar soluciones a problemas técnicos y asistir en la resolución de problemas de manera rápida y eficiente.</li>
                  </ul>
                  <p>¿Necesitas reiniciar la conversación? Reinicia la página 😅</p>
                  <p>
                    ¿Mis limitaciones? Descubre si tengo por ti mismo 😎
                  </p>
                  <form className={styles.api} style={{ '--display': apiKey ? 'none' : 'flex' }} onSubmit={(e) => handleKey(e)}>
                    <input placeholder='api key de OpenAi' ref={refKey} />
                    <button>
                      Empezar
                    </button>
                  </form>
                </li>
                )
          }
        </ul>
        <p className={styles.espera}>
          {esp}
        </p>
      </main>
    </>
  )
}
