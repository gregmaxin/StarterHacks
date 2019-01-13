// Header.js

import React, {Component} from 'react';

class Header extends Component {

  render(){
    return (
      <nav className="navbar">
        <div className="navbar-brand">
            {this.props.title}
        </div>
      </nav>
    )
  }
}
export default Header