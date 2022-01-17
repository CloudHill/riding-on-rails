import React, { MouseEvent } from 'react';
import { ContextMenuProps } from '../ContextMenu';
import TaskListInterface from './TaskListInterface';

interface Props { 
  taskList: TaskListInterface;
  setList: (id: number) => void;
  showContextMenu: (options: ContextMenuProps) => void;
}

class TaskList extends React.Component<Props> {  
  onClick() {
    const { id } = this.props.taskList;
    this.props.setList(id);    
  }

  onContextMenu(e:MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    this.props.showContextMenu({
      anchor: {
        x: e.pageX,
        y: e.pageY
      },
      menuItems: [
        { title: "Delete", action: () => console.log("Delete")},
        { title: "Rename", action: () => console.log("Rename")},
      ]
    });
  }


  render() {
    const { name } = this.props.taskList;
    return (
      <div
        className="tasklist"
        tabIndex={0}
        onClick={() => this.onClick()}
        onContextMenu={e => this.onContextMenu(e)}
      >
        { name }
      </div>
    )
  }
}

export default TaskList;
