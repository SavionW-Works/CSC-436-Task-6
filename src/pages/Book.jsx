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


                <div className="container">

                    <div className="row">
                        <div className="col-3 text-center">
                            <img className="img-thumbnail" src={book.imageURL} />
                            <Link className='hover:underline text-2xl font-bold' to={`/books`}>Back to Listing</Link>
                        </div>

                        {/* Content */}
                        <div className="col-9 w-100">

                            <div className="row-12 align-items-start pb-6">
                                <div className="col align-items-left">
                                    <p className="font-bold display-4"> {book.title} </p>
                                    <p className="display-4 fs-3"> By: {book.author} </p>
                                </div>
                            </div>

                            <div className="row py-3">

                                <div className="col-3">
                                    <div class="card text-center">
                                        <div className="card-header font-bold text-xl">
                                            Publisher
                                        </div>
                                        <div class="card-body">
                                            <h3 className='text-xl'>
                                                {book.publisher}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-3">
                                    <div class="card text-center">
                                        <div className="card-header font-bold text-xl">
                                            Publish Date
                                        </div>
                                        <div class="card-body">
                                            <h3 className='text-xl'>
                                                {book.year}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-3">
                                    <div class="card text-center">
                                        <div className="card-header font-bold text-xl">
                                            Pages
                                        </div>
                                        <div class="card-body">
                                            <h3 className='text-xl'>
                                                {book.pages}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-3">
                                    <div class="card text-center">
                                        <div className="card-header font-bold text-xl">
                                            Country
                                        </div>
                                        <div class="card-body">
                                            <h3 className='text-xl'>
                                                {book.country}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row pt-2">
                                <div className="col-2 px-3 mx-2">
                                    <a href="" className="btn btn-primary btn-lg p-3">
                                        <h2 className='text-3xl font-bold'>Buy</h2>
                                    </a>
                                </div> 

                                <div className="col-2 px-3 mx-2">
                                    <a href="" className="btn btn-secondary btn-lg p-3">
                                        <h2 className='text-3xl font-bold'>Borrow</h2>
                                    </a>
                                </div>

                                
                            </div>
                        </div>

                    </div>


                </div>

            </>
        }


    </>
}

export default Book;