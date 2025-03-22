import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Inter } from 'next/font/google'
import Header from '@/components/Header/Header'
import CommentNotification from '@/components/CommentNotification/CommentNotification'
import { Providers } from '@/components/Providers/Providers'
import { BACKEND_URL } from '@/lib/Constants';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Blog',
  description: 'Next Blog project',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  let profile;

  try {
    const res = await fetch(`${BACKEND_URL}/users/${session?.user?.id}`, {
      headers: {
        authorization: `Bearer ${session?.backendTokens?.accessToken}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    profile = await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }

  const { posts } = profile ?? {};

  const articleIds = posts?.map((post) => post?.id);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <CommentNotification articleIds={articleIds} />
        </Providers>
      </body>
    </html>
  )
}
