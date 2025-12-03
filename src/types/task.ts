import { z } from 'zod'

export const subjects = ['Errand', 'Work', 'Home', 'Other']

export const TaskSchema = z.object({
  date: z.date(),
  id: z.uuid(),
  isDone: z.boolean().default(false).optional(),
  name: z.string().min(1, 'Task name is required').max(50),
  priority: z.number().min(1, 'Priority must be 1-10').max(10),
  subject: z.enum(subjects),
})

export const numbers = Array.from({ length: 10 }, (_, i) => i + 1)

export type Task = z.infer<typeof TaskSchema>
