
import { ThemeProvider } from '@mui/material/styles'
import { TaskInputCard } from './components/input-card'
import customTheme from './components/theme'
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TaskGrid } from './components/task-grid';
import { Box, CssBaseline, Typography } from '@mui/material';
import theme from './components/theme';
import { useAtom } from 'jotai';
import { tasksAtom } from './atoms/task-atoms';


function App() {
  const [tasks, _] = useAtom(tasksAtom)
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: theme.palette.background.default, p: 2 }}>

        <Box sx={{ mb: 4, textAlign: 'center', pt: 4 }}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            To Do List
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            You have {tasks.filter(t => !t.isDone).length} tasks remaining.
          </Typography>
        </Box>
        <TaskInputCard />
        <TaskGrid />
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="dark"
        limit={3}
        closeButton={false}
        transition={Zoom}
        pauseOnFocusLoss={false}
      />
    </ThemeProvider>
  )
}

export default App

