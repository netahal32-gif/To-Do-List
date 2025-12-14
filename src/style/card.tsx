import type { Task } from '../types/task'

export const cardStyle = (task: Task) => {
  const getPriorityColor = (priority: Task['priority']) => {
    if (priority >= 1 && priority <= 3) return '#d32f2f'
    if (priority >= 4 && priority <= 7) return '#fbc02d'
    if (priority >= 8 && priority <= 10) return '#4caf50'
  }

  return {
    '&:hover': {
      boxShadow: '0 15px 20px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-2px)',
    },
    backgroundColor: task.isDone ? '#1ee43f4f' : 'rgba(255, 255, 255, 0.5)',
    borderLeft: `5px solid ${getPriorityColor(task.priority)}`,
    borderRadius: 3,
    boxShadow: task.isDone ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0 10px 15px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'all 0.3s ease-in-out',
  }
}
