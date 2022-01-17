import React from 'react';
import TagInterface from './TagInterface';

class Tag extends React.Component<{ tag: TagInterface }> {
  render() {
    const { tag } = this.props;
    return (
      <div 
        className="tag"
        style={{background: '#' + (tag.color || 'dfdfdf')}}
      >
        {tag.name}
      </div>
    )
  }
}

export default Tag;
