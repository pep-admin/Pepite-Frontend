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
  userId: string | null;
  setUserId: (id: string | null) => void;
  chosenMovie: Array<Movie>;
  setChosenMovie: (value: object) => void;
}

const DataContext = createContext<DataContextProps>({
  displayType: 'movie',
  setDisplayType: (_value: string) => {},
  userId: null,
  setUserId: (_id: string | null) => {},
  chosenMovie: null,
  setChosenMovie: (_value: object) => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [displayType, setDisplayType] = useState<string>('movie');
  const [userId, setUserId] = useState<string | null>(null);
  const [chosenMovie, setChosenMovie] = useState<Array<Movie> | null>(null);

  return (
    <DataContext.Provider
      value={{
        displayType,
        setDisplayType,
        userId,
        setUserId,
        chosenMovie,
        setChosenMovie,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
