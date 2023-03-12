import Container from './Container';
import {NavLink as RouterLink} from 'react-router-dom';

const Header = () => {

    const getClassName = props => {
        return `${props.isActive ? 'font-bold' : ''} hover:underline hover:text-gray-600 transition duration-300 `
    }

    return <Container className="bg-blue-300">
        <nav className="flex gap-10">
            <RouterLink className={`${getClassName} text-2xl font-bold`} to="/">Home</RouterLink>
            <RouterLink className={`${getClassName} text-2xl font-bold`} to="/about">About</RouterLink>
            <RouterLink className={`${getClassName} text-2xl font-bold`} to="/books">Books</RouterLink>
        </nav>
    </Container>
}

export default Header;