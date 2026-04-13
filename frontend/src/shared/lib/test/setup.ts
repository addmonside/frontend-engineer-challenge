import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'

// Очистка после каждого теста
afterEach(() => {
  vi.clearAllMocks()
})
