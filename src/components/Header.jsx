import { Link } from "react-router";

export const Header = () => {
    return (<> 
        <nav>
            <ul>
                <Link to="/"><li className="nav-bar">Home </li></Link>
                <Link to="/articles"><li className="nav-bar">All Articles </li></Link>
                <Link to="/profile"><li className="nav-bar">Profile</li></Link>
            </ul>
        </nav>
    </>)
}