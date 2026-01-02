import { notFound } from "next/navigation";
import AnimePage from "./AnimePage";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!params) notFound();
  const { id } = await params;
  const anime = await fetch(`https://api.jikan.moe/v4/anime/${id}`).then(
    (res) => res.json()
  );
  return {
    title: `${anime.data.title} - Z-Animedex`,
    description: `Details for anime with ID ${id}`,
  };
}

export default async function Page({ params }: { params: Promise<{ id?: string }> }) {
  const { id } = await params;
  return <AnimePage id={id} />;
}
