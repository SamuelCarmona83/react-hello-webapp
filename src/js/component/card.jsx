import React from 'react'

const Card = ({ content }) => {

    return <>
        <div className="card p-2" style={{ width: '320px', 
            margin: '10px',
            height: '200px',
            fontSize: '24px',
        }}>
			<div className="d-flex">
                <span className="me-auto" style={{ color: content.color }}>
                    { content.pinta }
                </span>
			</div>
			<div className="card-body d-flex">
                <span className="mx-auto my-auto">
                    { content.value }
                </span>
			</div>
			<div className="d-flex">
                <span className="ms-auto" style={{ color: content.color, rotate: '180deg' }}>
                    { content.pinta }
                </span>
			</div>
		</div>
    </>
}

export default Card;