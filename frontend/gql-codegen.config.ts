import type { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config()

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.VITE_API_URL,
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
