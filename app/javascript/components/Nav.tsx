import React from 'react';
import TaskLists from './tasklists/TaskLists';

class Nav extends React.Component {
  render() {
    return (
      <div className="navbar">
        <TaskLists />
      </div>
    )
  }
}

export default Nav;
