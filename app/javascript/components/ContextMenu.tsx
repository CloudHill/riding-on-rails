import React from 'react';

interface ContextMenuProps {
  anchor: {x: number, y: number};
  menuItems: {
    title: string;
    action: () => void
  }[];
}

class ContextMenu extends React.Component<ContextMenuProps> {
  render() {
    const { menuItems, anchor } = this.props;

    const items = menuItems.map(({action, title}, i) => (
      <button
        key={i}
        className="context-button"
        onClick={() => action()}
      >
        {title}
      </button>
    ))

    return (
      <div 
        className="context-menu"
        style={{
          top: anchor.y,
          left: anchor.x
        }}
      >
        {items}
      </div>
    )
  }
}

export default ContextMenu;
export { ContextMenuProps };
