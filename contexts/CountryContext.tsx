import React, { createContext, useContext, useState, ReactNode } from 'react';
import { flagIcons } from '@/utils/images';

export interface Country {
  id: string;
  name: string;
  flag: any; // Changed to any for local images
  currency: string;
}

interface CountryContextType {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
  isCountrySelectionVisible: boolean;
  setIsCountrySelectionVisible: (visible: boolean) => void;
}

const defaultCountry: Country = {
  id: 'dk',
  name: 'DENMARK',
  flag: flagIcons.denmark, 
  currency: 'DKK'
};

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};

interface CountryProviderProps {
  children: ReactNode;
}

export const CountryProvider: React.FC<CountryProviderProps> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(defaultCountry);
  const [isCountrySelectionVisible, setIsCountrySelectionVisible] = useState(false);

  const value: CountryContextType = {
    selectedCountry,
    setSelectedCountry,
    isCountrySelectionVisible,
    setIsCountrySelectionVisible,
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};