//CSS
import styles from "./Home.module.css"
import {useNavigate, Link} from 'react-router-dom'
import { useState } from "react"

// HOOKS
import { useFetchDocuments } from "../../hooks/useFetchDocuments"

//COMPONENTS
import { PostDetail } from "../../components/PostDetail"

export const Home = () => {
  const [query , setQuery ] = useState();
  
 const { documents:posts, loading } = useFetchDocuments('posts')
  
  const handleSubmit = (e) => {
    e.preventDefult()
  
  }
 
  
  return (
    <div className={styles.home}>  
        <form onSubmit={handleSubmit} className={styles.seach_form} >
          <input type="text" placeholder="Ou busque por tags" onChange={(e) => setQuery(e.target.value)} />
          <button className="btn btn-dark">Pesquisar</button>
        </form>
        <div>
          { posts && posts.map((post) => <h3>{post.title}</h3> )}
          {/* <h2>Posts </h2>
          {loading && <p>Carregando....</p>}
          <h1> O total de posts é </h1>
          {documents && documents.map((post) => <h1>{post.title}</h1> )} */}
        {/* {loading && <p>Carregando</p>}   */}
        
        {/* { posts && posts.map((post) => <PostDetail key={post.id} post={post} /> )} */}
          {/* {posts && posts.length === 0 &&(
            <div className={styles.noposts}>
                <p>Não foram encontrados posts</p>
                <Link to="/post/create" className="btn">Criar primeiro post</Link>
            </div>
          )} */}
        </div>
    </div>
  )
}
