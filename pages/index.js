import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useRef, useState } from 'react'
const random1 = Math.random() * 1000
const random2 = Math.random() * 1000
export default function Home () {
  const scrll = () => window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  })
  const refPre = useRef()
  const refKey = useRef()
  const [key, setKey] = useState('')
  const [conversation, setConversation] = useState([{ role: 'system', content: 'Eres una inteligencia artificial.' }])
  const [esp, setEsp] = useState('')
  useEffect(() => {
    setKey(localStorage.getItem('key'))
  }, [key, setKey])
  async function handleSubmit (e) {
    e.preventDefault()
    const pregunta = refPre.current.value
    scrll()
    if (pregunta && key) {
      setEsp('Generando respuesta')
      const datoss = [...conversation, { role: 'user', content: pregunta }]
      setConversation(datoss)
      refPre.current.value = ''
      const res = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ datoss, key })
      })
      res.json().then((result) => {
        const resultado = result.result.choices[0].message.content
        setConversation([...datoss, { role: 'assistant', content: resultado }])
      }
      )
      setEsp('')
      scrll()
    } else {
      alert('Introduce una pregunta')
    }
    scrll()
  }
  function handleKey (e) {
    e.preventDefault()
    const valorKey = refKey.current.value
    if (valorKey) {
      setKey(valorKey)
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
        <form style={{ display: key ? 'flex' : 'none', gap: '10px', position: 'fixed', bottom: '10px', zIndex: '100' }} onSubmit={(e) => handleSubmit(e)}>
          <input style={{ padding: '10px', width: '85vw' }} placeholder='Mensaje' ref={refPre} />
          <button style={{ padding: '3px' }}>Enviar</button>
        </form>

        <ul className={styles.ul}>
          {
            conversation.length > 1
              ? (
                  conversation.map((rp, i) => {
                    let st
                    let random
                    if (rp.role === 'user') {
                      st = styles.user
                      random = key ?? random1
                    } else if (rp.role === 'assistant') {
                      st = styles.ai
                      random = random2
                    } else {
                      st = styles.sys
                    }
                    return (
                      <li
                        className={st}
                        style={{ '--url': `url('https://api.dicebear.com/5.x/adventurer/svg?seed=${random}')` }}
                        key={i}
                      >
                        {
                    rp.content
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
                    <li>Tener una variedad de aplicaciones, ya que interactuo con los usuarios en
                      tiempo real y ofrezco una experiencia de conversación más natural.
                    </li>
                    <li>Ser utilizada para proporcionar información y asistencia en tiempo real a los estudiantes,
                      responder preguntas sobre cursos y asignaciones, y ofrecer recomendaciones personalizadas para el aprendizaje.
                    </li>
                    <li>Proporcionar soluciones a problemas técnicos y asistir en la resolución de problemas de manera rápida y eficiente.</li>
                  </ul>
                  <p>¿Necesitas reiniciar la conversación? Reinicia la página 😅</p>
                  <p>
                    ¿Mis limitaciones? Descúbrelas por ti mismo 😎
                  </p>
                  <form style={{ display: key ? 'none' : 'flex', gap: '10px', flexDirection: 'column', width: '75%', justifyContent: 'center', alignItems: 'center' }} onSubmit={(e) => handleKey(e)}>
                    <input style={{ padding: '10px', border: 'none', borderRadius: '10px', width: '75%' }} placeholder='api key' ref={refKey} />
                    <button style={{ width: 'fit-content', padding: '1px 20px', border: 'none', borderRadius: '10px', marginBottom: '5px' }}>
                      Empezar
                    </button>
                  </form>
                </li>
                )

          }
        </ul>
        <p className={styles.mess}>
          {esp}
        </p>
      </main>
    </>
  )
}
