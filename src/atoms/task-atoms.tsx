import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils';
import type { Task } from '../types/task'

const customStorage = {
    getItem: (key: string) => {
        const rawData = localStorage.getItem(key);
        if (!rawData) return null;

        const reviver = (k: string, value: string | number | Date) => {
            if (k === 'date' && typeof value === 'string') {
                return new Date(value);
            }
            return value;
        };

        return JSON.parse(rawData, reviver);
    },

    setItem: (key: string, value: Task[]) => {
        localStorage.setItem(key, JSON.stringify(value));
    },

    removeItem: (key: string) => {
        localStorage.removeItem(key);
    },
};

export const tasksAtom = atomWithStorage<Task[]>("tasks", [], customStorage)

export const searchQueryAtom = atom<string>('')

export const filteredTasksAtom = atom(get => {
    const tasks = get(tasksAtom)
    const query = get(searchQueryAtom).toLowerCase()

    if (query === '') {
        return tasks
    }

    return tasks.filter(task => task.name.toLowerCase().includes(query))
})
