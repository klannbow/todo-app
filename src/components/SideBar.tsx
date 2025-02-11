import { styled } from '@mui/material/styles'
import { indigo, lightBlue, pink } from '@mui/material/colors'
// カスタマイズするMUIコンポーネントをインポート
import Avatar from '@mui/material/Avatar'
import Drawer from '@mui/material/Drawer'

import pjson from '../../package.json'
import Icon from '@mui/material/Icon'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

// ドロワー内リストをスタイリング
const DrawerList = styled('div')({
  width: 250,
})

// ドロワーヘッダーのサイズ・色などをカスタマイズ
const DrawerHeader = styled('div')({
  height: 150,
  backgroundColor: indigo[500],
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1em',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
})

// ドロワー内のアバターをカスタマイズ
const DrawerAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
  marginBottom: '1em',
}))

type Props = {
  drawerOpen: boolean
  onToggleQR: () => void
  onToggleDrawer: () => void
  onFilter: (filter: Filter) => void
}

export const SideBar = (props: Props) => (
  <Drawer
    variant="temporary"
    open={props.drawerOpen}
    onClose={props.onToggleDrawer}
  >
    <DrawerList role="presentation" onClick={props.onToggleDrawer}>
      <DrawerHeader>
        <DrawerAvatar>
          <Icon>create</Icon>
        </DrawerAvatar>
        <p>TODO v{pjson.version}</p>
      </DrawerHeader>
      <List>
        <ListItem disablePadding>
          <ListItemButton aria-label='list-all' onClick={() => props.onFilter('all')}>
            <ListItemIcon>
              <Icon>subject</Icon>
            </ListItemIcon>
            <ListItemText primary="全てのタスク" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton aria-label='list-unchecked' onClick={() => props.onFilter('unchecked')}>
            <ListItemIcon>
              <Icon sx={{ color: lightBlue[500] }}>radio_button_unchecked</Icon>
            </ListItemIcon>
            <ListItemText primary="現在のタスク" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton aria-label='list-checked' onClick={() => props.onFilter('checked')}>
            <ListItemIcon>
              <Icon sx={{ color: pink.A200 }}>check_circle_outline</Icon>
            </ListItemIcon>
            <ListItemText primary="完了したタスク" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton aria-label='list-removed' onClick={() => props.onFilter('removed')}>
            <ListItemIcon>
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="ゴミ箱" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton aria-label='list-share' onClick={props.onToggleQR}>
            <ListItemIcon>
              <Icon>share</Icon>
            </ListItemIcon>
            <ListItemText primary="このアプリを共有" />
          </ListItemButton>
        </ListItem>
      </List>
    </DrawerList>
  </Drawer>
)