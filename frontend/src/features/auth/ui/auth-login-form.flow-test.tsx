import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react'
import { graphql, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import * as router from 'react-router'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/shared/lib/test/test-utils'
import { routes } from '@/shared/model'
import { AuthLoginForm } from '../ui/auth-login-form'

const gql = graphql.link('https://localhost:8000/graphql')
export const handlers = [
  gql.mutation('authenticate', () => {
    return HttpResponse.json({
      data: {
        authenticate: { accessToken: 'fake-token-123', userId: '1' },
      },
    })
  }),
]
// Настройка MSW-сервера для мокинга GraphQL
const server = setupServer(...handlers)

describe('Login Flow Integration', () => {
  beforeAll(() => server.listen())
  afterAll(() => server.close())
  afterEach(() => {
    vi.clearAllMocks()
    server.resetHandlers()
    cleanup()
  })

  it('успешно логинит пользователя и перенаправляет на dashboard', async () => {
    // Мокаем навигацию
    const mockNavigate = vi.fn()
    vi.spyOn(router, 'useNavigate').mockReturnValue(mockNavigate)
    // Мокаем localStorage
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
    renderWithProviders(<AuthLoginForm />)
    const emailInput = screen.getByTestId('auth-login-form-email')
    const passwordInput = screen.getByTestId('auth-login-form-password')
    const submitButton = screen.getByTestId('auth-login-form-submit')

    fireEvent.change(emailInput, {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'ValidPass123!@#' },
    })

    // Отправляем форму - находим кнопку внутри формы
    fireEvent.click(submitButton)
    // Проверяем, что токен сохранился
    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith('token', 'fake-token-123')
      expect(mockNavigate).toHaveBeenCalledWith(routes.DASHBOARD)
    })
  })

  it('показывает ошибку при неверных credentials', async () => {
    renderWithProviders(<AuthLoginForm />)
    const emailInput = screen.getByTestId('auth-login-form-email')
    const passwordInput = screen.getByTestId('auth-login-form-password')
    const submitButton = screen.getByTestId('auth-login-form-submit')
    // Переопределяем обработчик для ошибки
    server.use(
      gql.mutation('authenticate', () => {
        return HttpResponse.json({
          errors: [{ message: 'Invalid credentials', extensions: { code: 'UNAUTHENTICATED' } }],
        })
      })
    )

    // Заполняем форму
    fireEvent.change(emailInput, {
      target: { value: 'wrong@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'WrongPass123!@#' },
    })

    // Отправляем форму
    fireEvent.click(submitButton)
    // Проверяем, что отобразилась ошибка
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument()
    })
  })

  it('валидирует форму перед отправкой', async () => {
    renderWithProviders(<AuthLoginForm />)
    const emailInput = screen.getByTestId('auth-login-form-email')
    const passwordInput = screen.getByTestId('auth-login-form-password')
    const submitButton = screen.getByTestId('auth-login-form-submit')

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
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText(/Недопустимый адрес почты/i)).toBeInTheDocument()
      expect(screen.getByText(/Минимум 12 символов/i)).toBeInTheDocument()
    })

    // большие значения
    fireEvent.change(emailInput, {
      target: { value: 'a'.repeat(100) + '@email.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'a'.repeat(100) },
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText(/Максимум 64 символов/i)).toBeInTheDocument()
      expect(screen.getByText(/Максимум 32 символов/i)).toBeInTheDocument()
    })

    fireEvent.change(emailInput, {
      target: { value: 'some@email.com' },
    })
    // недопустимые символы в пароле
    fireEvent.change(passwordInput, {
      target: { value: 'ыћ' + 'a'.repeat(20) },
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(
        screen.getByText(/Должен содержать только цифры, буквы и спецсимволы/i)
      ).toBeInTheDocument()
    })
    // нет заглавной буквы
    fireEvent.change(passwordInput, {
      target: { value: '!1' + 'a'.repeat(20) },
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText(/Хотя бы одна заглавнуя буква/i)).toBeInTheDocument()
    })
    // нет строчной буквы
    fireEvent.change(passwordInput, {
      target: { value: '!1' + 'A'.repeat(20) },
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText(/Хотя бы одна строчная буква/i)).toBeInTheDocument()
    })
    // нет цифры
    fireEvent.change(passwordInput, {
      target: { value: '!a' + 'A'.repeat(20) },
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText(/Хотя бы одна цифра/i)).toBeInTheDocument()
    })
    // нет символа
    fireEvent.change(passwordInput, {
      target: { value: '1a' + 'A'.repeat(20) },
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText(/Хотя бы один спецсимвол/i)).toBeInTheDocument()
    })
  })
})
