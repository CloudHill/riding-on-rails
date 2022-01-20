import React from 'react';
import { ContextMenuProps } from './ContextMenu';
import SearchBar from './SearchBar';
import TagInterface from './tags/TagInterface';
import TaskListInterface from './tasklists/TaskListInterface';
import TaskLists from './tasklists/TaskLists';

interface Props { 
  activeList: {
    id: number;
    name: string;
    setActiveList: (taskList: TaskListInterface) => void;
  };
  showContextMenu: (options: ContextMenuProps) => void;
  searchTasks: (search: { title: string, tags: TagInterface[] }) => void;
}

class Nav extends React.Component<Props> {
  render() {
    const { activeList, showContextMenu } = this.props;
    return (
      <div className="navbar">
        <SearchBar searchTasks={this.props.searchTasks} showContextMenu={showContextMenu}/>
        <TaskLists activeList={activeList} showContextMenu={showContextMenu}/>
      </div>
    )
  }
}

export default Nav;
