import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_BOOKS_QUERY } from '../queries';
import BookDetails from './BookDetails';

class BookList extends Component {
    constructor(props){
        super(props)

        this.state = {
            selected: null
        }
    }
    
    handleOnClick = (id) => {
        this.setState({
            selected: id
        })
    }

    bookList = () => {
        return (
            <Query query={GET_BOOKS_QUERY}>
                {({ loading, error, data }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error :( </div>;
            
                return (
                    data.books.map(book =>{
                        return (
                            <li 
                                key={book.id}
                                onClick={()=>this.handleOnClick(book.id)}
                            >
                                {book.name}
                            </li>
                        )}
                    )
                )
                }}
            </Query>
        )
    }

    render() {
        return (
            <div>
                <ul id="book-list">
                    {this.bookList()}
                </ul>
                <div id="book-details">
                    <BookDetails bookId={this.state.selected}/>
                </div>
            </div>
        );
    }
}

export default BookList;