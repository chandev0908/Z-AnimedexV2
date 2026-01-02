import { notFound } from "next/navigation";
import SearchClient from "./SearchClient";

export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams: Promise<{ query?: string }> 
}) {
  const params = await searchParams;
  const query = params.query;

  return {
    title: `Search results for "${query}"`,
    description: `Showing search results for "${query}"`,
  };
}

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ query?: string }> 
}) {
  const params = await searchParams;
  const query = params.query;

  if (!query) notFound();

  return <SearchClient query={query} />;
}