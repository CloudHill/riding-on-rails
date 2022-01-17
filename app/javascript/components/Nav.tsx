import React from 'react';
import { ContextMenuProps } from './ContextMenu';
import TaskLists from './tasklists/TaskLists';

interface Props { 
  setList: (id: number) => void;
  showContextMenu: (options: ContextMenuProps) => void;
}

class Nav extends React.Component<Props> {
  render() {
    const { setList, showContextMenu } = this.props;
    return (
      <div className="navbar">
        <TaskLists setList={setList} showContextMenu={showContextMenu}/>
      </div>
    )
  }
}

export default Nav;
