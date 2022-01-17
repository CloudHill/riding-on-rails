import React, { MouseEvent, KeyboardEvent, ChangeEvent } from 'react';
import { ContextMenuProps } from '../ContextMenu';
import TaskListInterface from './TaskListInterface';

interface Props { 
  taskList: TaskListInterface;
  activeList: {
    activeListId: number;
    setActiveList: (id: number) => void;
  };
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
    const { taskList: { id }, activeList: { setActiveList } } = this.props;
    setActiveList(id);    
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
    const { taskList: { id, name }, activeList: { activeListId } } = this.props;
    const active = id === activeListId;

    return (
      <div
        className="tasklist"
        tabIndex={0}
        onClick={() => this.onClick()}
        onContextMenu={e => this.onContextMenu(e)}
        //@ts-ignore
        active={active ? "" : undefined}
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
