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

	const addSimbols = card => {
		if(numbers.includes(card.value)){
			points += card.value
		}

		if(['Q', 'K', 'J'].includes(card.value)){
			points += 10
		}
	}

	//buscar si existen A's 
	const aCardIsA = cardList.find( card => card.value == 'A')

	if(aCardIsA){

		cardList.filter( x => x.value != 'A').forEach(addSimbols);

		cardList.filter( x => x.value == 'A').forEach( ases => {
			if( points <= 10 ){
				points += 11
			}else{
				points += 1
			}
		})


	}else{
		cardList.forEach(addSimbols);
	}
	return points
}

export const Home = () => {

	const [ playerCards, setPlayerCards ] = useState([])
	const [ croupierCards, setCroupierCards ] = useState([])

	const [ stay, setStay ] = useState(false)

	useEffect(()=>{
		const firstCard = generateCard()
		const secondCard = generateCard()
		const playerFirstHand = [ firstCard , secondCard ]
		setPlayerCards(playerFirstHand)

		const croupierCards = Array(2).fill(generateCard())
		setCroupierCards(croupierCards)
		// Verificar si esto es Black Jack 21
		
	},[]) // onLoad

	useEffect(()=>{
		if(getScore(playerCards) >= 21 && getScore(croupierCards) <= 21){
			setStay(true)
		}
	},[playerCards])

	useEffect(()=>{
		if(getScore(croupierCards) <= 17 && stay){
			setCroupierCards([ ...croupierCards, generateCard() ])
		}
	}, [stay, croupierCards]) // update

	const addCardToHand = () => {
		setPlayerCards([ ...playerCards, generateCard() ])
	}

	const whoIsWining = () => {

		const playerPoints = getScore(playerCards)
		const croupierPoints = getScore(croupierCards)

		if(playerPoints > 21){
			return 'Croupier Wins'
		}

		if( croupierPoints == 21){
			setStay(true)
			return 'Croupier Wins'
		}

		if( playerPoints == 21){
			setStay(true)
			return 'Player Wins!'
		}

		if(playerPoints == croupierPoints){
			return 'Everyone Wins'
		}

		if( stay && playerPoints <= 21 && playerPoints > croupierPoints){
			return 'Player Wins!'
		}

		if( stay && croupierPoints > 21 && playerPoints <= 21){
			return 'Player Wins!'
		}

		return 'Croupier Wins'
	}

	return <div className="text-center h-100 d-flex flex-column justify-content-center">

		{ stay && <h1 className="text-white">{whoIsWining()}</h1>}
		
		<h1 style={{ color: 'white' }}>Croupier Hand { getScore(croupierCards) }</h1>

		{
			!stay &&  croupierCards[0] && <div className="d-flex flex-row justify-content-center">
				<Card key={'croupier-card-1'} content={croupierCards[0] } />
				<div className="card p-2" style={{ width: '320px', 
					margin: '10px',
					height: '200px',
					fontSize: '24px',
				}}>
					<div className="d-flex">
					</div>
					<div className="card-body d-flex">
						<span className="mx-auto my-auto" style={{ fontSize: '36px'}}>
							?
						</span>
					</div>
					<div className="d-flex">
					</div>
				</div>
			</div>
		}

		{stay && <div className="d-flex flex-row justify-content-center">
			{ croupierCards.map( (pCard, ind) => <Card key={ind} content={pCard} />) }
		</div>}

		<h1 style={{ color: 'white' }}>Player Hand { getScore(playerCards) }</h1>
		<div className="d-flex flex-row justify-content-center">
			{ playerCards.map( (pCard, ind) => <Card key={ind} content={pCard} />) }
		</div>
		{(getScore(playerCards) < 21 && !stay) &&  <div>
			<button onClick={() => addCardToHand()} className="btn btn-warning ">Ask</button>
		</div>}
		<button onClick={() => stay ? () => {} : setStay(true)} className="btn btn-success ">Stay</button>
	</div>
};
