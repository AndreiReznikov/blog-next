'use client';

import { signIn } from 'next-auth/react';
import styles from './page.module.css'
import { useRef } from 'react';
import Link from 'next/link';

export default async function LoginPage() {
  const email = useRef('');
  const password = useRef('');

  const onSubmit = async () => {
    await signIn('credentials', {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: '/',
    });
  }

  return (
    <main className={styles.main}>
      <div className={styles['form-container']}>
        <div className={styles.form}>
          <h2>Log in</h2>
          <div className={styles['inputs-wrapper']}>
            <input onChange={(e) => email.current = e.target.value} className={styles.input} type='email' placeholder='Email' required />
            <input onChange={(e) => password.current = e.target.value} className={styles.input} type='password' placeholder='Password' required />
          </div>
          <div className={styles['button-wrapper']}>
            <button onClick={onSubmit} className={styles.button}>Log in</button>
          </div>
          <span className={styles.subtext}>
            Don't have a Next Blog account?
            <Link className={styles['register-link']} href='/register'>
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}