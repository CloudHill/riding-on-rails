import React, { ChangeEvent } from 'react';
import TagInterface from './tags/TagInterface';
import TagList from './tags/TagList';

interface Props {
  searchTasks: (search: { title: string, tags: TagInterface[] }) => void;
}

interface State {
  search: string;
}

class SearchBar extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
       search: ""
    }
  }
  
  onChange(e:ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;
    this.setState({ search });
    this.props.searchTasks({ title: search, tags: [] });
  }

  render() {
    const tags = [];
    return (
      <div className="searchbar">
        <input
          placeholder='Search'
          value={this.state.search}
          onChange={e => this.onChange(e)}
        />
        <TagList tags={tags} />
      </div>
    )
  }
}

export default SearchBar;
