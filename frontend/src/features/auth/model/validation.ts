import z from 'zod'

export function getEmailVallidationSchema() {
  return z.email('Недопустимый адрес почты').max(64, 'Максимум 64 символов')
}

export function getPasswordVallidationSchema() {
  return z
    .string()
    .nonempty('Пароль не может быть пустым')
    .min(12, 'Минимум 12 символов')
    .max(32, 'Максимум 32 символов')
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/, {
      message: 'Должен содержать только цифры, буквы и спецсимволы',
    })
    .regex(/[A-Z]/, {
      message: 'Хотя бы одна заглавнуя буква',
    })
    .regex(/[a-z]/, { message: 'Хотя бы одна строчная буква' })
    .regex(/\d/, { message: 'Хотя бы одна цифра' })
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, { message: 'Хотя бы один спецсимвол' })
}
