/**
 * GQTY: You can safely modify this file and Query Fetcher based on your needs
 */

import { createReactClient } from '@gqty/react'
import { createClient } from 'gqty'

import { nhost } from '../utils/nhost'
import { generatedSchema, scalarsEnumsHash } from './schema.generated'

import type {
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from './schema.generated'
import type { QueryFetcher } from 'gqty'

const queryFetcher: QueryFetcher = async function (
  query,
  variables,
  fetchOptions
) {
  const authHeaders = () => {
    if (!nhost.auth.isAuthenticated) {
      return
    }
    return {
      Authorization: `Bearer ${nhost.auth.getAccessToken()}`,
    }
  }

  // Modify "/api/graphql" if needed
  const response = await fetch(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      mode: 'cors',
      ...fetchOptions,
    }
  )

  const json = await response.json()

  return json
}

export const client = createClient<
  GeneratedSchema,
  SchemaObjectTypesNames,
  SchemaObjectTypes
>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher,
})

const { query, mutation, mutate, subscription, resolved, refetch, track } =
  client

export { query, mutation, mutate, subscription, resolved, refetch, track }

const {
  graphql,
  useQuery,
  usePaginatedQuery,
  useTransactionQuery,
  useLazyQuery,
  useRefetch,
  useMutation,
  useMetaState,
  prepareReactRender,
  useHydrateCache,
  prepareQuery,
} = createReactClient<GeneratedSchema>(client, {
  defaults: {
    // Set this flag as "true" if your usage involves React Suspense
    // Keep in mind that you can overwrite it in a per-hook basis
    suspense: false,

    // Set this flag based on your needs
    staleWhileRevalidate: false,
  },
})

export {
  graphql,
  useQuery,
  usePaginatedQuery,
  useTransactionQuery,
  useLazyQuery,
  useRefetch,
  useMutation,
  useMetaState,
  prepareReactRender,
  useHydrateCache,
  prepareQuery,
}

export * from './schema.generated'
