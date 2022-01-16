import React from 'react';
import TaskLists from './tasklists/TaskLists';

class Nav extends React.Component<{ setList: (number) => void }> {
  render() {
    return (
      <div className="navbar">
        <TaskLists setList={this.props.setList}/>
      </div>
    )
  }
}

export default Nav;
