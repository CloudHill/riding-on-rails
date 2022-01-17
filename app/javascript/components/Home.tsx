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
    menuItems: []
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
    document.addEventListener("click", () => this.onDocumentClick());
  }

  showContextMenu(options: ContextMenuProps) {
    this.setState({ 
      contextMenuOptions: options, 
      showContextMenu: true }
    );
  }

  setActiveList(id: number) {
    this.setState({ activeListId: id });    
  }

  onDocumentClick() {
    console.log('test');
    this.setState(hiddenContextMenu);
  }

  render() {
    const { activeListId, showContextMenu, contextMenuOptions } = this.state;
    const { anchor, menuItems } = contextMenuOptions;

    return (
      <>
        <Nav setList={this.setActiveList} showContextMenu={this.showContextMenu}/>
        <Tasks activeList={activeListId}/>
        { 
          showContextMenu
            ? <ContextMenu anchor={anchor} menuItems={menuItems} />
            : null
        }
      </>
    )
  }
}

export default Home;
