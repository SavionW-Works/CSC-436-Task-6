import Container from '../components/Container'; 
import {NavLink as RouterLink} from 'react-router-dom';

const Home = () => {
    return (<Container className="text-center">
        <h2 className='text-4xl text-center font-bold'> Welcome to Blue Ocean Bookstore! </h2> 
        <p className='text-xl py-3'> Set sail and discover lands of reading! </p> 
        <RouterLink className={`text-2xl font-bold`} to="/books">Discover our Selection!</RouterLink>
    </Container>)
}

export default Home;