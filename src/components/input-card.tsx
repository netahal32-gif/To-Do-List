import { Container, TextField, Box, MenuItem, Select, FormControl, InputLabel, Stack, Typography } from "@mui/material";
import React from "react";
import { tasksAtom } from "../atoms/task-atoms";
import { useAtom } from 'jotai';
import { useState } from "react";
import AddTaskButton from "./add-button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { subjects, numbers, TaskSchema, type Task } from "../types/task";
import { toast } from 'react-toastify';
import { ZodError } from "zod";
import { v4 as uuidv4 } from 'uuid';

export const TaskInputCard = () => {
    const [_, setTasks] = useAtom(tasksAtom)
    const [name, setName] = useState<string>('')
    const [subject, setSubject] = useState<string>('')
    const [priority, setPriority] = useState<number>()
    const [date, setDate] = useState<Dayjs | null>(dayjs());

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const taskDraft = {
            id: uuidv4(),
            name,
            subject,
            priority,
            date: date!.toDate(),
        };
        try {
            const newTask: Task = TaskSchema.parse(taskDraft);
            setTasks(prev => [...prev, newTask]);
            console.log("Task added successfully:", newTask);
            toast.success("Task added Successfully!");
        } catch (err) {///////make a better error logger
            if (err instanceof ZodError) {
                const errorMessages = err.issues.map((err: { path: any[]; message: any; }) => `${err.path.join('.')}: ${err.message}`).join(', ');
                toast.error(`Validation Failed: ${errorMessages}`);
                console.error("Zod Validation Error:", err);
            } else {
                toast.error("An unexpected error occurred during task submission.");
                console.error("Unexpected Error:", err);
            }
        }
    }

    return (
        <Container
            maxWidth="md"
            sx={{
                padding: 4,
                borderRadius: 5,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                boxShadow: 3,
                mt: 4,
                mb: 4
            }}
        >
            <Typography variant="h5" component="h2" gutterBottom align="center" color="text.primary">
                Add New Task
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        sx={{ flex: 1 }}
                    />

                    <FormControl
                        required
                        sx={{ minWidth: { xs: '100%', sm: 120 } }}
                    >
                        <InputLabel id="priority-label">Priority</InputLabel>
                        <Select
                            labelId="priority-label"
                            id="select-priority"
                            value={priority}
                            label="Priority"
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            {numbers.map((number) => (
                                <MenuItem key={number} value={number}>
                                    {number}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>
                    <FormControl required sx={{ minWidth: { xs: '100%', sm: 120 }, flex: 1 }}>

                        <InputLabel id="subject-label">Subject</InputLabel>
                        <Select
                            labelId="subject-label"
                            id="select-subject"
                            value={subject}
                            label="Subject"
                            onChange={(e) => setSubject(e.target.value)}
                        >
                            {subjects.map((s) => (
                                <MenuItem key={s} value={s}>
                                    {s}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Due Date"
                            value={date}
                            format="DD/MM/YYYY"
                            onChange={(newValue) => setDate(newValue)}
                            slotProps={{
                                textField: {
                                    required: true,
                                },
                            }}
                            sx={{ flex: 1, width: '100%' }}
                        />
                    </LocalizationProvider>
                </Stack>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <AddTaskButton />
                </Box>
            </Box>
        </Container >
    )
}

