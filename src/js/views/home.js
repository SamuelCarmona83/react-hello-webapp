import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Card from "../component/card.jsx";
import { Context } from "../store/appContext.js";


export const Home = () => {

	const url = process.env.API_URL;

	const [ characters, setCharacters ] = useState()

	const fetchCharacters = async () => {

		const response = await fetch(`${url}/Characters`)
		const data = await response.json()
		setCharacters(data)

	}

	useEffect(()=>{
		fetchCharacters()
	}, [])

	return <div className="d-flex flex-wrap mt-5 gap-2">
		{	
			characters && characters.map( (personaje, ind) => <Characters item={personaje} key={ind} />)
		}
	</div>
};


const Characters = ({ item }) => {

	const flux = useContext(Context)

	return <>
		<div className="card" style={{ width: "18rem" }}>
			<img src={item.imageUrl} className="card-img-top" alt={item.fullName} style={{ maxHeight: '18rem'}} />
			<div className="card-body">
				<h5 className="card-title">{item.fullName}</h5>
				<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				<Link to={`/character/${item.id}`} className="btn btn-primary me-2">Details</Link>
				<button className="btn btn-warning ms-2" onClick={ () => flux.actions.addFavorite(item) }>
					Add Favorite
				</button>
			</div>
		</div>
	</>
}
