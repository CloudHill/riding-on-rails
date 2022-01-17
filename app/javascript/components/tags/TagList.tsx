import React from 'react';
import SearchTag from './SearchTag';
import Tag from './Tag';
import TagInterface from './TagInterface';

class TagList extends React.Component<{}, { tags: TagInterface[] }> {
  constructor(props) {
    super(props)
    this.state = {
       tags: []
    }
  }

  componentDidMount() {
    const url = "/api/v1/tags/";    

    fetch(url)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ tags: response }))
      .catch(() => this.context.history.push("/"));
  }
  
  render() {
    const { tags } = this.state;
    const allTags = tags.map(tag => (
      <Tag tag={tag}/>
    ));
      
    return (
      <div className="tag-list">
        <SearchTag/>
        {allTags}
      </div>
    )
  }
}

export default TagList;
