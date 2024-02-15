import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import Card from "../component/card.jsx";

const pintas = ['♦','♥','♠','♣']
const values = [2, 3, 4, 5, 6, 7, 8, 9, 'A', 'Q', 'K', 'J']

const getRandomFromArray = (arr) => arr[Math.floor(Math.random()*arr.length)]

function generateCard(){
	let pinta = getRandomFromArray(pintas)
	let value = getRandomFromArray(values)
	return {
		pinta,
		value,
		color: pinta == '♥' || pinta == '♦' ? 'red' : 'black'
	}
}


export const Home = () => {

	const [ playerCards, setPlayerCards ] = useState([])

	useEffect(()=>{
		const firstCard = generateCard()
		const secondCard = generateCard()
		const playerFirstHand = [ firstCard , secondCard ]
		setPlayerCards(playerFirstHand)
	},[])

	const addCardToHand = () => {
		setPlayerCards([ ...playerCards, generateCard() ])
	}

	return <div className="text-center h-100 d-flex flex-column justify-content-center">
		<h1>Player Hand!</h1>
		<div className="d-flex flex-row justify-content-center">
			{ playerCards.map( pCard => <Card content={pCard} />) }
		</div>
		<button onClick={() => addCardToHand()} className="btn btn-warning ">Ask</button>
	</div>
};
