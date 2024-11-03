import { useState } from 'react';
// Ensure the CSS file is imported

interface Candidate {
  login: string;
  avatar_url: string;
  name: string;
  location: string;
  email: string;
  company: string;
  html_url: string;
}

function SavedCandidates() {
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>(() => {
    const savedCandidates = localStorage.getItem('potentialCandidates');
    return savedCandidates ? JSON.parse(savedCandidates) : [];
  });

  if (potentialCandidates.length === 0) {
    return <div className="no-candidates">No candidates have been accepted</div>;
  }

  return (
    <div className="saved-candidates-container">
      <h1>Potential Candidates</h1>
      <div className="candidates-list">
        {potentialCandidates.map(candidate => (
          <div key={candidate.login} className="candidate-card">
            <img src={candidate.avatar_url} alt="Avatar" className="candidate-avatar" />
            <h2 className="candidate-name">{candidate.name}</h2>
            <p className="candidate-username">Username: {candidate.login}</p>
            <p className="candidate-location">Location: {candidate.location || 'N/A'}</p>
            <p className="candidate-email">Email: {candidate.email || 'N/A'}</p>
            <p className="candidate-company">Company: {candidate.company || 'N/A'}</p>
            <a href={candidate.html_url} className="candidate-profile">Profile</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedCandidates;