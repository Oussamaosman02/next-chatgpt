import styles from '@/styles/float.module.css'

export default function Tokens ({ tokens }) {
  return (
    <button disabled className={styles.tokens}>
      Tokens:
      {tokens}
    </button>
  )
}
