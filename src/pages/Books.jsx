import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Books = () => {

    const [bookData, setBookData] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(true)

    const searchHandler = (e) => {

        setShowAll(false);

        
        setSearch(e.target.value); {/*setSearch is passed in as a prop */ }
        console.log(search)
        

    }

    const getData = async () => {
        const url = 'https://api.matgargano.com/api/books';
        setLoading(true);
        setError(false);
        try {
            const request = await fetch(url);
            const response = await request.json();
            setBookData(response);
            //setTempBooks(response);

        } catch (e) {
            setError('Error: ' + e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
        
        setBooks(bookData)
        
        console.log(showAll)
        
        if (showAll == false) {
            setBooks(bookData.filter(book => {
                //Title Filter
                return (book.title.toUpperCase().includes(search.toUpperCase()));
    
            }));
        } 

        

    }, [search, showAll]);

    
    

    return <>
        
        <div className="container">
            <div className="text-center">
                <h1 className='text-5xl font-bold'>Current Selection</h1>
            </div>

            {error && <ErrorAlert>{error}</ErrorAlert>}
            {!error && <div className="row gap-5 text-center">
                
                <label htmlFor="search" className='text-2xl text-bold'> Search: </label>

                {/*Whenever the user types (found with a change in the input box), run searchHanlder */}
                <input type="text" className="border border-dark" name="search" onChange={searchHandler} value={search} /> 
                <button className='btn btn-primary' onClick={()=> (setBooks(bookData), setSearch(""))}> 
                    Show All Books
                </button>
               


                {/* <a href="" className="btn btn-secondary btn-lg p-3" onClick={() => setSearch("")}>
                     <h2 className='text-3xl font-bold'>Reset Listing</h2>
                </a> */}
            </div>}
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
                                            <div className="card-body text-center font-bold">
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