import { createNextPayloadHandler } from '@payloadcms/next';
import { initPayload } from '../../../payload';

export const { GET, POST, PATCH, PUT, DELETE } = createNextPayloadHandler({
  initPayload,
});

export const runtime = 'nodejs';