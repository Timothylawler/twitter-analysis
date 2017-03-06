import React, { Component } from 'react';
import '../../App.css';
import Tweet from './tweet.jsx';

import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: "100%",
    height: "100%",
    overflowY: 'auto',
  },
};

class Tweets extends Component {
  render() {
    return (
      <div className="">
				<GridList
					cellHeight={"auto"}
					style={styles.gridList}
					cols={2}
				>
					<Subheader>December</Subheader>
					<GridTile key={1} cols={1}>
						<Tweet />
					</GridTile>
					<GridTile key={2} cols={1}>
						<Tweet />
					</GridTile>
					<GridTile key={3} cols={1}>
						<Tweet />
					</GridTile>
				</GridList>
      </div>
    );
  }
}

export default Tweets;
