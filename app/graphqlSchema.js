module.exports = `
type Query {
    posts(category: String): [Post]
    post(id: Int!): Post
    categories: [Category]
}
type Post {
    id: ID!
    title: String!
    slug: String!
    content: String!
    excerpt: String!
    category: Category
}
type Category {
    id: ID!
    label: String!
    route: String!
}
input PostInput {
    title: String!
    slug: String!
    content: String!
    excerpt: String!
    category_id: Int!
}
type Mutation {
    addPost(input: PostInput): Post
}
`;

// https://graphql.org/learn/schema/