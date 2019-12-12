import React from 'react'
import { Online } from "react-detect-offline";
import { connect } from 'react-redux'

const HomePage = (props) => {

	if (!props.users.isLoaded) 
	return (
		<div>
			<div className="preloader">
				<div className="image">
					<img src="images/loading.gif" alt="Loading ..."></img>
				</div>
				<div className="text">
					Loading data ...
				</div>
			</div>
		</div>
	)

	else
	return (
		<div>
			<table>
				<tbody>
				{props.users.list.map((user) => {
					return (
						<tr 
							key={user.login.username}
							onClick={() => { props.history.push(`user/${user.login.username}`) }}
						>
							<td className="pictures">
								<Online>
									<img src={user.picture.thumbnail} alt={`${user.name.title}. ${user.name.first} ${user.name.last}`} />
								</Online>
							</td>
							<td className="users">
								<h3>{user.name.title}. {user.name.first} {user.name.last}</h3>
								<span>{user.email}</span>
							</td>
						</tr>
					)

				})}
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

export default connect( mapStateToProps )( HomePage );
