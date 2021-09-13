import { GraphQLClient } from 'graphql-request'
export function request({ query, variables, preview }) {
  let endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`

  if (process.env.NUXT_ENV_DATOCMS_ENVIRONMENT) {
    endpoint += `/environments/${process.env.NUXT_ENV_DATOCMS_ENVIRONMENT}`
  }
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NUXT_ENV_DATOCMS_API_TOKEN}`,
    },
  })
  return client.request(query, variables)
}
