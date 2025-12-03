import React from 'react';
import { Card, CardContent, IconButton, Stack, Typography, Box } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, green } from '@mui/material/colors';
import type { Task } from '../types/task';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {  day: 'numeric', month: 'short', year: 'numeric' });
};

interface TaskCardProps {
    task: Task;
    doneTask: (id: string) => void;
    deleteTask: (id: string) => void;
    editTask: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, doneTask, deleteTask, editTask }) => {

    const getPriorityColor = (priority: Task['priority']) => {
        if (priority >= 1 && priority <= 3) return '#d32f2f';
        if (priority >= 4 && priority <= 7) return '#fbc02d';
        if (priority >= 8 && priority <= 10) return '#4caf50';
        return 'text.secondary';
    };

    const cardStyle = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        backgroundColor: task.isDone ? 'rgba(76, 175, 80, 0.05)' : 'rgba(255, 255, 255, 0.5)',
        boxShadow: task.isDone ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0 10px 15px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        borderLeft: `5px solid ${getPriorityColor(task.priority)}`,
        '&:hover': {
            boxShadow: '0 15px 20px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
        },
    };

    return (
        <Card
            sx={cardStyle}>
            <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="h6" component="div" fontWeight="bold" sx={{
                            textDecoration: task.isDone ? 'line-through' : 'none',
                            color: task.isDone ? 'text.disabled' : 'text.primary'
                        }}>
                            {task.name}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', opacity: 0.8, mt: '2px !important' }}>
                            ({task.subject})
                        </Typography>
                    </Stack>
                </Box>

                <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mt: 'auto', pt: 2 }}>
                    <Typography variant="body2" fontWeight="medium" color="text.primary" sx={{ mr: 1 }}>
                        Due: {formatDate(task.date)}   
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: 'text.disabled', letterSpacing: 0.5 }}>
                        Priority:{task.priority}
                    </Typography>
                </Stack>

            </CardContent>

            <Box sx={{ p: 1, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                <IconButton aria-label="mark done" size="small" onClick={() => doneTask(task.id)} sx={{ color: task.isDone ? green[500] : 'text.disabled' }}>
                    {task.isDone ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                </IconButton>
                <IconButton aria-label="edit" size="small" onClick={() => editTask(task.id)} color="info">
                    <ModeEditIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete" size="small" onClick={() => deleteTask(task.id)} sx={{ color: red[500] }}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>

        </Card>
    )
};

export default TaskCard;