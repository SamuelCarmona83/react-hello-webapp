import React, { useState, useEffect } from "react"

import { useNavigate, useParams  } from "react-router"
import { Link } from "react-router-dom"


export const CharacterData = () => {

    const url = process.env.API_URL

    const [ person , setPerson ] = useState()

    const { id } = useParams()

    const navigate = useNavigate()

    const fetchCharacter = async () => {
        const response = await fetch(`${url}/Characters/${id}`)
        if(!response.ok){
            navigate(`/notfound`)
        }
        const data = await response.json()

        setPerson(data)
    }

    const goNext = () => {
        navigate(`/character/${parseInt(id) - 1}`)
    }

    useEffect(()=>{
        fetchCharacter()
    },[id])

    return <div className="text-center">
        { person && <>
         <h1>{ person.fullName}</h1>
        <img onClick={goNext} src={person.imageUrl} className="card-img-top" alt={person.fullName} />
        </>}
        <Link to={`/character/${parseInt(id) + 1}`}> Next </Link>

    </div>
}