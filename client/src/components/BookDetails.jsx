import React from 'react';
import { GET_BOOK_QUERY } from '../queries/queries';
import { Query } from 'react-apollo';

const BookDetails = ({bookId}) => {
    return (
        <div>
            {bookId ? 
                <div>
                    <h2>Book Deatils</h2>
                    <Query query={GET_BOOK_QUERY} variables={{id:bookId}}>
                    {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error :( </div>;
                
                    return (
                        <div>
                            <h3>Author: {data.book.author.name}</h3>
                            <h3>Genre: {data.book.genre}</h3>
                            <h4>{data.book.author.name} Books:</h4>
                            <h5>{data.book.author.books.map(book =>{
                            return (
                                <div key={book.id}>
                                    <ul id="other-books">
                                        <li>
                                            {book.name}
                                        </li>
                                    </ul>
                                </div>
                            )}
                        )}</h5>
                        </div>
                    )
                    }}
                    </Query>
                </div>
            :
            <h2>Nothing to do here...</h2>} 
        </div>
    )
}

export default BookDetails;