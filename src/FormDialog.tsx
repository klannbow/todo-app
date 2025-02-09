type Props = {
  text: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
}
export const FormDialog = (props: Props) => (
  <form onSubmit={(e) => {
    e.preventDefault()
    props.onSubmit()
  }}>
    <input
      type="text"
      value={props.text}
      onChange={(e) => props.onChange(e)} />
    <input
      type="submit"
      value="追加"
      onSubmit={(e) => props.onSubmit()}
    />
  </form>
)