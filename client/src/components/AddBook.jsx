import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { GET_AUTHORS_QUERY, ADD_BOOK_MUTATION, GET_BOOKS_QUERY } from '../queries';

class AddBook extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChange(e){
        console.log(`${[e.target.name]}: ${e.target.value}`)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnComplete(){
        console.log('Complete')
        this.setState({
            name: '',
            genre: '',
            authorId: ''
        })
    }

    handleOnSubmit(e){
        e.preventDefault()
        const { name, genre, authorId } = this.state
        console.log(`${name}, ${genre}, ${authorId}`)
        this.setState({
            name: '',
            genre: '',
            authorId: ''
        })
    }

    displayAuthors(){
        return (
            <Query query={GET_AUTHORS_QUERY}>
                {({ loading, error, data }) => {
                if (loading) return (
                    <option>
                        Loading Authors...
                    </option>);
                if (error) return <div>Error :( </div>;
                return (
                    data.authors.map(author =>{
                        return (
                            <option
                                key={author.id}
                                value={author.id}
                            >
                                {author.name}
                            </option>
                        )}
                    )
                )
                }}
        </Query>
        )
    }

    render() {
        const { name, genre, authorId} = this.state
        return (
            <div>
                <form id="add-book" onSubmit={this.handleOnSubmit}>
                    <div className="field">
                        <label>Book name:</label>
                        <input
                            name="name"
                            value={this.state.name}
                            type="text"
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="field">
                        <label>Genre:</label>
                        <input
                            name="genre"
                            value={this.state.genre}
                            type="text"
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="field">
                        <label>Author:</label>
                        <select
                            name="authorId"
                            onChange={this.handleOnChange}
                        >
                            <option >Select Author</option>
                            {this.displayAuthors()}
                        </select>
                    </div>
                    <Mutation
                        mutation={ADD_BOOK_MUTATION}
                        variables={{name, genre, authorId}}
                        refetchQueries={[{query: GET_BOOKS_QUERY}]}
                        onCompleted={()=>this.handleOnComplete()}
                    >
                        {postMutation => <button onClick={postMutation}>+</button>}
                    </Mutation>
                </form>
            </div>
        );
    }
}

export default AddBook