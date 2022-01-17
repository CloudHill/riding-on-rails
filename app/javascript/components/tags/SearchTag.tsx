import React, { ChangeEvent } from 'react'

class SearchTag extends React.Component<{}, { name: string }> {
  constructor(props) {
    super(props)
    this.state = { name: "" }
  }

  onChange(e:ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    this.setState({ name });
  }  

  render() {
    return (
      <div className="tag-search">
        <input 
          value={this.state.name}
          placeholder='Add tag'
          onChange={e => this.onChange(e)}
          autoFocus
        />
      </div>
    )
  }
}

export default SearchTag;
