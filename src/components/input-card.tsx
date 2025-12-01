import { Container, TextField, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import React from "react";
import { currentTask } from "../atoms/task-atoms";
import { useAtom } from 'jotai';
import { useState } from "react";
import AddTaskButton from "./add-button";
import { subjects } from "../types/task";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";



export const TaskInputCard = () => {
    const [task, setTask] = useAtom(currentTask);
    const [name, setName] = useState<string>('')
    const [subject, setSubject] = useState<string>('')
    const [priority, setPriority] = useState<number>()
    const [date, setDate] = useState<Dayjs | null>(dayjs());


    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (priority === undefined || !date) {
            alert("Please fill in all fields");
            return;
        }
        const newTask = { name, subject, priority, date: date!.toDate() };
        setTask(newTask);///fix this

        console.log("Task added successfully:", newTask);//pino logger
        alert("✅ Task added successfully!");//change this to preettir alert

    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="priority-label">Priority</InputLabel>

                    <Select
                        id="select-priority"
                        value={priority}
                        label="Priority"
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    >
                        {numbers.map((number) => (
                            <MenuItem key={number} value={number}>
                                {number}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Due Date"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                margin: "normal",
                                required: true,
                            },
                        }}
                    />
                </LocalizationProvider>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="subject-label">Subject</InputLabel>
                    <Select
                        labelId="subject-label"
                        id="select-subject"
                        value={subject}
                        label="Subject"
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    >
                        {subjects.map((subject) => (
                            <MenuItem key={subject} value={subject}>
                                {subject}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ mt: 2 }}>
                    <AddTaskButton />
                </Box>
            </Box >
        </Container>
    )
}

