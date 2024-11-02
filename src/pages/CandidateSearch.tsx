// src/components/CandidateSearch.tsx

import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import { useCandidateContext } from '../components/CandidateContext';
import { searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const { addCandidate } = useCandidateContext();

  useEffect(() => {
    fetchNextCandidate();
  }, []);

  const fetchNextCandidate = async () => {
    try {
      const candidate = await searchGithubUser('someUsername');
      setCurrentCandidate(candidate);
    } catch (error) {
      console.error('Failed to fetch candidate:', error);
    }
  };

  const handleAccept = () => {
    if (currentCandidate) {
      addCandidate(currentCandidate);
      fetchNextCandidate();
    }
  };

  const handleReject = () => {
    fetchNextCandidate();
  };

  if (!currentCandidate) {
    return <div>No more candidates available</div>;
  }

  return (
    <div>
      <img src={currentCandidate.avatar} alt={currentCandidate.name} />
      <h2>{currentCandidate.name}</h2>
      <p>Username: {currentCandidate.username}</p>
      <p>Location: {currentCandidate.location}</p>
      <p>Email: {currentCandidate.email}</p>
      <p>Company: {currentCandidate.company}</p>
      <a href={currentCandidate.html_url}>Profile</a>
      <button onClick={handleAccept}>+</button>
      <button onClick={handleReject}>-</button>
    </div>
  );
};

export default CandidateSearch;