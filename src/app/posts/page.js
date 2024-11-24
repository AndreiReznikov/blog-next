import Link from 'next/link';
import { posts } from '@/mock/mock';

export default function PostsPage() {
  return (
    <div>
      <h1>All Blog Posts</h1>
      <div style={{ paddingTop: '40px' }}>
        {posts.map(post => (
          <article key={post.id}>
            <Link href={`posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p style={{ paddingBottom: '30px'}}>{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}