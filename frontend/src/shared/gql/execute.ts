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
    throw new ApiError({ status: response.status, data: { detail: 'Network response was not ok' } })
  }

  const json = await response.json()

  if (json.errors) {
    throw new ApiError({ status: response.status, data: json.errors[0] })
  }
  return json.data as TResult
}

function getToken() {
  return localStorage.getItem('token')
}

export class ApiError extends Error {
  public status: number
  public data: { message?: string; detail?: string }
  constructor({ status, data }: { status: number; data: { message?: string; detail?: string } }) {
    super('ApiError: ' + status)
    this.status = status
    this.data = data
    this.message = data.message || data.detail || `ApiError: ${JSON.stringify(this.data)}`
  }
}
