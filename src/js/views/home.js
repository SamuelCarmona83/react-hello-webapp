import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import Card from "../component/card.jsx";

const pintas = ['♦','♥','♠','♣']
const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10]
const values = ['A', 'Q', 'K', 'J']

const getRandomFromArray = (arr) => arr[Math.floor(Math.random()*arr.length)]

function generateCard(){
	let pinta = getRandomFromArray(pintas)
	let value = getRandomFromArray([ ...numbers, ...values])
	return {
		pinta,
		value,
		color: pinta == '♥' || pinta == '♦' ? 'red' : 'black'
	}
}

const getScore = cardList => {
	let points = 0;

	//buscar si existen A's 
	const aCardIsA = cardList.find( card => card.value == 'A') // find
	
	if(aCardIsA){

		cardList.filter( x => x.value != 'A').forEach( card => {
			
			if(numbers.includes(card.value)){
				points += card.value
			}
	
			if(['Q', 'K', 'J'].includes(card.value)){
				points += 10
			}
		});

		cardList.filter( x => x.value == 'A').forEach( ases => {
			if( points <= 10 ){
				points += 11
			}else{
				points += 1
			}
		})


	}else{
		cardList.forEach( card => {
				
			if(numbers.includes(card.value)){
				points += card.value
			}
	
			if(['Q', 'K', 'J'].includes(card.value)){
				points += 10
			}
		});
	}
	return points
}

export const Home = () => {

	const [ playerCards, setPlayerCards ] = useState([
		{
			"pinta": "♣",
			"value": "A",
			"color": "black"
		},
		{
		  "pinta": "♠",
		  "value": 9,
		  "color": "black"
		},
	  ])

	// useEffect(()=>{
	// 	const firstCard = generateCard()
	// 	const secondCard = generateCard()
	// 	const playerFirstHand = [ firstCard , secondCard ]
	// 	setPlayerCards(playerFirstHand)

	// 	// Verificar si esto es Black Jack 21
		
	// },[])

	const addCardToHand = () => {
		setPlayerCards([ ...playerCards, generateCard() ])
	}

	

	return <div className="text-center h-100 d-flex flex-column justify-content-center">
		<h1>Player Hand! { getScore(playerCards) }</h1>
		<div className="d-flex flex-row justify-content-center">
			{ playerCards.map( (pCard, ind) => <Card key={ind} content={pCard} />) }
		</div>
		<button onClick={() => addCardToHand()} className="btn btn-warning ">Ask</button>
	</div>
};
