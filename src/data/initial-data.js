const initialData = {
    tasks: {
        'task-1': { id: 'task-1', name: 'Take out the trash' },
        'task-2': { id: 'task-2', name: 'charge phone' },
        'task-3': { id: 'task-3', name: 'wash car' },
        'task-4': { id: 'task-4', name: 'get gas' },
    },
    lists:{
        'list-1': {
            id: 'list-1',
            title: 'To Do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
        'list-2': {
            id: 'list-2',
            title: 'In Progress',
            taskIds: [],
        },

    },
    //facilitate reordering of columns
    listOrder: ['list-1', 'list-2', ],
};
export default initialData;