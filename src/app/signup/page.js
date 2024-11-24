'use client';

import styles from './page.module.css'
import { useRef } from 'react';
import { BACKEND_URL } from '@/lib/Constants';

export default function SignUpPage() {
  // const { data } = useSession();
  const name = useRef('');
  const email = useRef('');
  const password = useRef('');

  const register = async () => {
    const res = await fetch(BACKEND_URL + '/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: name.current,
        email: email.current,
        password: password.current,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      alert(res.statusText);
      return;
    }

    const response = await res.json();
    alert('User Registered!');
  };

  return (
    <div className={styles.container}>
      <div className={styles['form-container']}>
        <form method='post' className={styles.form}>
          <h2>Sign up</h2>
          <div className={styles['inputs-wrapper']}>
            <input onChange={(e) => name.current = e.target.value} className={styles.input} placeholder='Name' required />
            <input onChange={(e) => email.current = e.target.value} className={styles.input} type='email' placeholder='Email' required />
            <input onChange={(e) => password.current = e.target.value} className={styles.input} type='password' placeholder='Password' required />
          </div>
          <div className={styles['button-wrapper']}>
            <button onClick={register} className={styles.button}>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}