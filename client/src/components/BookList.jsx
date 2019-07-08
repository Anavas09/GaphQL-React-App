import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_BOOKS_QUERY } from '../queries';

class BookList extends Component {
    render() {
        return (
            <div>
                <Query query={GET_BOOKS_QUERY}>
                    {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error :( </div>;
                
                    return (
                        data.books.map(book =>{
                            return (
                                <div key={book.id}>
                                    <ul id="book-list">
                                        <li>
                                            {book.name}
                                        </li>
                                    </ul>
                                </div>
                            )}
                        )
                    )
                    }}
                </Query>
            </div>
        );
    }
}

export default BookList;