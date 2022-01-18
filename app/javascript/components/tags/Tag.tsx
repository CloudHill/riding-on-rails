import React from 'react';
import TagInterface from './TagInterface';
import { X } from 'react-feather';

interface Props { 
  tag: TagInterface 
  onClick: (tag: TagInterface) => void;
  remove: (tag: TagInterface) => void;
}

class Tag extends React.Component<Props> {
  render() {
    const { tag, onClick, remove } = this.props;
    return (
      <div 
        className={"tag" + (remove ? " tag-rm" : "")}
        style={{background: '#' + (tag.color || 'dfdfdf')}}
        onClick={() => onClick(tag)}
      >
        {tag.name}
        {
          remove
            ? (
                <span className="clear-input" 
                  onClick = {e => {
                    remove(tag);
                    e.stopPropagation();
                  }}>
                    <X size="10px"/>
                </span>
            ) : null
        }
      </div>
    )
  }
}

export default Tag;
