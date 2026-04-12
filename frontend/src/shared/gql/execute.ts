import { config } from '../model'
import type { TypedDocumentString } from './gen/graphql'

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const token = getToken()
  const headers: HeadersInit = token
    ? {
        'Content-Type': 'application/json',
        Accept: 'application/graphql-response+json',
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
        Accept: 'application/graphql-response+json',
      }
  const response = await fetch(config.API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const json = await response.json()
  return json.data as TResult
}

function getToken() {
  return localStorage.getItem('token')
}
