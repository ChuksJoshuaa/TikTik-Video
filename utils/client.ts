import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});


//Note. Add Localhost:3000 and the deployed url to the cors origin under the api section in sanity