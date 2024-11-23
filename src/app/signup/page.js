import { useSession } from 'next-auth/react';
import styles from './page.module.css'
import Link from 'next/link';

export default async function ProfilePage() {
  // const { data } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles['form-container']}>
        <form method='post' className={styles.form}>
          <h2>Sign up</h2>
          <div className={styles['inputs-wrapper']}>
            <input className={styles.input} type='email' placeholder='Email' required />
            <input className={styles.input} type='password' placeholder='Password' required />
          </div>
          <div className={styles['button-wrapper']}>
            <Link href={"api/auth/signin"}>Sign up</Link>
            {/* <button className={styles.button}>Sign in</button> */}
          </div>
        </form>
      </div>
    </div>
  );
}