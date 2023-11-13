import { createContext, useState, useContext } from 'react';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  is_already_seen: boolean;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface DataContextProps {
  displayType: string;
  setDisplayType: (value: string) => void;
  chosenMovieId: number | null;
  setChosenMovieId: (id: number | null) => void;
  chosenMovie: Array<Movie>;
  setChosenMovie: (value: object) => void;
}

const DataContext = createContext<DataContextProps>({
  displayType: 'movie',
  setDisplayType: (_value: string) => {},
  chosenMovieId: null,
  setChosenMovieId: (_id: number | null) => {},
  chosenMovie: null,
  setChosenMovie: (_value: object) => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [displayType, setDisplayType] = useState<string>('movie');
  const [chosenMovieId, setChosenMovieId] = useState<number | null>(null);
  const [chosenMovie, setChosenMovie] = useState<Array<Movie> | null>(null);

  return (
    <DataContext.Provider
      value={{
        displayType,
        setDisplayType,
        chosenMovieId,
        setChosenMovieId,
        chosenMovie,
        setChosenMovie,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
