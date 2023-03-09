import Container from '../components/Container';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Book = () => {



    const params = useParams(); //gets object with id from path in <Route>

    console.log(params["id"]) //gets id

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [book, setBook] = useState({});

    const getData = async () => {
        const url = `https://api.matgargano.com/api/books/${params["id"]}`; //adds book id to string
        setLoading(true);
        setError(false);
        try {
            const request = await fetch(url);
            const response = await request.json();
            setBook(response);

        } catch (e) {
            setError('Error: ' + e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return <>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {!error && !loading &&
            <>
                <div className="container columns-3 gap-5">
                    <div className="row">
                        <img src={book.imageURL} />
                    </div> 

                    <div className="justify-content-left">
                        <p className='text-2xl font-bold'> {book.title}</p> 
                        <p className='text-lg'>By: {book.author}</p> 
                        <p className='text-lg'>Publisher: {book.publisher}</p> 
                        <p className='text-lg'>Year: {book.year}</p> 
                        <p className='text-lg'>Pages: {book.pages}</p> 
                        <p className='text-lg'>Country: {book.country}</p>
                    </div>
                    
                    <div>
                        <Link className='hover:underline text-2xl font-bold' to={`/books`}>Back to Listing</Link>
                    </div>
                    
                </div> 

                

            </>
        }


    </>
}

export default Book;