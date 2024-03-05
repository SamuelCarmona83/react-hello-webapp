import React, { useState, useEffect, useContext } from "react"

import { useNavigate, useParams  } from "react-router"
import { Link } from "react-router-dom"

import { Context } from "../store/appContext"



export const CharacterData = () => {

    const { store, actions } = useContext(Context)

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

    return <div className="text-center my-auto">
        { person && <div className="d-flex flex-column">
            <h1>{ person.fullName}</h1>
            <img onClick={goNext} src={person.imageUrl} className="card-img-top mx-auto" style={{ maxWidth: "300px" }} alt={person.fullName} />
            <div className="mt-2">
                <Link className="btn btn-primary" to={`/character/${parseInt(id) + 1}`}> Next </Link>
                { store.favorites.find( itm => itm.id == person.id)  && <button 
                    onClick={() => actions.removeFavorite(person)}
                    className={"mx-2 btn btn-danger"}>
                    Delete Favorite
                </button>}
                { !store.favorites.find( itm => itm.id == person.id)  && <button
                    onClick={() => actions.addFavorite(person)}
                    className={"mx-2 btn btn-warning"}>
                    Add Favorite
                </button>}
            </div>
        </div>}
    </div>
}