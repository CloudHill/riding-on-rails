import React from 'react';
import Tasks from './tasks/Tasks';
import Nav from './Nav';

class Home extends React.Component<{}, { activeListId: number }> {
  constructor(props) {
    super(props);
    this.state = { activeListId: 0 };

    this.setActiveList = this.setActiveList.bind(this);
  }

  setActiveList(id: number) {
    this.setState({ activeListId: id });    
  }

  render() {
    const { activeListId } = this.state;    
    return (
      <>
        <Nav setList={this.setActiveList}/>
        <Tasks activeList={activeListId}/>
      </>
    )
  }
}

export default Home;
