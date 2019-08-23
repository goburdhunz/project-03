import React from 'react'
import Rating  from 'react-rating'


const Card = ({ name, image, rating, restaurant, price, isVegetarian, isVegan }) => {
  return (
    <div className="card card-equal-height">
      <div className="card-image">
        <figure className="image">
          <img src={image} alt={name} className="card-image-size"/>
        </figure>
      </div>
      <div className="card-header">
        <div className="card-header-title">{name}  {(!!isVegetarian || !!isVegan) && <img src="https://i.imgur.com/8RN8Why.png" className="icon"/>}</div>
      </div>
      <div className="card-content">
        <h2 className="content text">
          <Rating
            emptySymbol= {<img src="https://i.imgur.com/B46NL0v.png" className="icon"/>}
            fullSymbol= {<img src="https://i.imgur.com/lminuDH.png" className="icon"/>}
            fractions={2}
            initialRating={rating}
            readonly
          />
        </h2>
        <h2 className="content text"><span className="has-text-weight-semibold">£ </span>{parseFloat(price).toFixed(2)}</h2>
        <h2 className="content text">{restaurant}</h2>
      </div>
    </div>
  )
}

export default Card
