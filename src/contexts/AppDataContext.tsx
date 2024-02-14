// src/contexts/AppDataContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode, FC } from 'react';
import { fetchVenues, fetchClassesForVenue, fetchVenueById} from '../services/firestoreService';
import { Venue, Class } from '../types/types';

type AppDataContextType = {
  venues: Venue[];
  fetchClassesForVenue: (venueId: string) => Promise<Class[]>;
  fetchVenueById: (venueId: string) => Promise<Venue>;
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within a AppDataProvider');
  }
  return context;
};

interface AppDataProviderProps {
  children: ReactNode;
}

export const AppDataProvider: FC<AppDataProviderProps> = ({ children }) => {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchedVenues = await fetchVenues();
      setVenues(fetchedVenues);
    };

    loadData();
  }, []);

  // No need to fetch all classes for all venues at app start.
  // Classes can be fetched on-demand when a specific venue is selected.

  return (
    <AppDataContext.Provider value={{ venues, fetchClassesForVenue, fetchVenueById }}>
      {children}
    </AppDataContext.Provider>
  );
};
