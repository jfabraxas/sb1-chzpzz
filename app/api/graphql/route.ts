import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { NextRequest } from 'next/server';

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'domains', url: 'http://localhost:3000/api/graphql/domains' },
      { name: 'projects', url: 'http://localhost:3000/api/graphql/projects' },
      { name: 'users', url: 'http://localhost:3000/api/graphql/users' },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}

export const runtime = 'nodejs';