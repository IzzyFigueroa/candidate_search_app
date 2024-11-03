import { useState, useEffect } from 'react';
import axios from 'axios';



interface Candidate {
  login: string;
  avatar_url: string;
  name: string;
  location: string;
  email: string;
  company: string;
  html_url: string;
}

function CandidateSearch() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>(() => {
    const savedCandidates = localStorage.getItem('potentialCandidates');
    return savedCandidates ? JSON.parse(savedCandidates) : [];
  });

  useEffect(() => {
    axios.get('https://api.github.com/users')
      .then(response => {
        setCandidates(response.data);
        setCurrentCandidate(response.data[0]);
      })
      .catch(error => console.error('Error fetching candidates:', error));
  }, []);

  const handleSaveCandidate = () => {
    if (currentCandidate) {
      setPotentialCandidates(prev => {
        const updatedCandidates = [...prev, currentCandidate];
        localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
        return updatedCandidates;
      });
      showNextCandidate();
    }
  };

  const showNextCandidate = () => {
    setCandidates(prev => {
      const nextCandidates = prev.slice(1);
      setCurrentCandidate(nextCandidates[0]);
      return nextCandidates;
    });
  };

  if (!currentCandidate) {
    return <div>No more candidates available</div>;
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        <img src={currentCandidate.avatar_url} alt="Avatar" />
        <h2>{currentCandidate.login}</h2>
        <p>Username: {currentCandidate.login}</p>
        <p>Location: {currentCandidate.location}</p>
        <p>Email: {currentCandidate.email}</p>
        <p>Company: {currentCandidate.company}</p>
        <a href={currentCandidate.html_url}>Profile</a>
        <div>
          <button onClick={handleSaveCandidate}>+</button>
          <button onClick={showNextCandidate}>-</button>
        </div>
      </div>
    </div>
  );
}

export default CandidateSearch;