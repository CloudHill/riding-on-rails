import React from 'react';
import TagInput from './TagInput';
import TagList from './TagList';
import TagInterface from './TagInterface';
import { getCsrfToken } from '../../helpers';

interface Props {
  create?: boolean;
  onClick: (tag: TagInterface) => void;
}

class TagMenu extends React.Component<Props, { tags: TagInterface[] }> {
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
    const { create, onClick } = this.props;

    return (
      <div
        className="taglist-container" 
        //@ts-ignore
        create={create ? "" : undefined}
      >
        {
          create
            ? (
              <div className="taglist-header">
                <TagInput createTag={this.createTag}/>
              </div>
            ) : null
        }
        <TagList 
          tags={this.state.tags} 
          onClick={onClick}
        />
      </div>
    )
  }
}

export default TagMenu;
