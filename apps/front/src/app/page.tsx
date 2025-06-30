import Hero from "@/components/hero";
import Posts from "@/components/Posts";
import { fetchPosts } from "@/lib/actions/postAction";

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <main>
      <Hero></Hero>
      <Posts posts={posts}></Posts>
    </main>
  );
}
