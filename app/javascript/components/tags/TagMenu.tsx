import React from 'react';
import TagInput from './TagInput';
import TagList from './TagList';
import TagInterface from './TagInterface';
import { getCsrfToken } from '../../helpers';

interface Props {
  create?: boolean;
  onClick: (tag: TagInterface) => void;
}

interface State {
  tags: TagInterface[];
  editing: boolean;
}

class TagMenu extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
       tags: [],
       editing: false
    }

    this.createTag = this.createTag.bind(this);
    this.updateTag = this.updateTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
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

  updateTag(tag: TagInterface, newProps) {
    const id = tag.id;
    const url = `/api/v1/tags/${id}`;
    const token = getCsrfToken();

    fetch(url, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProps)
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        const newTag = response as TagInterface;
        const tags = this.state.tags.map(
          t => t.id === tag.id ? newTag : t
        );

        this.setState({ tags });
      })
      .catch(error => console.log(error.message));
  }

  deleteTag(tag: TagInterface) {
    const id = tag.id;
    const url = `/api/v1/tags/${id}`;
    const token = getCsrfToken();

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
      }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        const tags = this.state.tags.filter(
          ({id}) => id !== tag.id
        );

        this.setState({tags});
      })
      .catch(error => console.log(error.message));
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing});
  }
  
  render() {
    const { create, onClick } = this.props;
    const { tags, editing } = this.state;
    const edit = {
      editing,
      toggleEditing: this.toggleEditing
    }

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
                <TagInput
                  createTag={this.createTag}
                  edit={edit}
                />
              </div>
            ) : null
        }
        <TagList 
          tags={tags} 
          onClick={onClick}
          remove={editing ? this.deleteTag : undefined}
          editing={editing}
          updateTag={this.updateTag}
        />
      </div>
    )
  }
}

export default TagMenu;
