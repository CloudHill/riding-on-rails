import React from 'react';
import SearchTag from './SearchTag';
import Tag from './Tag';
import TagInterface from './TagInterface';
import { getCsrfToken } from '../../helpers';

interface Props {
  onClick: (tag: TagInterface) => void;
}

class TagList extends React.Component<Props, { tags: TagInterface[] }> {
  constructor(props) {
    super(props)
    this.state = {
       tags: []
    }

    this.createTag = this.createTag.bind(this);
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

  createTag(tag: TagInterface) {
    const url = "/api/v1/tags";
    const token = getCsrfToken();    
    
    // create task
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tag)
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        const newTag = response as TagInterface;
        const tags = this.state.tags.concat([newTag]);

        this.setState({tags});
      })
      .catch(error => console.log(error.message));
  }
  
  render() {
    const { tags } = this.state;
    const allTags = tags.map(tag => (
      <Tag 
        key={tag.id} 
        tag={tag} 
        onClick={this.props.onClick}
      />
    ));
      
    return (
      <div className="taglist-container">
        <div className="taglist-header">
          <SearchTag createTag={this.createTag}/>
        </div>
        <div className="taglist">
          {allTags}
        </div>
      </div>
    )
  }
}

export default TagList;
