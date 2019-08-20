import React from 'react'
import Auth from '../../lib/Auth'

const Comment = ({user, createdAt, content, handledelete, _id}) => {
  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{user.username}</strong>
            {' '}
            <small>{(new Date(createdAt)).toLocaleDateString()}</small>
            <br />
            {content}
          </p>
        </div>
      </div>
      {Auth.isAuthenticated() && <div className="media-right">
        <button id={_id} onClick={handledelete} className="delete"></button>
      </div>}
    </article>
  )
}

export default Comment
