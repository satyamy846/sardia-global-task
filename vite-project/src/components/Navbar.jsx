import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="header">
        <ul className='flex gap-4'>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
        </ul>
    </div>
  )
}

export default Navbar;