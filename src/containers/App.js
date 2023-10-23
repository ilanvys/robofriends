import React, { Component } from "react";
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBox from "../components/SearchBox";
import ErrorBoundry from "../components/ErrorBoundry";
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(res => res.json())
			.then(users=> this.setState({ robots: users }))
	}

	onSearchUpdtae = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render() {
		const { robots, searchfield } = this.state
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		})
		return !robots.length ?
			<h1>Loading</h1> :
			(
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox 
						searchUpdate={this.onSearchUpdtae}
						searchfield={searchfield}
					/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filteredRobots} />
						</ErrorBoundry>
					</Scroll>
				</div>
			)
	}
}
	
export default App