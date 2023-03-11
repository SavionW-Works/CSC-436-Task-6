import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Books = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getData = async () => {
        const url = 'https://api.matgargano.com/api/books';
        setLoading(true);
        setError(false);
        try {
            const request = await fetch(url);
            const response = await request.json();
            setBooks(response);

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

        <div className="container">
            <div className="text-center">
                <h1 className='text-2xl font-bold'>Current Selection</h1>
            </div>

            {error && <ErrorAlert>{error}</ErrorAlert>}
            {!error && loading && <div className="max-w-[230px]"><Skeleton count="10" /></div>}

            <div className="row">
                {!error && !loading &&
                    <>
                        {books.map(book => {
                            return <>
                                <div className="col-sm-6 col-lg-3 col-xl-2  d-inline px-3 py-3" key={book.id}>
                                    <Link className='hover:underline' to={`/books/${book.id}`}>
                                        <div className="card" styles="width: 18rem;">
                                            <img src={book.imageURL} className="card-img-top img-thumbnail" />
                                            <div className="card-body text-center">
                                                {book.title}
                                            </div>
                                        </div>
                                    </Link>

                                </div>
                            </>
                        })}
                    </>
                }
            </div>


        </div>
    </>
}

export default Books;