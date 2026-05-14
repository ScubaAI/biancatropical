// ============================================================
// BLINK CLIENT — Reusable GraphQL client
// ============================================================

import { GraphQLClient } from 'graphql-request'

const getBlinkEndpoint = () => {
  const endpoint = process.env.NEXT_PUBLIC_BLINK_GRAPHQL_URL
  if (!endpoint) throw new Error('NEXT_PUBLIC_BLINK_GRAPHQL_URL is not set')
  return endpoint
}

const getBlinkToken = () => {
  const token = process.env.BLINK_API_KEY
  if (!token) throw new Error('BLINK_API_KEY is not set')
  return token
}

export function getBlinkClient() {
  const endpoint = getBlinkEndpoint()
  const token = getBlinkToken()

  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return client
}