import styles from './PostDetail.module.css'

import {Link} from 'react-router-dom'

export const PostDetail = ({post}) => {
  return (
    <div>
        <img src={post.imgage} alt={post.title} />
        <h2> {post.title} </h2>
        <p>{post.createdBy}</p>
        <div>
            {post.tagsArray.map((tag) => (
                <p key={tag}> 
                    <span>#</span>
                    {tag}
                </p>
            ))}
            <Link to={`/posts/${post.id}`} className='btn btn-outline'> Ler</Link>
        </div>
    </div>
  )
}
