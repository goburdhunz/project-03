import React from 'react'
import Rating  from 'react-rating'

const Card = ({ name, image, rating, restaurant, price }) => {
  return (
    <div className="card card-equal-height">
      <div className="card-image">
        <figure className="image">
          <img src={image} alt={name} className="card-image-size"/>
        </figure>
      </div>
      <div className="card-header">
        <div className="card-header-title">{name}</div>
      </div>
      <div className="card-content">
        <h2 className="content">
          <Rating
            emptySymbol= {<img src="https://i.imgur.com/B46NL0v.png" className="icon"/>}
            fullSymbol= {<img src="https://i.imgur.com/lminuDH.png" className="icon"/>}
            fractions={2}
            initialRating={rating}
            readonly
          />
        </h2>
        <h2 className="content"><span className="has-text-weight-semibold">£ </span>{parseFloat(price).toFixed(2)}</h2>
        <h2 className="content">{restaurant}</h2>
      </div>
    </div>
  )
}

export default Card
