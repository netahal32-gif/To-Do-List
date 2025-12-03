import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import Grid from "@mui/material/Grid";
import { useAtom } from 'jotai';
import { tasksAtom } from "../atoms/task-atoms";
import TaskCard from './task-card';

export const TaskGrid: React.FC = () => {
    const [tasks, _] = useAtom(tasksAtom);

    return (
        <Container maxWidth="md"
            sx={{
                padding: 4,
                borderRadius: 5,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                boxShadow: 3,
                mt: 5,
                p: { xs: 2, sm: 4 }
            }}>
            {!tasks.length ? (
                <Paper elevation={0} sx={{ p: 4, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <Typography variant="h6" component="p" align="center" color="text.secondary">
                        No Task Added Yet.
                    </Typography>
                </Paper>
            ) : (
                <Grid
                    container
                    spacing={4}
                    sx={{ p: { xs: 0, sm: 2 } }}
                >
                    {tasks.map((task) => (
                        <Grid
                            {...{
                                item: true,
                                key: task.id,
                                xs: 12,
                                sm: 6,
                                md: 4,
                                lg: 3
                            }}
                        >
                            <TaskCard task={task} doneTask={function (id: string): void {
                                throw new Error('Function not implemented.');
                            }} deleteTask={function (id: string): void {
                                throw new Error('Function not implemented.');
                            }} editTask={function (id: string): void {
                                throw new Error('Function not implemented.');
                            }}>
                            </TaskCard>
                        </Grid>
                    ))}
                </Grid>
            )
            }

        </Container >
    );
};