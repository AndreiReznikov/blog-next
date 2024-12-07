'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/lib/Constants';
import styles from './page.module.css'

export default function RegisterPage() {
  const router = useRouter();

  const postData = useRef({
    name: '',
    email: '',
    password: '',
  });

  const register = async () => {
    try {
      await fetch(BACKEND_URL + '/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: postData.current.name,
          email: postData.current.email,
          password: postData.current.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => router.push('/login'));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles['form-container']}>
        <div method='post' className={styles.form}>
          <h2>Sign up</h2>
          <div className={styles['inputs-wrapper']}>
            <input
              onChange={(e) => postData.current.name = e.target.value}
              className={styles.input}
              placeholder='Name'
              required
            />
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
            <button onClick={register} className={styles.button}>Sign up</button>
          </div>
          <span className={styles.subtext}>
            Already have an account on the Next Blog?&nbsp;
            <Link className={styles['login-link']} href='/login'>
              Log in
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}