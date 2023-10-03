import { createContext, useState, useContext } from 'react';

interface DataContextProps {
  displayType: string;
  setDisplayType: (value: string) => void;
}

const DataContext = createContext<DataContextProps>({
  displayType: 'films',
  setDisplayType: (_value: string) => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [displayType, setDisplayType] = useState<string>('films');

  return (
    <DataContext.Provider value={{ displayType, setDisplayType }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
