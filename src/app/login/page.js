'use client';

import { signIn } from 'next-auth/react';
import styles from './page.module.css'
import { useRef } from 'react';

export default async function LoginPage() {
  // const { data } = useSession();
  const email = useRef('');
  const password = useRef('');

  const onSubmit = async () => {
    const result = await signIn('credentials', {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: '/',
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles['form-container']}>
        <div className={styles.form}>
          <h2>Sign in</h2>
          <div className={styles['inputs-wrapper']}>
            <input onChange={(e) => email.current = e.target.value} className={styles.input} type='email' placeholder='Email' required />
            <input onChange={(e) => password.current = e.target.value} className={styles.input} type='password' placeholder='Password' required />
          </div>
          <div className={styles['button-wrapper']}>
            <button onClick={onSubmit} className={styles.button}>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
}