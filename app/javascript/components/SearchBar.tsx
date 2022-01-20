import React, { ChangeEvent, MouseEvent } from 'react';
import TagInterface from './tags/TagInterface';
import TagList from './tags/TagList';
import { Tag } from 'react-feather';
import { ContextMenuProps } from './ContextMenu';
import TagMenu from './tags/TagMenu';

interface Props {
  searchTasks: (search: { title: string, tags: TagInterface[] }) => void;
  showContextMenu: (options: ContextMenuProps) => void;
}

interface State {
  title: string;
  tags: TagInterface[];
}

class SearchBar extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
       title: "",
       tags: []
    }

    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }
  
  onChange(e:ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    this.setState({ title });
    this.props.searchTasks({ 
      title, tags: this.state.tags 
    });
  }
  
  addTag(tag: TagInterface) {
    const { tags: tagsState } = this.state;
    if (tagsState.find(t => t.id === tag.id)) return; // tag already exists
    
    const tags = tagsState.concat(tag);
    this.setState({ tags });
    this.props.searchTasks({ 
      title: this.state.title, tags 
    });
  }

  removeTag(tag: TagInterface) {
    const { tags: tagsState } = this.state;
    if (!tagsState.find(t => t.id === tag.id)) return; // tag doesn't exist
    const tags = tagsState.filter(t => t.id !== tag.id)

    this.setState({ tags });
    this.props.searchTasks({ 
      title: this.state.title, tags 
    });
  }

  showTagList(e:MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect();

    this.props.showContextMenu({
      anchor: {
        x: rect.x + (rect.width / 2),
        y: rect.y + (rect.height / 2),
      }, 
      content: <TagMenu onClick={this.addTag}/>
    });
  }

  render() {
    const { title, tags } = this.state;

    return (
      <div className="searchbar">
        <div className="searchbar-input">
          <input
            placeholder='Search'
            value={title}
            onChange={e => this.onChange(e)}
          />
          <button 
            title="Search tag" 
            className="action-button icon-button"
            onClick={e => this.showTagList(e)}
          >
            <Tag size="100%"/>
          </button>
        </div>
        <TagList tags={tags} remove={this.removeTag}/>
      </div>
    )
  }
}

export default SearchBar;
