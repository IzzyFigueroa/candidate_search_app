import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      
          <NavLink to="/">
            Candidate Search
          </NavLink>
        
          <NavLink to="/savedcandidates">
            Saved Candidates
          </NavLink>
        
    </nav>
  );
};

export default Nav;