import dayjs, { type Dayjs } from 'dayjs'
import { z } from 'zod'

export const subjects = ['Errand', 'Work', 'Home', 'Other']

const DayjsConstructor = dayjs().constructor as typeof Dayjs

export const taskSchema = z.object({
  date: z.date(),
  id: z.uuid(),
  isDone: z.boolean().default(false).optional(),
  isEditMode: z.boolean().default(false).optional(),
  name: z.string().min(1, 'Task name is required').max(50),
  priority: z.number().min(1, 'Priority must be 1-10').max(10),
  subject: z.enum(subjects),
})

export const setTaskSchema = z.object({
  setDate: z.function({
    input: [z.instanceof(DayjsConstructor).nullable()],
    output: z.void(),
  }),
  setName: z.function({
    input: [z.string()],
    output: z.void(),
  }),
  setPriority: z.function({
    input: [z.number()],
    output: z.void(),
  }),
  setSubject: z.function({
    input: [z.enum(subjects)],
    output: z.void(),
  }),
})

export const useStateTaskSchema = taskSchema
  .omit({ id: true })
  .extend(setTaskSchema.shape)
  .extend({ date: z.instanceof(DayjsConstructor).nullable() })

export const numbers = Array.from({ length: 10 }, (_, i) => i + 1)

export type Task = z.infer<typeof taskSchema>

export type UseStateTask = z.infer<typeof useStateTaskSchema>
