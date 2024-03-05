import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext"; // Este es el que nos da el Flux

export const Navbar = () => {

	const { store } = useContext(Context)
	const [ show, setShow ] = useState(false)

	return (
		<nav className="navbar navbar-dark bg-dark mb-3 p-1 sticky-top">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">{ store.hola }</span>
			</Link>
			<div className="ml-auto me-5">
				<div className={"dropdown dropstart "  + (show ? "show" : "")}>
					<button className={"btn btn-success dropdown-toggle"} type="button" onClick={() => setShow(!show)}>
						Favorites
					</button>
					<ul className={"dropdown-menu "  + (show ? "show" : "")}>
						{ store.favorites.map ( charac => <li key={charac.id}>
							<Link to={`/character/${charac.id}`} className="dropdown-item">
								{ charac.fullName }
							</Link>
						</li>)}
					</ul>
				</div>
			</div>
		</nav>
	);
};
