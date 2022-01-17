import React from 'react';

interface ContextMenuProps {
  anchor: {x: number, y: number};
  menuItems?: {
    title: string;
    action: () => void
  }[];
  content?: JSX.Element;
  hide?: () => void;
}

class ContextMenu extends React.Component<ContextMenuProps> {
  render() {
    const { menuItems, anchor, content } = this.props;
    const items = menuItems?.map(({action, title}, i) => (
      <li key={i}>
        <button 
          onClick={() => {
            action();
            this.props.hide();
          }}
        >
          {title}
        </button>
      </li>
    ))

    return (
      <div 
        className="context-menu"
        style={{
          top: anchor.y,
          left: anchor.x
        }}
      >
        {
          menuItems?.length > 0
            ? (
              <ul className="context-items">
                {items}
              </ul>
            ) : null
        }
        {
          content 
            ? (
              <div className="context-content">
                {content}
              </div>
            ) : null
        }
      </div>
    )
  }
}

export default ContextMenu;
export { ContextMenuProps };
