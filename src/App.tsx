import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer, Zoom } from 'react-toastify'
import { TaskInputCard } from './components/input-form/input-card'
import customTheme from './components/theme'
import 'react-toastify/dist/ReactToastify.css'
import { Box, CssBaseline, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { tasksAtom } from './atoms/task-atoms'
import { TaskGrid } from './components/task-grid'
import theme from './components/theme'

function App() {
  const [tasks, _] = useAtom(tasksAtom)
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box sx={{ background: theme.palette.background.default, minHeight: '100vh', p: 2 }}>
        <Box sx={{ mb: 4, pt: 4, textAlign: 'center' }}>
          <Typography component="h1" fontWeight="bold" gutterBottom variant="h3">
            To Do List
          </Typography>
          <Typography color="text.secondary" variant="subtitle1">
            There are {tasks.filter(t => !t.isDone).length} tasks remaining.
          </Typography>
        </Box>
        <TaskInputCard />
        <TaskGrid />
      </Box>
      <ToastContainer
        autoClose={1000}
        closeButton={false}
        closeOnClick
        limit={3}
        newestOnTop={false}
        pauseOnFocusLoss={false}
        pauseOnHover
        position="bottom-right"
        rtl={false}
        theme="dark"
        transition={Zoom}
      />
    </ThemeProvider>
  )
}

export default App
