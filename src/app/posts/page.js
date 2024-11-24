import Link from 'next/link';
import { BACKEND_URL } from '@/lib/Constants';

export default async function PostsPage() {
  const res = await fetch(`${BACKEND_URL}/post`);
  const posts = await res.json();

  return (
    <div>
      <h1>All Blog Posts</h1>
      <div style={{ paddingTop: '40px' }}>
        {posts?.map(post => (
          <article key={post.id}>
            <Link href={`posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p style={{ paddingBottom: '30px'}}>{post.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}