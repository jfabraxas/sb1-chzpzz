import { gql } from 'graphql-tag';
import payload from 'payload';

export const usersResolvers = {
  typeDefs: gql`
    type User {
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
  `,
  resolvers: {
    Query: {
      users: async () => {
        const users = await payload.find({
          collection: 'users',
        });
        return users.docs;
      },
      user: async (_, { id }) => {
        return await payload.findByID({
          collection: 'users',
          id,
        });
      },
    },
    Mutation: {
      createUser: async (_, { email, password, role, tenant }) => {
        const newUser = await payload.create({
          collection: 'users',
          data: { email, password, role, tenant },
        });
        return newUser;
      },
      updateUser: async (_, { id, ...updates }) => {
        const updatedUser = await payload.update({
          collection: 'users',
          id,
          data: updates,
        });
        return updatedUser;
      },
      deleteUser: async (_, { id }) => {
        await payload.delete({
          collection: 'users',
          id,
        });
        return true;
      },
    },
  },
};