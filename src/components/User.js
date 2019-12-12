import React, { useState, useEffect } from 'react'
import { Online } from "react-detect-offline";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const User = (props) => {

	const [ detail, setDetail ] = useState({ value: {}, isLoaded: false })
	
	const findUser = async () => {
		const username = props.match.params.id
		if (props.users.isLoaded) {
			const found = props.users.list.find(user => user.login.username === username)
			setDetail({ value: found, isLoaded: true })
		}
	}

	useEffect(() => {
		if (!detail.isLoaded) findUser()
	})

	if (!detail.isLoaded)
	return (
		<div>
			<div className="preloader">
				<div className="image">
					<img src="images/loading.gif" alt="Loading ..."></img>
				</div>
				<div className="text">
					Loading user details ...
				</div>
			</div>
		</div>
	)

	else 
	return (
		<div>

			<table>
				<tbody>
					<tr>
						<td className="pictures">
							<Online>
								<img 
									src={detail.value.picture.large} 
									alt={`${detail.value.name.title}. ${detail.value.name.first} ${detail.value.name.last}`} 
								/>
							</Online>
						</td>
						<td className="detail">

							<h3>{detail.value.name.title}. {detail.value.name.first} {detail.value.name.last}</h3>
							<span>{detail.value.email}</span>

							<p>
								{detail.value.location.street.number} {detail.value.location.street.name} <br />
								{detail.value.location.city}, {detail.value.location.state} {detail.value.location.postcode} <br />
								{detail.value.location.country}
							</p>

							<Link to="/">Back to Home</Link>

						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
};

export default connect( mapStateToProps )( User );