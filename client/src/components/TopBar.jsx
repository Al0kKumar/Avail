import { Link } from 'react-router-dom';
import Button from './Button';
import { useNavigate } from 'react-router-dom';


export default function Topbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/") 
  }

  return (
    <header
      className="
        h-16
        border-b border-white/10
        flex items-center justify-end
        px-10
        bg-white/5
        backdrop-blur-xl
      "
    >
      <Button className='cursor-pointer' onClick={logout} variant="secondary">Logout</Button>
    </header>
  );
}
