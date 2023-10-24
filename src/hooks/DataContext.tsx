import { createContext, useState, useContext } from 'react';

interface DataContextProps {
  displayType: string;
  setDisplayType: (value: string) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
}

const DataContext = createContext<DataContextProps>({
  displayType: 'movie',
  setDisplayType: (_value: string) => {},
  userId: null,
  setUserId: (_id: string | null) => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [displayType, setDisplayType] = useState<string>('movie');
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <DataContext.Provider value={{ displayType, setDisplayType, userId, setUserId }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
