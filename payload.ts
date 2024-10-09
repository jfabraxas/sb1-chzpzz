import dotenv from 'dotenv';
import path from 'path';
import payload, { Payload } from 'payload';
import { PgliteClient } from '@electric-sql/pglite';

dotenv.config({
  path: path.resolve(__dirname, '.env'),
});

let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<import('payload/config').InitOptions>;
}

export const initPayload = async ({ initOptions }: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET environment variable is missing');
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    const { DATABASE_URI } = process.env;

    if (!DATABASE_URI) {
      throw new Error('DATABASE_URI is not defined');
    }

    if (process.env.NODE_ENV !== 'production') {
      const pglite = new PgliteClient();
      await pglite.init();
      await pglite.createDb('multitenant-nextjs-payload');
    }

    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    throw e;
  }

  return cached.client;
};