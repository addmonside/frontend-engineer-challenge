import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react'
import { graphql, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/shared/lib/test/test-utils'
import { AuthRegisterForm } from '../ui/auth-register-form'

const gql = graphql.link('https://localhost:8000/graphql')
export const handlers = [
  gql.mutation('register', () => {
    return HttpResponse.json({
      data: {
        register: {},
      },
    })
  }),
]
// Настройка MSW-сервера для мокинга GraphQL
const server = setupServer(...handlers)

describe('Register Flow Integration', () => {
  beforeAll(() => server.listen())
  afterAll(() => server.close())
  afterEach(() => {
    vi.clearAllMocks()
    server.resetHandlers()
    cleanup()
  })

  it('успешно регистрирует пользователя пользователя и  отображает сообщение', async () => {
    renderWithProviders(<AuthRegisterForm />)
    const emailInput = screen.getByTestId('auth-register-form-email')
    const passwordInput = screen.getByTestId('auth-register-form-password')
    const passwordСonfirmInput = screen.getByTestId('auth-register-form-password-confirmation')
    const submitButton = screen.getByTestId('auth-register-form-submit')

    // Заполняем форму
    fireEvent.change(emailInput, {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'ValidPass123!@#' },
    })
    fireEvent.change(passwordСonfirmInput, {
      target: { value: 'ValidPass123!@#' },
    })
    fireEvent.click(submitButton)

    // Проверяем, что сообщение отобразилось
    await waitFor(() => {
      expect(screen.getByText(/Вы успещно зарегистрировались в системе/i)).toBeInTheDocument()
    })
  })

  it('показывает ошибку если почта уже используется', async () => {
    renderWithProviders(<AuthRegisterForm />)
    const emailInput = screen.getByTestId('auth-register-form-email')
    const passwordInput = screen.getByTestId('auth-register-form-password')
    const passwordСonfirmInput = screen.getByTestId('auth-register-form-password-confirmation')
    const submitButton = screen.getByTestId('auth-register-form-submit')
    // Переопределяем обработчик для ошибки
    server.use(
      gql.mutation('register', () => {
        return HttpResponse.json({
          errors: [{ message: 'Email is used', extensions: { code: 'UNAUTHENTICATED' } }],
        })
      })
    )

    // Заполняем форму
    fireEvent.change(emailInput, {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'ValidPass123!@#' },
    })
    fireEvent.change(passwordСonfirmInput, {
      target: { value: 'ValidPass123!@#' },
    })
    fireEvent.click(submitButton)

    // Проверяем, что отобразилась ошибка
    await waitFor(() => {
      expect(screen.getByText(/Email is used/i)).toBeInTheDocument()
    })
  })

  it('валидирует форму перед отправкой', async () => {
    renderWithProviders(<AuthRegisterForm />)
    const emailInput = screen.getByTestId('auth-register-form-email')
    const passwordInput = screen.getByTestId('auth-register-form-password')
    const passwordСonfirmInput = screen.getByTestId('auth-register-form-password-confirmation')
    const submitButton = screen.getByTestId('auth-register-form-submit')

    // Проверяем сообщения об ошибках
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText(/Недопустимый адрес почты/i)).toBeInTheDocument()
      expect(screen.getByText(/Пароль не может быть пустым/i)).toBeInTheDocument()
    })

    // Вводим невалидный email и короткий пароль короткий
    fireEvent.change(emailInput, {
      target: { value: 'invalid-email' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'short' },
    })
    fireEvent.change(passwordСonfirmInput, {
      target: { value: 'bad' },
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      screen.debug()
      expect(screen.getByText(/Недопустимый адрес почты/i)).toBeInTheDocument()
      expect(screen.getByText(/Минимум 12 символов/i)).toBeInTheDocument()
      expect(screen.getByText(/Пароли не совпадают/i)).toBeInTheDocument()
    })
  })
})
