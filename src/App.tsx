// ReactからuseStateフックをインポート
import { useState } from "react";
import { FormDialog } from "./FormDialog";
import { ActionButton } from "./components/ActionButton";
import { SideBar } from "./components/SideBar";
import { TodoItem } from "./components/TodoItem";

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

  return (
    <div>
      <SideBar onFilter={setFilter} />
      <FormDialog
        text={text}
        onChange={handleChange}
        onSubmit={handleSubmit} />
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
      <ActionButton todos={todos} onEmpty={handleEmpty} />
    </div>
  );
};