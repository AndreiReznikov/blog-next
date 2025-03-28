import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { BACKEND_URL } from '@/lib/Constants';
import styles from './page.module.css'

export default async function Authors() {
  const session = await getServerSession(authOptions);

  let authors = [];

  try {
    const res = await fetch(`${BACKEND_URL}/users`, {
      cache: 'no-cache',
      headers: {
        authorization: `Bearer ${session?.backendTokens?.accessToken}`
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    authors = await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    authors = [];
  }

  if (!authors?.length) return (
    <div className={styles['not-found-container']}>The authors have not been found</div>
  );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Authors</h1>
        <div className={styles.wrapper}>
          {authors?.map(author => (
            <Link className={styles.link} href={`authors/${author?.id}`}>
              <article className={styles.article} key={author?.id}>
                <h2>{author?.name}</h2>
                <p>{author?.posts?.length ?? 0} posts</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}