// App.js

import React, { Component } from 'react';
import MessageList from './components/MessageList';
//import ChannelList from './components/ChannelList';
import MessageBox from './components/MessageBox';
import firebase from 'firebase';

class App extends Component {

  constructor(props){
    super(props);
    firebase.initializeApp({
        apiKey: "AIzaSyAIERRSZ-LtoZpI-WuvrOnvFbB3BlK7BYc",
        authDomain: "starterhacks-kidsability.firebaseapp.com",
        databaseURL: "https://starterhacks-kidsability.firebaseio.com",
        projectId: "starterhacks-kidsability",
        storageBucket: "starterhacks-kidsability.appspot.com",
        messagingSenderId: "261877511876"
    });
  }

  render(){
    return (
      <div className="container msg">
              <div className="col">
                <MessageList db={firebase} />
              </div>
            <div className="columns">
              <div className="col asd">
                <MessageBox db={firebase} />
              </div>
        </div>
    </div>
    )
  }
}

export default App;