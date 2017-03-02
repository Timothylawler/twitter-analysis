import React, { Component } from 'react';
import Recipe from '../recipe/recipe.jsx'
import '../../App.css';

import {GridList, GridTile} from 'material-ui/GridList';

import axios from 'axios';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

class RecipeGrid extends Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			recipes : []
		};
	}
	
	componentDidMount(){
		this.getTopRatedRecipes();
	}
	
	
	getTopRatedRecipes(){
		var url = "http://localhost:4000/food/toprating";
		let self = this;
		
		axios.get(url).then(function(data){
			self.setState({recipes: data.data.recipes});
			//return data.data.recipes;
		});
	}
	
  render() {
		console.log(this.state.recipes);
		const recipes = this.state.recipes.map(function(item, i){
			return (
				<GridTile 
					key={item.recipe_id}
					title={item.title}
					titlePosition="top"
					cols={1}
					rows={1}
					>
						<img className="responsive-img" src={item.image_url} />
				</GridTile>
			);
		});
		
    return (
      <GridList 
				cellHeight={180} 
				styles={styles.gridList}
				cols={4}
				padding={8}>
				{recipes}
      </GridList>
    );
  }
}

export default RecipeGrid;
