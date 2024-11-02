import { createContext, useContext, useState, ReactNode } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

interface CandidateContextProps {
  savedCandidates: Candidate[];
  addCandidate: (candidate: Candidate) => void;
}

const CandidateContext = createContext<CandidateContextProps | undefined>(undefined);

export const CandidateProvider = ({ children }: { children: ReactNode }) => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  const addCandidate = (candidate: Candidate) => {
    setSavedCandidates((prevCandidates) => [...prevCandidates, candidate]);
  };

  return (
    <CandidateContext.Provider value={{ savedCandidates, addCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidateContext = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error('useCandidateContext must be used within a CandidateProvider');
  }
  return context;
};