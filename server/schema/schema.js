const graphql = require('graphql');

const Author = require('../model/authors');
const Book = require('../model/books');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args){
                const Books = await Book.find({authorId: parent.id})
                return Books
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            async resolve(parent, args){
                const Authors = await Author.findById(parent.authorId)
                return Authors
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                //code to get data from db/other source
                const book = await Book.findById(args.id)
                return book
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                const author = await Author.findById(args.id)
                return author
            }
        },
        books: {
            type: new GraphQLList(BookType),
            async resolve(){
                const Books = await Book.find({})
                return Books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            async resolve(){
                const Authors = await Author.find({})
                return Authors
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                const author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                const book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})