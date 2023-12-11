import { Avatar, Dropdown, Navbar } from 'flowbite-react';

import avatar from '../assets/avatar.jpg';
import { deleteUser } from '../services/userAPI';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../hooks/Context';

const NavBar = () => {
  const { user, setUser } = useUserState()
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUser(null)
  }

  const handleChangePassword = () => {
    navigate("/changepassword")
  }

  const handleRemoveAccount = async () => {
    if (user?.status === 'success') {
      try {
        await deleteUser(user.data.id);
        setUser(null);
        navigate("/");

      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const UserData = () => {
    if (user?.status === 'success') {
      return (
        <Dropdown.Header>
          <span className="block text-sm">{user.data.name}</span>
          <span className="block text-sm font-medium truncate">
            {user.data.email}
          </span>
        </Dropdown.Header>
      )
    }
  }

  return (
    <Navbar fluid rounded className="bg-transparent">
      <Navbar.Brand href="/">
        {/* <img src={logo} className="h-6 mr-3 sm:h-60" alt="Flowbite React Logo" /> */}
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={true}
          inline
          label={
            <Avatar alt="User settings" img={avatar} rounded />
          }
          data-test-id="dropdown-user-settings"
        >
          <UserData />
          <Dropdown.Item data-test-id="change-password" onClick={() => handleChangePassword()}>Byt lösenord</Dropdown.Item>
          <Dropdown.Item data-test-id="change-password" onClick={() => handleRemoveAccount()}>Ta bort användarkonto</Dropdown.Item>
          <Dropdown.Item data-test-id="logout" onClick={() => handleSignOut()}>Logga ut</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default NavBar
