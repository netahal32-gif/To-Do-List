import dayjs, { type Dayjs } from 'dayjs'
import { z } from 'zod'

export const subjects = ['Errand', 'Work', 'Home', 'Other']
export const numbers = Array.from({ length: 10 }, (_, i) => i + 1)

const DayjsConstructor = dayjs().constructor as typeof Dayjs

const baseTaskSchema = z.object({
  name: z.string().min(1, 'Task name is required').max(50),
  priority: z.number().min(1, 'Priority must be 1-10').max(10),
  subject: z.enum(subjects),
})

const dayjsDateSchema = z.object({
  date: z.instanceof(DayjsConstructor).nullable()
})

export const taskSchema = baseTaskSchema.extend({
  date: z.date(),
  id: z.uuid(),
  isDone: z.boolean().default(false).optional(),
  isEditMode: z.boolean().default(false).optional(),
})

export const newTaskSchema = baseTaskSchema.extend(dayjsDateSchema.shape)

export type Task = z.infer<typeof taskSchema>

export type NewTask =z.infer<typeof newTaskSchema>
