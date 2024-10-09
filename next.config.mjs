import { withPayload } from '@payloadcms/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withPayload(nextConfig);