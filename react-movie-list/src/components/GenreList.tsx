import { useGetGenresQuery } from "../features/movieApi";

interface GenresListProps {
  onGenreSelect: (id: number, name: string) => void;
}

const GenresList: React.FC<GenresListProps> = ({ onGenreSelect }) => {
  const { data, isLoading, error } = useGetGenresQuery(undefined);

  if (isLoading) return <p>Film Türleri Yükleniyor...</p>;
  if (error) return <p className="text-red-900">Film Türlerini Çekerken Bir Hata oluştu.</p>;
  
console.log(data)
  return (
    <div className=" grid place-items-center grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-4 p-4">
      {data?.genres.map((genre: { id: number; name: string }) => (
        <div
          key={genre.id}
          className="cursor-pointer rounded shadow  whitespace-nowrap text-white  hover:text-rose-600 font-semibold text-sm"
          onClick={() => onGenreSelect(genre.id, genre.name)}
        >
          <button className=" m-0 hover:bg-black  w-20 py-1 rounded">{genre.name}</button>
        </div>
      ))}
    </div>
  );
};

export default GenresList;
