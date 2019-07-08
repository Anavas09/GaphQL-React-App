import gql from 'graphql-tag';

//AUTHORS-----------------------------
const GET_AUTHORS_QUERY = gql`{
    authors{
        id
        name
    }
}`

//BOOKS--------------------------------

const GET_BOOK_QUERY = gql`
    query Book($id: ID!){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    id
                    name
                }
            }
        }
    }
`

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

export { GET_AUTHORS_QUERY, GET_BOOKS_QUERY, GET_BOOK_QUERY }