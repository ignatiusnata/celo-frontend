import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import './App.css'
import { addUsers } from './actions/users'

import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import User from './components/User'

const App = (props) => {

	const readData = async () => {
		const response = await axios.get(process.env.REACT_APP_BACKEND_URL)
		if (response.data.status === 200) {
			localStorage.setItem('users', JSON.stringify(response.data.result))
			props.dispatch(addUsers(response.data.result))
		}
	}

	useEffect(() => {
		if (!props.users.isLoaded) {
			const localUsers = localStorage.getItem('users')
			if (localUsers) {
				props.dispatch(addUsers(JSON.parse(localStorage.getItem('users'))))
				console.log('reading from LocalStorage')
				// console.log(props.users)
			}
			else { 
				readData() 
				console.log('reading from API')
				// console.log(props.users)
			}
		}
	}, [props.users.isLoaded])	

	return (
		<BrowserRouter>
			<div>
				<NavBar />
				<Route exact path="/" component={HomePage}/>
				<Route exact path="/user/:id" component={User}/>
			</div>
		</BrowserRouter>
	)
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
};

export default connect( mapStateToProps )( App );