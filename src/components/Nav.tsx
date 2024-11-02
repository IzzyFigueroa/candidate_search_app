import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      
          <NavLink to="/">
            Candidate Search
          </NavLink>
        
          <NavLink to="/saved-candidates">
            Saved Candidates
          </NavLink>
        
    </nav>
  );
};

export default Nav;