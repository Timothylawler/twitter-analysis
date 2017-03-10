import React, { Component } from 'react';
import '../../App.css';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import update from 'react-addons-update';

import {
  Step,
  Stepper,
  StepButton
} from 'material-ui/Stepper';

const styles = {
  button: {
    margin: 8,
  },
	contentStyle: {
		marginTop: 12,
	}, 
	buttonsStyle: {
		paddingTop: 12,
		margin: 24,
		marginLeft: 0,
		marginRight: 0,
	},
	
}

class SearchBar extends Component {
	constructor(props){
		super(props);
		this.state ={
			finished : false,
			stepIndex : 0,
			hidden: false,
			search:{
				searchTerm: undefined,
				searchFrom: undefined,
				searchTo: undefined,
			},
		};
		this.handleNext = this.handleNext.bind(this);
		this.handlePrevious = this.handlePrevious.bind(this);
		this.reset = this.reset.bind(this);
	}
	
	handleNext(){
		const stepIndex = this.state.stepIndex;
		this.setState({
			stepIndex: stepIndex+1,
			finished : stepIndex >=2
		});
	}
	
	handlePrevious(){
		const stepIndex = this.state.stepIndex;
		if(stepIndex > 0){
			this.setState({
				stepIndex: stepIndex-1,
			});
		}
	}
	
	updateSearchValue(evt){
		this.setState({
			search: update(this.state.search,{searchTerm: {$set: evt.target.value}})
		});
	}
	updateFromValue(evt){
		this.setState({
			search: update(this.state.search,{searchFrom: {$set: evt.target.value}})
		});
	}
	updateToValue(evt){
		this.setState({
			search: update(this.state.search,{searchTo: {$set: evt.target.value}})
		});
	}
	
	getStepContent(stepIndex){
		switch(stepIndex){
			case 0:
				return (
					<div className="col-sm-12">
						eg. Analysing twitter #twitter #analyse
						<TextField
							value = {this.state.searchTerm}
							onChange={this.updateSearchValue.bind(this)}
							floatingLabelText="Search term, eg. 'analyse #twitter'"
							fullWidth={true}
						/>
					</div>
				);
				break;
			case 1:
				return (
					<div className="col-md-12">
						Tweet to/from: tweets aimed towards/from an account, eg. 'nasa' shows tweets conatining/from @nasa 
						<div className="col-md-6">
								<TextField
									value = {this.state.searchTo}
									onChange={this.updateToValue.bind(this)}
									floatingLabelText="tweeted to:"
									fullWidth={true}
								/>
						</div>
						<div className="col-md-6">
							<TextField
								value = {this.state.searchFrom}
								onChange={this.updateFromValue.bind(this)}
								floatingLabelText="tweeted from:"
								fullWidth={true}
							/>
						</div>
					</div>
				);
				break;
			case 2:
				return(
					<div>
						BLUELBUE
					</div>
				);
				break;
			case 3:
				return(
					<div className="col-md-12">
						Reset your entries or press the analyse button to see some magic happen
						<div className="col-md-12" style={styles.buttonsStyle}>
							<div className="col-md-12">
								<FlatButton
									label="Reset"
									onTouchTap={this.reset}
									style={styles.button}
								/>
							</div>
							<div className="col-md-12">
								<RaisedButton
									label="Analyse"
									labelPosition="before"
									secondary={true}
									onClick={() => this.props.analyseOnClick({search: this.state.search})}
									style={styles.button}
									icon={<KeyboardArrowRight/>}
								/>
							</div>
						</div>
					</div>
				);
				break;
			
		}
	}
	
	reset(){
		this.setState({
			stepIndex : 0,
			finished: false
		});
	}
	
	
  render() {
		const {finished, stepIndex, hidden} = this.state;
		
		
    return (
			
      <Paper zDepth={1}>
      	
				<Stepper 
					key={"menu-stepper"}
					linear={hidden}
					activeStep={stepIndex}>
					<Step>
						<StepButton onClick={() => this.setState({stepIndex: 0})}>
							Enter Search Term
						</StepButton>
					</Step>
					<Step>
						<StepButton onClick={() => this.setState({stepIndex: 1})}>
							Enter to and from
						</StepButton>
					</Step>
					<Step>
						<StepButton onClick={() => this.setState({stepIndex: 2})}>
							BLABLA
						</StepButton>
					</Step> 
					<Step>
						<StepButton onClick={() => this.setState({stepIndex: 3})}>
							Analyse
						</StepButton>
					</Step> 

				</Stepper>
				
				<div className="container row">
					<ReactCSSTransitionGroup
					transitionName="menuAnimation"
					transitionEnterTimeout={500}
					transitionLeave={false}
					transitionLeaveTimeout={500}>
						{
							!this.state.hidden && (
								<div key="menu-content" className="step-menu-content" style={styles.contentStyle}>
									{/* NOT HIDDEN */}
									{this.getStepContent(stepIndex)}
									
									{
										stepIndex < 3 && (
											<div className="col-sm-12" style={styles.buttonsStyle}>
												<RaisedButton
													label="Back"
													disabled={stepIndex === 0}
													onTouchTap={this.handlePrevious}
													style={{marginRight: 12}}
												/>
												<RaisedButton
													label="Next"
													disabled={stepIndex === 3}
													primary={true}
													onTouchTap={this.handleNext}
												/>
											</div>
										) 
									}
								</div>
							) 
						}
					</ReactCSSTransitionGroup>
				</div>
     		
				<FloatingActionButton 
					mini={true} 
					onClick={() => this.setState({hidden: !this.state.hidden})} 
					className="show-hide-fab">
					{ this.state.hidden? <KeyboardArrowDown/> : <KeyboardArrowUp/>}
				</FloatingActionButton>

      </Paper>
      
    );
  }
}

export default SearchBar;



