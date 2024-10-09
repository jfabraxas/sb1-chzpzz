import { gql } from 'apollo-server-micro';
import * as vercel from '../lib/domainProviders/vercel';
// Import other providers similarly

export const typeDefs = gql`
  type Domain {
    id: ID!
    name: String!
    provider: String!
    status: String!
  }

  type Query {
    domains(provider: String!): [Domain!]!
    domain(id: ID!, provider: String!): Domain
  }

  type Mutation {
    addDomain(name: String!, provider: String!): Domain!
    updateDomain(id: ID!, name: String, provider: String, status: String): Domain!
    deleteDomain(id: ID!, provider: String!): Boolean!
  }
`;

export const resolvers = {
  Query: {
    domains: async (_, { provider }) => {
      switch (provider) {
        case 'Vercel':
          const vercelDomains = await vercel.listDomains(process.env.VERCEL_TOKEN);
          return vercelDomains.map(d => ({ id: d.id, name: d.name, provider: 'Vercel', status: d.status }));
        // Add cases for other providers
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }
    },
    domain: async (_, { id, provider }) => {
      // Implement fetching a single domain by ID for each provider
    },
  },
  Mutation: {
    addDomain: async (_, { name, provider }) => {
      switch (provider) {
        case 'Vercel':
          const newDomain = await vercel.addDomain(process.env.VERCEL_TOKEN, name);
          return { id: newDomain.id, name: newDomain.name, provider: 'Vercel', status: newDomain.status };
        // Add cases for other providers
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }
    },
    updateDomain: async (_, { id, ...updates }) => {
      // Implement updating a domain for each provider
    },
    deleteDomain: async (_, { id, provider }) => {
      switch (provider) {
        case 'Vercel':
          await vercel.deleteDomain(process.env.VERCEL_TOKEN, id);
          return true;
        // Add cases for other providers
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }
    },
  },
};