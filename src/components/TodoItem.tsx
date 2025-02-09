type Props = {
    todos: Todo[]
    filter: Filter
    onTodo: <K extends keyof Todo, V extends Todo[K]>(
        id: number,
        key: K,
        value: V,
    ) => void
}

export const TodoItem = (props: Props) => {
    const filteredTodos = props.todos.filter((todo: Todo) => {
        if (props.filter === 'all') {
            // 削除されていないもの
            return !todo.removed
        }
        if (props.filter === 'checked') {
            // 完了済み かつ 削除されていないもの
            return todo.checked && !todo.removed
        }
        if (props.filter === 'unchecked') {
            // 未完了 かつ 削除されていないもの
            return !todo.checked && !todo.removed
        }
        if (props.filter === 'removed') {
            // 削除済みのもの
            return todo.removed
        }
        return true
    })
    return (
        <ul>
            {filteredTodos.map((todo) => {
                return (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            disabled={todo.removed}
                            checked={todo.checked}
                            onChange={(e) => props.onTodo(todo.id, 'checked', e.target.checked)}
                        />
                        <input
                            type="text"
                            disabled={todo.checked || todo.removed}
                            value={todo.value}
                            onChange={(e) => props.onTodo(todo.id, 'value', e.target.value)}
                        />
                        <button
                            onClick={() => props.onTodo(todo.id, 'removed', !todo.removed)}
                        >
                            {todo.removed ? '復元' : '削除'}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}