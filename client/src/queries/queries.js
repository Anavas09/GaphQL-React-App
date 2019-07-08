import gql from 'graphql-tag';

const GET_AUTHORS_QUERY = gql`{
    authors{
        id
        name
    }
}`

const GET_BOOKS_QUERY = gql`{
    books{
        id
        name
        genre
        author{
            name
            age
        }
    }
}`

export { GET_AUTHORS_QUERY, GET_BOOKS_QUERY }