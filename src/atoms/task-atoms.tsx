import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import type {  Task } from '../types/task'

export const tasksAtom = atomWithStorage<Task[]>('tasks', [])

export const searchQueryAtom = atom<string>('')

export const filteredTasksAtom = atom(get => {
  const tasks = get(tasksAtom)
  const query = get(searchQueryAtom).toLowerCase()

  if (query === '') {
    return tasks
  }

  return tasks.filter(task => task.name.toLowerCase().includes(query))
})
