import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Multitenant Platform</h1>
      <p className="mb-4">This is a multitenant Next.js platform where users can edit content with Payload CMS.</p>
      <div className="space-x-4">
        <Link href="/admin" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Go to Admin Panel
        </Link>
        <Link href="/api/pages" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          View API
        </Link>
      </div>
    </div>
  );
}