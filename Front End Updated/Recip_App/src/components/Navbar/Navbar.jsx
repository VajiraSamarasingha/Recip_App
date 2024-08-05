import Nav from 'react-bootstrap/Nav';
import './Navbar.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const [cookies,setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = ()=>{
    setCookies('access_token','');
    window.localStorage.removeItem('userID');
    navigate('/auth');
  }
  return (
    <Nav className='navbar' fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/" eventKey="link-0">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/create-recipy' eventKey="link-1">Create Recipe</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/saved-recipy' eventKey="link-2">Saved Recipt</Nav.Link>
      </Nav.Item>
      {!cookies.access_token ?(<Nav.Item>
        <Nav.Link href='/auth' eventKey="link-3">Login/Register</Nav.Link>
      </Nav.Item>):<button onClick={logout}>Logout</button>}
      
    </Nav>
  );
}

export default Navbar;