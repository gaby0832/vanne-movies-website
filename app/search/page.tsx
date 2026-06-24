import tmdb from '../tmdb/tmdb'

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams;

  return (
    <div className='py-3 max-w-6xl my-0 mx-auto flex flex-col gap-4 text-white bg-[#080808] font-sans'>
      Pesquisando por: {q}
    </div>
  );
}