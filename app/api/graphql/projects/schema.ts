import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Project @key(fields: "id") {
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
`;

export const resolvers = {
  Query: {
    projects: async (_, __, { dataSources }) => {
      return dataSources.projectAPI.getAllProjects();
    },
    project: async (_, { id }, { dataSources }) => {
      return dataSources.projectAPI.getProjectById(id);
    },
  },
  Mutation: {
    createProject: async (_, { name, tenant, status }, { dataSources }) => {
      return dataSources.projectAPI.createProject({ name, tenant, status });
    },
    updateProject: async (_, { id, ...updates }, { dataSources }) => {
      return dataSources.projectAPI.updateProject(id, updates);
    },
    deleteProject: async (_, { id }, { dataSources }) => {
      return dataSources.projectAPI.deleteProject(id);
    },
  },
  Project: {
    __resolveReference: async (project, { dataSources }) => {
      return dataSources.projectAPI.getProjectById(project.id);
    },
  },
};