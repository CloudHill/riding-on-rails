import React from 'react';
import Tasks from './tasks/Tasks';
import Nav from './Nav';
import ContextMenu, { ContextMenuProps } from './ContextMenu';

interface State {
  activeListId: number;
  showContextMenu: boolean;
  contextMenuOptions: ContextMenuProps;
}

const hiddenContextMenu = {
  showContextMenu: false,
  contextMenuOptions: {
    anchor: {x: 0, y: 0},
    menuItems: [],
    content: null
  }
}

class Home extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = { 
      activeListId: 0,
      ...hiddenContextMenu
    };

    this.setActiveList = this.setActiveList.bind(this);
    this.showContextMenu = this.showContextMenu.bind(this);
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

  setActiveList(id: number) {
    this.setState({ activeListId: id });
  }

  onDocumentClick(e:MouseEvent) {
    const el = e.target as HTMLElement;
    if (this.state.showContextMenu && !el.closest('.context-menu'))
      this.setState(hiddenContextMenu);
  }

  render() {
    const { activeListId, showContextMenu, contextMenuOptions } = this.state;
    const { anchor, menuItems, content } = contextMenuOptions;
    
    const activeList = {
      activeListId, 
      setActiveList: this.setActiveList
    }

    return (
      <>
        <Nav activeList={activeList} showContextMenu={this.showContextMenu}/>
        <Tasks activeList={activeListId} showContextMenu={this.showContextMenu}/>
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
