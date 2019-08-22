import React from 'react'
import Auth from '../../lib/Auth'
import Rating  from 'react-rating'


const Comment = ({user, createdAt, content, handledelete, _id,    userRating}) => {
  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{user.username}</strong>
            {' '}
            <small>{(new Date(createdAt)).toLocaleDateString()}</small>
            <hr className="linebreaker"/>
            {content}
          </p>
          <span className="title is-2 has-text-centered">
            <Rating
              emptySymbol= {<img src="https://i.imgur.com/931P2ih.png" className="image is-24x24"/>}
              fullSymbol= {<img src="https://i.imgur.com/f00MSST.png" className="image is-24x24"/>}
              fractions={2}
              initialRating={userRating}
              readonly
            />
          </span>
        </div>
      </div>
      {Auth.isCurrentUser(user) && <div className="media-right">
        <button id={_id} onClick={handledelete} className="delete"></button>
      </div>}
    </article>
  )
}

export default Comment
