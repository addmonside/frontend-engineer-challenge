import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react'
import { graphql, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/shared/lib/test/test-utils'
import { AuthRestoringAccessConfirmForm } from './auth-restoring-access-confirm-form'

const gql = graphql.link('https://localhost:8000/graphql')

export const handlers = [
  gql.mutation('resetPassword', () => {
    return HttpResponse.json({
      data: {
        resetPassword: true,
      },
    })
  }),
]
// Настройка MSW-сервера для мокинга GraphQL
const server = setupServer(...handlers)

describe('Restoring Access Confirm Flow Integration', () => {
  beforeAll(() => server.listen())
  afterAll(() => server.close())
  afterEach(() => {
    vi.clearAllMocks()
    server.resetHandlers()
    cleanup()
  })

  it('успешно изменяет пароль и вызывает onSuccess', async () => {
    const mockOnSuccess = vi.fn()
    const mockOnError = vi.fn()
    const testToken = 'valid-reset-token-123'
    renderWithProviders(
      <AuthRestoringAccessConfirmForm
        token={testToken}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    )
    const passwordInput = screen.getByTestId('auth-restoring-access-confirm-form-password')
    const passwordConfirmInput = screen.getByTestId(
      'auth-restoring-access-confirm-form-password-confirmation'
    )
    const submitButton = screen.getByTestId('auth-restoring-access-confirm-form-submit')

    // Заполняем форму
    fireEvent.change(passwordInput, {
      target: { value: 'NewValidPass123!@#' },
    })
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'NewValidPass123!@#' },
    })
    fireEvent.click(submitButton)

    // Проверяем, что onSuccess был вызван
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled()
    })
    // Проверяем, что onError не был вызван
    expect(mockOnError).not.toHaveBeenCalled()
  })

  it('показывает ошибку если токен невалидный и вызывает onError', async () => {
    const mockOnSuccess = vi.fn()
    const mockOnError = vi.fn()
    const invalidToken = 'invalid-token'
    renderWithProviders(
      <AuthRestoringAccessConfirmForm
        token={invalidToken}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    )
    const passwordInput = screen.getByTestId('auth-restoring-access-confirm-form-password')
    const passwordConfirmInput = screen.getByTestId(
      'auth-restoring-access-confirm-form-password-confirmation'
    )
    const submitButton = screen.getByTestId('auth-restoring-access-confirm-form-submit')

    // Переопределяем обработчик для ошибки
    server.use(
      gql.mutation('resetPassword', () => {
        return HttpResponse.json({
          errors: [
            { message: 'Invalid or expired token', extensions: { code: 'UNAUTHENTICATED' } },
          ],
        })
      })
    )

    // Заполняем форму
    fireEvent.change(passwordInput, {
      target: { value: 'NewValidPass123!@#' },
    })
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'NewValidPass123!@#' },
    })
    fireEvent.click(submitButton)

    // Проверяем, что отобразилась ошибка
    await waitFor(() => {
      expect(screen.getByText(/Invalid or expired token/i)).toBeInTheDocument()
    })
    // Проверяем, что onError был вызван
    expect(mockOnError).toHaveBeenCalled()
    // Проверяем, что onSuccess не был вызван
    expect(mockOnSuccess).not.toHaveBeenCalled()
  })

  it('валидирует форму перед отправкой', async () => {
    const mockOnSuccess = vi.fn()
    const mockOnError = vi.fn()
    const testToken = 'valid-reset-token-123'
    renderWithProviders(
      <AuthRestoringAccessConfirmForm
        token={testToken}
        onSuccess={mockOnSuccess}
        onError={mockOnError}
      />
    )
    const passwordInput = screen.getByTestId('auth-restoring-access-confirm-form-password')
    const passwordConfirmInput = screen.getByTestId(
      'auth-restoring-access-confirm-form-password-confirmation'
    )
    const submitButton = screen.getByTestId('auth-restoring-access-confirm-form-submit')

    // Пытаемся отправить пустую форму
    fireEvent.click(submitButton)

    // Проверяем сообщения об ошибках
    await waitFor(() => {
      expect(screen.getByText(/Пароль не может быть пустым/i)).toBeInTheDocument()
    })

    // Вводим короткий пароль
    fireEvent.change(passwordInput, {
      target: { value: 'short' },
    })
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'short' },
    })
    fireEvent.click(submitButton)

    // Проверяем сообщение об ошибке для короткого пароля
    await waitFor(() => {
      expect(screen.getByText(/Минимум 12 символов/i)).toBeInTheDocument()
    })

    // Вводим разные пароли
    fireEvent.change(passwordInput, {
      target: { value: 'ValidPass123!@#' },
    })
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'DifferentPass123!@#' },
    })
    fireEvent.click(submitButton)

    // Проверяем сообщение об ошибке для несовпадающих паролей
    await waitFor(() => {
      expect(screen.getByText(/Пароли не совпадают/i)).toBeInTheDocument()
    })

    // Проверяем, что callbacks не были вызваны
    expect(mockOnSuccess).not.toHaveBeenCalled()
    expect(mockOnError).not.toHaveBeenCalled()
  })
})
