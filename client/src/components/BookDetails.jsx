import React from 'react';
import { GET_BOOK_QUERY } from '../queries/queries';
import { Query } from 'react-apollo';

const BookDetails = ({bookId}) => {
    return (
        <div>
            <p>Output book deatils</p>
            {bookId ? <Query query={GET_BOOK_QUERY} variables={{id:bookId}}>
                {({ loading, error, data }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error :( </div>;
            
                return (
                    <div>
                        <h3>{data.book.genre}</h3>
                        <h3>{data.book.author.name}</h3>
                        <h4>{data.book.author.name} Books:</h4>
                        <h5>{data.book.author.books.map(book =>{
                        return (
                            <div key={book.id}>
                                <ul id="book-list">
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
            :
            <h5>Nothing to do here...</h5>} 
        </div>
    )
}

export default BookDetails;