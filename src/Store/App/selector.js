export const selectTodoList = (state) => {
    return state.todo.items;
}

export const isRegistered = (state) => state.app.isRegistered;