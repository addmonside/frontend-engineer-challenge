import z from 'zod'

export const accountQueryResponseSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  isActive: z.boolean(),
})
