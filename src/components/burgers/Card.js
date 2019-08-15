import React from 'react'

const Card = ({ name, image, rating }) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={image} alt={name} />
        </figure>
      </div>
      <div className="card-header">
        <div className="card-header-title">{name}</div>
      </div>
      <div className="card-content">
        <h2 className="content">{rating} 🍔🍔🍔🍔🍔</h2>
      </div>
    </div>
  )
}

export default Card
