// ReactからuseStateフックをインポート
import { useState } from "react";

// Todo型の定義
type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
}

// 検索のフィルター
type Filter = 'all' | 'checked' | 'unchecked' | 'removed'

export const App = () => {
  // 初期値：空文字
  const [text, setText] = useState('')

  const [todos, setTodos] = useState<Todo[]>([])

  const [filter, setFilter] = useState<Filter>('all')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) return

    // 新しいTodoを作成
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    }
    /**
     * 更新前のtodosステートを元に、新しいTodoを追加した配列を作成
     */
    setTodos((todos) => [newTodo, ...todos])
    // テキストボックスを空にする
    setText('')
  }




  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed))
  }


  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V,
  ) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            [key]: value,
          }
        }
        return todo
      })
      return newTodos
    })
  }

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === 'all') {
      // 削除されていないもの
      return !todo.removed
    }
    if (filter === 'checked') {
      // 完了済み かつ 削除されていないもの
      return todo.checked && !todo.removed
    }
    if (filter === 'unchecked') {
      // 未完了 かつ 削除されていないもの
      return !todo.checked && !todo.removed
    }
    if (filter === 'removed') {
      // 削除済みのもの
      return todo.removed
    }
    return true
  })

  return (
    <div>
      <select defaultValue='all' onChange={(e) => setFilter(e.target.value as Filter)}>
        <option value="all">全てのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">未完了のタスク</option>
        <option value="removed">ゴミ箱</option>
      </select>
      {/* フィルターがremovedの時、「ゴミ箱を空にする」ボタンを表示 */}
      {filter === 'removed' ? (
        <button
          disabled={todos.filter((todo) => todo.removed).length === 0}
          onClick={() => handleEmpty()}
        >
          ゴミ箱を空にする
        </button>
      ) :
        (
          // フィルターがchecked以外の時、フォームを表示
          filter !== 'checked' && (
            <form onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}>
              <input
                type="text"
                value={text}
                onChange={(e) => handleChange(e)} />
              <input
                type="submit"
                value="追加"
                onSubmit={(e) => e.preventDefault()}
              />
            </form>))}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              disabled={todo.removed}
              checked={todo.checked}
              onChange={() => handleTodo(todo.id, 'checked', !todo.checked)}
            />
            <input
              type="text"
              disabled={todo.checked || todo.removed}
              value={todo.value}
              onChange={(e) => handleTodo(todo.id, 'value', e.target.value)}
            />
            <button
              onClick={() => handleTodo(todo.id, 'removed', !todo.removed)}>
              {todo.removed ? '復元' : '削除'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};