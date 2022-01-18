import React from 'react';
import Tasks from './tasks/Tasks';
import Nav from './Nav';
import ContextMenu, { ContextMenuProps } from './ContextMenu';
import TagInterface from './tags/TagInterface';
import TaskListInterface from './tasklists/TaskListInterface';

interface State {
  activeList: {
    id: number;
    name: string;
  };
  showContextMenu: boolean;
  contextMenuOptions: ContextMenuProps;
  search: {
    title: string;
    tags: TagInterface[];
  };
}

const hiddenContextMenu = {
  showContextMenu: false,
  contextMenuOptions: {
    anchor: {x: 0, y: 0},
    menuItems: [],
    content: null
  }
}

const emptySearch = {
  search: {
    title: "",
    tags: [],
  }
}

class Home extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      activeList: {
        id: 0,
        name: "Tasks"
      },
      ...hiddenContextMenu,
      ...emptySearch
    };

    this.setActiveList = this.setActiveList.bind(this);
    this.showContextMenu = this.showContextMenu.bind(this);
    this.searchTasks = this.searchTasks.bind(this);
  }

  componentDidMount() {    
    document.addEventListener("click", e => this.onDocumentClick(e));
  }

  showContextMenu(options: ContextMenuProps) {
    this.setState({ 
      contextMenuOptions: options, 
      showContextMenu: true
    });
  }

  setActiveList(taskList: TaskListInterface) {
    this.setState({ activeList: taskList });
  }

  onDocumentClick(e:MouseEvent) {
    const el = e.target as HTMLElement;
    if (this.state.showContextMenu && !el.closest('.context-menu'))
      this.setState(hiddenContextMenu);
  }

  searchTasks(search: { title: string, tags: TagInterface[] }) {
    this.setState({ search });
  }

  render() {
    const { activeList, showContextMenu, contextMenuOptions, search } = this.state;
    const { anchor, menuItems, content } = contextMenuOptions;
    
    const activeListProp = {
      ...activeList, 
      setActiveList: this.setActiveList
    }

    return (
      <>
        <Nav
          activeList={activeListProp}
          showContextMenu={this.showContextMenu}
          searchTasks={this.searchTasks}
        />
        <Tasks
          activeList={activeListProp}
          showContextMenu={this.showContextMenu}
          search={search}  
        />
        { 
          showContextMenu
            ? <ContextMenu
                anchor={anchor} 
                menuItems={menuItems}
                content={content}
                hide={() => this.setState(hiddenContextMenu)}
              />
            : null
        }
      </>
    )
  }
}

export default Home;
