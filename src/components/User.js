import React from "react";
import user1 from "../images/OIP (1).jpeg";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "./User.css";

function User() {
	const [open, setOpen] = React.useState(false);

	let menuRef = React.useRef();
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
console.log(user && user.nickname);

	return (
		<div className="App">
			<div className="menu-container" ref={menuRef}>
				<div
					className="menu-trigger"
					onClick={() => {
						setOpen(!open);
					}}
				>
					<img src={user1} alt=""></img>
				</div>

				<div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
                <center><span style={{fontWeight:"bold"}}>{user && user.nickname}</span></center> 
					<ul>
                    
					{isAuthenticated && <Link to="/bookmarks"> <DropdownItem img={""} text={"Saved Jobs"} /></Link>}
					<Link to="/salaryDetails">	<DropdownItem img={""} text={"Salary data"} /> </Link>
						{!isAuthenticated ? (
							<button onClick={() => loginWithRedirect()}>Log In</button>
						) : (
							<button
							style={{marginLeft:"0.5rem"}}
								onClick={() =>
									logout({ logoutParams: { returnTo: window.location.origin } })
								}
							>
								Log Out
							</button>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
function DropdownItem(props) {
	return (
		<li className="dropdownItem">
			<img src={props.img} alt=""></img>
			{props.text}
		</li>
	);
}

export default User;
