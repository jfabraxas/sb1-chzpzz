import React from 'react';
import { notFound } from 'next/navigation';
import payload from 'payload';
import { RichTextRenderer } from '@payloadcms/richtext-lexical/dist/renderer';

export default async function Page({ params }: { params: { tenant: string; slug: string } }) {
  const tenant = await payload.find({
    collection: 'tenants',
    where: {
      slug: {
        equals: params.tenant,
      },
    },
  });

  if (!tenant.docs.length) {
    return notFound();
  }

  const page = await payload.find({
    collection: 'pages',
    where: {
      AND: [
        {
          tenant: {
            equals: tenant.docs[0].id,
          },
        },
        {
          slug: {
            equals: params.slug,
          },
        },
      ],
    },
  });

  if (!page.docs.length) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{page.docs[0].title}</h1>
      <RichTextRenderer content={page.docs[0].content} />
    </div>
  );
}