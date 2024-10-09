import { gql } from 'graphql-tag';
import payload from 'payload';

export const projectsResolvers = {
  typeDefs: gql`
    type Project {
      id: ID!
      name: String!
      tenant: ID!
      status: String!
    }

    extend type Query {
      projects: [Project!]!
      project(id: ID!): Project
    }

    extend type Mutation {
      createProject(name: String!, tenant: ID!, status: String!): Project!
      updateProject(id: ID!, name: String, tenant: ID, status: String): Project!
      deleteProject(id: ID!): Boolean!
    }
  `,
  resolvers: {
    Query: {
      projects: async () => {
        const projects = await payload.find({
          collection: 'projects',
        });
        return projects.docs;
      },
      project: async (_, { id }) => {
        return await payload.findByID({
          collection: 'projects',
          id,
        });
      },
    },
    Mutation: {
      createProject: async (_, { name, tenant, status }) => {
        const newProject = await payload.create({
          collection: 'projects',
          data: { name, tenant, status },
        });
        return newProject;
      },
      updateProject: async (_, { id, ...updates }) => {
        const updatedProject = await payload.update({
          collection: 'projects',
          id,
          data: updates,
        });
        return updatedProject;
      },
      deleteProject: async (_, { id }) => {
        await payload.delete({
          collection: 'projects',
          id,
        });
        return true;
      },
    },
  },
};