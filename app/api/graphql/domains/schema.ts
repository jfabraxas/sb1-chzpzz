import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Domain @key(fields: "id") {
    id: ID!
    name: String!
    provider: String!
    status: String!
  }

  extend type Query {
    domains(provider: String): [Domain!]!
    domain(id: ID!): Domain
  }

  extend type Mutation {
    addDomain(name: String!, provider: String!): Domain!
    updateDomain(id: ID!, name: String, provider: String, status: String): Domain!
    deleteDomain(id: ID!): Boolean!
    swapDomainProvider(id: ID!, newProvider: String!): Domain!
  }
`;

export const resolvers = {
  Query: {
    domains: async (_, { provider }, { dataSources }) => {
      if (provider) {
        return dataSources.domainAPI.getDomainsByProvider(provider);
      }
      return dataSources.domainAPI.getAllDomains();
    },
    domain: async (_, { id }, { dataSources }) => {
      return dataSources.domainAPI.getDomainById(id);
    },
  },
  Mutation: {
    addDomain: async (_, { name, provider }, { dataSources }) => {
      return dataSources.domainAPI.addDomain(name, provider);
    },
    updateDomain: async (_, { id, ...updates }, { dataSources }) => {
      return dataSources.domainAPI.updateDomain(id, updates);
    },
    deleteDomain: async (_, { id }, { dataSources }) => {
      return dataSources.domainAPI.deleteDomain(id);
    },
    swapDomainProvider: async (_, { id, newProvider }, { dataSources }) => {
      return dataSources.domainAPI.swapDomainProvider(id, newProvider);
    },
  },
  Domain: {
    __resolveReference: async (domain, { dataSources }) => {
      return dataSources.domainAPI.getDomainById(domain.id);
    },
  },
};