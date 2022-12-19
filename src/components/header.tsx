import { AccountCircle, NotificationsNone, SearchRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import '../styles/header.scss';

const Header = () => {
    return(
        <header className="header" id="header">
            <div className="header-link">
                <a href='/' className='home-link'>
                    <span>MSMan</span>
                </a>
                <ul className='navbar'>
                    <li className='nav-item'>
                        <Link to="/" className="nav-link active">Home</Link>
                    </li>
                    <li className='nav-item'><Link to="/movie" className="nav-link">Movie</Link></li>
                    <li className='nav-item'><Link to="/series" className="nav-link">Series</Link></li>
                    <li className='nav-item'><Link to="/watchlist" className="nav-link">WatchList</Link></li>
                </ul>
            </div>
            <div className="header-action">
                <button>
                    <SearchRounded color='inherit' fontSize='medium' />
                </button>
                <button>
                    <NotificationsNone color='inherit' fontSize='medium' />
                </button>
                <button>
                    <AccountCircle color='inherit' fontSize='medium' />
                </button>
            </div>
        </header>
    )
}
export default Header;