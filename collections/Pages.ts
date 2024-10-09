import { CollectionConfig } from 'payload/types';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: {
          all: true,
        },
      }),
      required: true,
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
  ],
  access: {
    read: () => true,
  },
};

export default Pages;