'use client';

import { useRef } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import styles from './page.module.css'

export default async function LoginPage() {
  const postData = useRef({
    email: '',
    password: '',
  });

  const onSubmit = async () => {
    await signIn('credentials', {
      email: postData.current.email,
      password: postData.current.password,
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
            <input
              onChange={(e) => postData.current.email = e.target.value}
              className={styles.input}
              type='email'
              placeholder='Email'
              required
            />
            <input
              onChange={(e) => postData.current.password = e.target.value}
              className={styles.input}
              type='password'
              placeholder='Password'
              required
            />
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