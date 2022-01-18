import React from 'react';
import Tag from './Tag';
import TagInterface from './TagInterface';

interface Props {
  tags: TagInterface[];
  onClick?: (tag: TagInterface) => void;
}

class TagMenu extends React.Component<Props> {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { tags, onClick } = this.props;
    const allTags = tags.map(tag => (
      <Tag 
        key={tag.id} 
        tag={tag}
        onClick={onClick}
      />
    ));
      
    return (
      <div className="taglist">
        {allTags}
      </div>
    )
  }
}

export default TagMenu;
