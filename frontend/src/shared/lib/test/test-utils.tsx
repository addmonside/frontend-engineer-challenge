import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, type RenderOptions } from '@testing-library/react'
import { type ReactElement } from 'react'
import { MemoryRouter } from 'react-router'

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0, // + всегда считать данные устаревшими
      },
      mutations: {
        retry: false,
      },
    },
  })
}

export function renderWithProviders(
  ui: ReactElement,
  {
    initialEntries = ['/'],
    queryClient, // + можно передать свой клиент для проверки кеша
    ...renderOptions
  }: {
    initialEntries?: string[]
    queryClient?: QueryClient // + опциональный проброс снаружи
  } & Omit<RenderOptions, 'wrapper'> = {}
) {
  const testQueryClient = queryClient ?? createTestQueryClient()

  function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
      </MemoryRouter>
    )
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    testQueryClient,
  }
}

export * from '@testing-library/react'
