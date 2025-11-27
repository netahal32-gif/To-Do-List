import { z } from 'zod'

export const TaskSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Task name is required"),
    subject: z.array(z.string()).min(1, "At least one subject is required"),
    priority: z.number().min(1, "Priority must be 1-10").max(10),
    date: z.date(), 
    isDone: z.boolean().default(false),
});

export type Task = z.infer<typeof TaskSchema>;