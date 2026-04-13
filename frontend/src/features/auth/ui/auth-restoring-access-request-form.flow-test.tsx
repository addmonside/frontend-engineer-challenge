import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react'
import { graphql, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/shared/lib/test/test-utils'
import { config } from '@/shared/model'
import { AuthRestoringAccessRequestForm } from './auth-restoring-access-request-form'

const gql = graphql.link(config.API_URL)

export const handlers = [
  gql.mutation('requestPasswordReset', () => {
    return HttpResponse.json({
      data: {
        requestPasswordReset: {
          ok: true,
          deliveryMode: 'EMAIL',
          resetUrlPreview: `${config.API_URL}/reset-password?token=test-token`,
        },
      },
    })
  }),
]
// Настройка MSW-сервера для мокинга GraphQL
const server = setupServer(...handlers)

describe('Restoring Access Request Flow Integration', () => {
  beforeAll(() => server.listen())
  afterAll(() => server.close())
  afterEach(() => {
    vi.clearAllMocks()
    server.resetHandlers()
    cleanup()
  })

  it('успешно отправляет запрос на восстановление пароля и вызывает onSuccess', async () => {
    const mockOnSuccess = vi.fn()
    renderWithProviders(<AuthRestoringAccessRequestForm onSuccess={mockOnSuccess} />)
    const emailInput = screen.getByTestId('auth-restoring-access-request-form-email')
    const submitButton = screen.getByTestId('auth-restoring-access-request-form-submit')

    // Заполняем форму
    fireEvent.change(emailInput, {
      target: { value: 'user@example.com' },
    })
    fireEvent.click(submitButton)

    // Проверяем, что onSuccess был вызван
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })

  it('показывает ошибку если почта не найдена', async () => {
    const mockOnSuccess = vi.fn()
    renderWithProviders(<AuthRestoringAccessRequestForm onSuccess={mockOnSuccess} />)
    const emailInput = screen.getByTestId('auth-restoring-access-request-form-email')
    const submitButton = screen.getByTestId('auth-restoring-access-request-form-submit')
    // Переопределяем обработчик для ошибки
    server.use(
      gql.mutation('requestPasswordReset', () => {
        return HttpResponse.json({
          errors: [{ message: 'User not found', extensions: { code: 'NOT_FOUND' } }],
        })
      })
    )

    // Заполняем форму
    fireEvent.change(emailInput, {
      target: { value: 'nonexistent@example.com' },
    })
    fireEvent.click(submitButton)

    // Проверяем, что отобразилась ошибка
    await waitFor(() => {
      expect(screen.getByText(/User not found/i)).toBeInTheDocument()
    })
    // Проверяем, что onSuccess не был вызван
    expect(mockOnSuccess).not.toHaveBeenCalled()
  })

  it('валидирует форму перед отправкой', async () => {
    const mockOnSuccess = vi.fn()
    renderWithProviders(<AuthRestoringAccessRequestForm onSuccess={mockOnSuccess} />)
    const emailInput = screen.getByTestId('auth-restoring-access-request-form-email')
    const submitButton = screen.getByTestId('auth-restoring-access-request-form-submit')

    // Пытаемся отправить пустую форму
    fireEvent.click(submitButton)

    // Проверяем сообщение об ошибке
    await waitFor(() => {
      expect(screen.getByText(/Недопустимый адрес почты/i)).toBeInTheDocument()
    })

    // Вводим невалидный email
    fireEvent.change(emailInput, {
      target: { value: 'invalid-email' },
    })
    fireEvent.click(submitButton)

    // Проверяем сообщение об ошибке для невалидного email
    await waitFor(() => {
      expect(screen.getByText(/Недопустимый адрес почты/i)).toBeInTheDocument()
    })

    // Проверяем, что onSuccess не был вызван
    expect(mockOnSuccess).not.toHaveBeenCalled()
  })
})
