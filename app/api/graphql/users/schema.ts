import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    email: String!
    role: String!
    tenant: ID!
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(email: String!, password: String!, role: String!, tenant: ID!): User!
    updateUser(id: ID!, email: String, role: String, tenant: ID): User!
    deleteUser(id: ID!): Boolean!
  }
`;

export const resolvers = {
  Query: {
    users: async (_, __, { dataSources }) => {
      return dataSources.userAPI.getAllUsers();
    },
    user: async (_, { id }, { dataSources }) => {
      return dataSources.userAPI.getUserById(id);
    },
  },
  Mutation: {
    createUser: async (_, { email, password, role, tenant }, { dataSources }) => {
      return dataSources.userAPI.createUser({ email, password, role, tenant });
    },
    updateUser: async (_, { id, ...updates }, { dataSources }) => {
      return dataSources.userAPI.updateUser(id, updates);
    },
    deleteUser: async (_, { id }, { dataSources }) => {
      return dataSources.userAPI.deleteUser(id);
    },
  },
  User: {
    __resolveReference: async (user, { dataSources }) => {
      return dataSources.userAPI.getUserById(user.id);
    },
  },
};