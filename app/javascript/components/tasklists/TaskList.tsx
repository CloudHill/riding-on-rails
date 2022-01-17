import React, { MouseEvent, KeyboardEvent, ChangeEvent } from 'react';
import { ContextMenuProps } from '../ContextMenu';
import TaskListInterface from './TaskListInterface';

interface Props { 
  taskList: TaskListInterface;
  setList: (id: number) => void;
  showContextMenu: (options: ContextMenuProps) => void;
  crud: { rename, delete };
}

interface State {
  editing: boolean;
  name: string;
}

class TaskList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: this.props.taskList.name
    }
  }
  
  onClick() {
    const { id } = this.props.taskList;
    this.props.setList(id);    
  }

  onContextMenu(e:MouseEvent<HTMLDivElement>) {
    const { taskList } = this.props;    
    if (taskList.id === 0) return;

    e.preventDefault();

    this.props.showContextMenu({
      anchor: {
        x: e.pageX,
        y: e.pageY
      },
      menuItems: [
        { 
          title: "Delete", 
          action: () => this.props.crud.delete(taskList)
        },
        { 
          title: "Rename", 
          action: () => this.setState({ editing: true })
        },
      ]
    });
  }

  onChange(e: ChangeEvent<HTMLInputElement>) {
    const { taskList } = this.props;    
    const name = e.target.value;

    this.props.crud.rename(taskList, name);
    this.setState({ name });
  }

  onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      this.closeEdit();
    }
  }

  closeEdit() {
    this.setState({ editing: false })
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
        {
          !this.state.editing
            ? <span className="tasklist-title">{ name }</span>
            : (
              <div className="tasklist-title-input">
                <input
                  placeholder='Name'
                  value={this.state.name}
                  onChange={e => this.onChange(e)}
                  onKeyDown={e => this.onKeyDown(e)}
                  onBlur={() => this.closeEdit()}
                  autoFocus
                />
              </div>
            )
        }
      </div>
    )
  }
}

export default TaskList;
