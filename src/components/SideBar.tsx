type Props = {
    onFilter: (filter: Filter) => void
}

export const SideBar = (props: Props) => (
    <select
        defaultValue='all'
        onChange={(e) => props.onFilter(e.target.value as Filter)}>
        <option value="all">全てのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">未完了のタスク</option>
        <option value="removed">ゴミ箱</option>
    </select>
)