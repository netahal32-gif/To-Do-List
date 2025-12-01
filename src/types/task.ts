import { z } from 'zod'

export const subjects = [
    "Errand",
    "Work",
    "Home",
    "Other"
]

export const TaskSchema = z.object({
    // id: z.string(),
    name: z.string().min(1, "Task name is required"),
    subject: z.enum(subjects),
    priority: z.number().min(1, "Priority must be 1-10").max(10),
    date: z.date(),
    isDone: z.boolean().default(false).optional(),
});

const numbers = Array.from({ length: 10 }, (_, i) => i + 1);


export type Task = z.infer<typeof TaskSchema>;