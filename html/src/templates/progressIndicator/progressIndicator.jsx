import React, { Component } from 'react';
import '../../App.css';
import CircularProgress from 'material-ui/CircularProgress';


class ProgressIndicator extends Component {
  render() {
    return (
      <div className="">
				<CircularProgress size={80} thickness={5} />
      </div>
    );
  }
}

export default ProgressIndicator;
