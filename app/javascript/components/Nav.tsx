import React from 'react';
import { ContextMenuProps } from './ContextMenu';
import TaskLists from './tasklists/TaskLists';

interface Props { 
  activeList: {
    activeListId: number;
    setActiveList: (id: number) => void;
  }
  showContextMenu: (options: ContextMenuProps) => void;
}

class Nav extends React.Component<Props> {
  render() {
    const { activeList, showContextMenu } = this.props;
    return (
      <div className="navbar">
        <TaskLists activeList={activeList} showContextMenu={showContextMenu}/>
      </div>
    )
  }
}

export default Nav;
