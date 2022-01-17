import React from 'react';
import TagInterface from './TagInterface';

interface Props { 
  tag: TagInterface 
  onClick: (tag: TagInterface) => void;
}

class Tag extends React.Component<Props> {
  render() {
    const { tag, onClick } = this.props;
    return (
      <div 
        className="tag"
        style={{background: '#' + (tag.color || 'dfdfdf')}}
        onClick={() => onClick(tag)}
      >
        {tag.name}
      </div>
    )
  }
}

export default Tag;
