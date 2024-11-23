import styles from './header.module.css';
import Image from 'next/image';
import image from '@/assets/logo/logo.png';
import userIcon from '@/assets/icons/user-icon.svg';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['left-side-container']}>
        <div className={styles['logo-container']}>
          <Link href='/'>
            <Image src={image} width='100' height='44' />
          </Link>
        </div>
        <nav className={styles.navbar}>
          <ul className={styles['navbar-list']}>
            <li className={styles['navbar-list-item']}>
              <Link href='/'>
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
          <Image src={userIcon} width='40' height='40' />
        </Link>
      </div>
    </header>
  )
}