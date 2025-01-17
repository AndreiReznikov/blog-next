'use client';

import { useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import image from '@/assets/logo/logo.png';
import userIcon from '@/assets/icons/user-icon.svg';
import styles from './header.module.css';

export default function Header() {
  const session = useSession();

  const handleSignOut = useCallback(async () => {
    await signOut({ callbackUrl: '/' });
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles['left-side-container']}>
        <div className={styles['logo-container']}>
          <Link href='/'>
            <Image src={image} width='100' height='44' alt='Logo' />
          </Link>
        </div>
        <nav className={styles.navbar}>
          <ul className={styles['navbar-list']}>
            <li className={styles['navbar-list-item']}>
              <Link href='/posts'>
                All posts
              </Link>
            </li>
            <li className={styles['navbar-list-item']}>
              <Link href='/authors'>
                Authors
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles['right-side-container']}>
        <Link href='/profile'>
          <Image src={userIcon} width='40' height='40' alt='Profile' />
        </Link>
        {
          session.status === 'authenticated' &&
          <span className={styles.signout} onClick={handleSignOut}>
            Sign Out
          </span>
        }
      </div>
    </header>
  )
}