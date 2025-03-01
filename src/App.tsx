// ReactからuseStateフックをインポート
import { useEffect, useState } from "react";
import { FormDialog } from "./FormDialog";
import { ActionButton } from "./components/ActionButton";
import { SideBar } from "./components/SideBar";
import { TodoItem } from "./components/TodoItem";
import { ToolBar } from './components/ToolBar';
import { GlobalStyles } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo, pink } from "@mui/material/colors";
import { QR } from "./components/QR";
import { AlertDialog } from "./components/AlertDialog";
import localforage from "localforage";
import { isTodos } from './lib/isTodos'

// テーマを作成
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

export const App = () => {
  // 初期値：空文字
  const [text, setText] = useState('')

  const [todos, setTodos] = useState<Todo[]>([])

  const [filter, setFilter] = useState<Filter>('all')

  const [drawerOpen, setDrawerOpen] = useState(false)

  const [qrOpen, setQrOpen] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false)

  const [alertOpen, setAlertOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) {
      // 何も入力されなかった時
      setDialogOpen((prev) => !prev)
      return
    }

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
    // ダイアログを閉じる
    setDialogOpen((prev) => !prev)
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

  const handleToggleDrawer = () => {
    setDrawerOpen((prev) => !prev)
  }

  const handleToggleQR = () => {
    setQrOpen((prev) => !prev)
  }

  const handleToggleDialog = () => {
    setDialogOpen((prev) => !prev)
    // フォームへの入力をクリア
    setText('')
  }

  const handleToggleAlert = () => {
    setAlertOpen((prev) => !prev)
  }

  useEffect(() => {
    localforage.getItem<Todo[]>('todos').then((value) => {
      if (isTodos(value)) {
        setTodos(value)
      }
    })
  }, [])

  useEffect(() => {
    localforage.setItem('todos', todos)
  }, [todos])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0, backgroundColor: '#f0f0f0' } }} />
      <ToolBar filter={filter} onToggleDrawer={handleToggleDrawer} />
      <SideBar
        drawerOpen={drawerOpen}
        onToggleQR={handleToggleQR}
        onFilter={setFilter}
        onToggleDrawer={handleToggleDrawer} />
      <QR open={qrOpen} onClose={handleToggleQR} />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onToggleDialog={handleToggleDialog} />
      <AlertDialog alertOpen={alertOpen} onEmpty={handleEmpty} onToggleAlert={handleToggleAlert} />
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={handleToggleAlert}
        onToggleDialog={handleToggleDialog}
      />
    </ThemeProvider>
  );
};