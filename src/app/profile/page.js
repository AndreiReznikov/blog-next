import styles from './page.module.css'

export default async function ProfilePage() {
  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      <div className={styles['form-container']}>
        <form method='post' className={styles.form}>
          <h2>Sign in</h2>
          <div className={styles['inputs-wrapper']}>
            <input className={styles.input} type='email' placeholder='Email' required />
            <input className={styles.input} type='password' placeholder='Password' required />
          </div>
          <div className={styles['button-wrapper']}>
            <button className={styles.button} type='submit'>Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}