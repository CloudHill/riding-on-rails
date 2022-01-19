import React from 'react';
import Tag from './Tag';
import TagInterface from './TagInterface';

interface Props {
  tags: TagInterface[];
  onClick?: (tag: TagInterface) => void;
  remove?: (tag: TagInterface) => void;
}

class TagMenu extends React.Component<Props> {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { tags, onClick } = this.props;
    if (!tags) return null;

    const allTags = tags.map(tag => (
      <Tag 
        key={tag.id} 
        tag={tag}
        onClick={onClick}
        remove={this.props.remove}
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
