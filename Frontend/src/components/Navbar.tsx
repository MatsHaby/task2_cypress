import { Link } from 'react-router-dom';
import { useUserState } from '../hooks/Context';

const NavBar = () => {
  const { setUser } = useUserState()

  const handleSignOut = () => {
    setUser(null)
  }

  return (
    <div className="flex md:order-2">
      <Link to="/dashboard" className="mr-5">
        Dashboard
      </Link>
      <Link data-cy="changePassword" to="/changePassword" className="mr-5">
        Byt lösenord
      </Link>
      <Link data-cy="signOut" onClick={() => handleSignOut()} to="/" className="mr-5">
        Logga ut
      </Link>
    </div>
  );
}

export default NavBar
