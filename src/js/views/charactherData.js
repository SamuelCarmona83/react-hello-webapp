import React, { useState, useEffect } from "react"
import { useParams  } from "react-router"
import { Link } from "react-router-dom"


export const CharacterData = () => {

    const [ person , setPerson ] = useState()

    const { id } = useParams()

    const fetchCharacter = async () => {
        const response = await fetch(`https://thronesapi.com/api/v2/Characters/${id}`)
        const data = await response.json()
        setPerson(data)
    }

    useEffect(()=>{
        fetchCharacter()
    },[id])

    return <div className="text-center">
        { person && <>
         <h1>{ person.fullName}</h1>
        <img src={person.imageUrl} className="card-img-top" alt={person.fullName} />
        </>}
        <Link to={`/character/${parseInt(id) + 1}`}> Next </Link>

    </div>
}