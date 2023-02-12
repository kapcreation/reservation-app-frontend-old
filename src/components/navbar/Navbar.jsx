import "./navbar.css"
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Navbar = () => {
  const { user } = useAuth()
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link className="logo" to="/">lamabooking</Link>
        {user? user.username : <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>}
      </div>
    </div>
  )
}

export default Navbar