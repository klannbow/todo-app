import { Button, Dialog, DialogActions, TextField } from "@mui/material"

type Props = {
  text: string
  dialogOpen: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: () => void
  onToggleDialog: () => void
}
export const FormDialog = (props: Props) => (
  <Dialog fullWidth open={props.dialogOpen} onClose={props.onToggleDialog}>
    <form onSubmit={(e) => {
      e.preventDefault()
      props.onSubmit()
    }}>
      <div style={{ margin: '1em' }}>
        <TextField
          autoFocus
          fullWidth
          aria-label="todo-input"
          variant="standard"
          label="タスクを入力..."
          value={props.text}
          style={{ fontSize: '16px', fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}
          onChange={props.onChange} />
      </div>
      <DialogActions>
        <Button
          aria-label="form-add"
          color="secondary"
          onClick={props.onSubmit}
        >
          追加
        </Button>
      </DialogActions>
    </form>
  </Dialog>
)