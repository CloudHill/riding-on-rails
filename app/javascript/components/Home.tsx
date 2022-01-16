import React from 'react';
import Tasks from './tasks/Tasks';
import Nav from './Nav';

class Home extends React.Component<{}, { activeListId:number }> {
  constructor(props) {
    super(props);
    this.state = { activeListId: 0 }
  }

  render() {
    const { activeListId } = this.state;
    return (
      <>
        <Nav/>
        <Tasks activeList={activeListId}/>
      </>
    )
  }
}

export default Home;
