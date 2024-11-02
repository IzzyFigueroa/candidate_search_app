// import React from 'react';
import { useCandidateContext } from '../components/CandidateContext';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const { savedCandidates } = useCandidateContext();

  if (savedCandidates.length === 0) {
    return <div>No candidates have been accepted</div>;
  }

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.map((candidate: Candidate, index: number) => (
        <div key={index}>
          <img src={candidate.avatar} alt={candidate.name} />
          <h2>{candidate.name}</h2>
          <p>Username: {candidate.username}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <a href={candidate.html_url}>Profile</a>
        </div>
      ))}
    </div>
  );
};

export default SavedCandidates;