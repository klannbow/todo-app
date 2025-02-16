import TextField from "@mui/material/TextField"
import Icon from "@mui/material/Icon"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import { lightBlue, pink, grey } from "@mui/material/colors"
type Props = {
  todos: Todo[]
  filter: Filter
  onTodo: <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V,
  ) => void
}

const Container = styled('div')({
  marign: '0 auto',
  maxWidth: '640px',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
})

const TodoCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  padding: theme.spacing(1),
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}))

const Form = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  fontSize: '16px',
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const Button = styled('button')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
}));

const Trash = styled('button')(() => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
}));


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
    <Container>
      {filteredTodos.map((todo) => {
        return (
          <TodoCard key={todo.id}>
            <Form>
              <TextField

                fullWidth
                aria-label="todo-${todo.value"
                variant="standard"
                label="タスクを入力..."
                value={todo.value}
                onChange={(e) => props.onTodo(todo.id, 'value', e.target.value)}
                disabled={todo.checked || todo.removed}
              />
            </Form>
            <ButtonContainer>
              <Button
                aria-label={`todo-check-${todo.value}`}
                onClick={() => props.onTodo(todo.id, 'checked', !todo.checked)}
                disabled={props.filter === 'removed'}
              >
                {todo.checked ? (
                  <Icon
                    aria-label={`todo-checked-${todo.value}`}
                    style={{ color: props.filter !== 'removed' ? pink.A200 : grey[500] }}
                  >
                    check_circle_outline
                  </Icon>)
                  : (
                    <Icon
                      aria-label={`todo-unchecked-${todo.value}`}
                      style={{ color: props.filter !== 'removed' ? lightBlue[500] : grey[500] }}
                    >
                      radio_button_unchecked
                    </Icon>
                  )}
                <Typography
                  style={{
                    userSelect: 'none',
                    color: todo.checked && props.filter !== 'removed' ? pink.A200 : grey[500],
                  }}>
                  Done
                </Typography>
              </Button>
              <Trash
                aria-label="todo-remove"
                onClick={() => props.onTodo(todo.id, 'removed', !todo.removed)}
              >
                {todo.removed ? (
                  <Icon
                    aria-label={`todo-undo-${todo.value}`}
                    style={{ color: lightBlue[500] }}
                  >
                    undo
                  </Icon>
                ) : (
                  <Icon
                    aria-label={`todo-delete-${todo.value}`}
                    style={{ color: grey[500] }}
                  >
                    delete
                  </Icon>
                )}
              </Trash>
            </ButtonContainer>
          </TodoCard>
        )
      })}
    </Container>
  )
}