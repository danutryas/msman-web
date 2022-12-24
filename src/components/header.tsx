import { AccountCircle, NotificationsNone, SearchRounded } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import '../styles/header.scss';

const Header = () => {
    const location = useLocation()
    const pathList = [
        {
            pathname : '/',
            title : 'Home'
        },
        {
            pathname : '/movie',
            title : 'Movie'
        },
        {
            pathname : '/series',
            title : 'Series'
        },
        {
            pathname : '/list',
            title : 'List'
        },
    ]

    return(
        <header className="header" id="header">
            <div className="header-link">
                <a href='/' className='home-link'>
                    <span>MSMan</span>
                </a>
                <ul className='navbar'>
                    {
                        pathList.map((path,index) => {
                            return(
                                <li key={index} className={`nav-item `}><Link to={path.pathname} className={`nav-link ${location.pathname === path.pathname ? "active" : ""}`}>{path.title}</Link></li>
                            )
                        })
                    }
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