import { createContext } from 'react';
import { StringObject } from '@/types/Ui';

export const SearchContext = createContext<StringObject | undefined>(undefined);
