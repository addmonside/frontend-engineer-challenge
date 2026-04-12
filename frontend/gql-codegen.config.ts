import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://localhost:8000/graphql',
  documents: 'src/**/*.ts',
  generates: {
    'src/shared/gql/gen/': {
      preset: 'client',
      config: {
        documentMode: 'string',
        useTypeImports: true,
      },
      plugins: [],
    },
    'src/shared/gql/gen/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
