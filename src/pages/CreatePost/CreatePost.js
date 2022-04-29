import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument} from '../../hooks/useInsertDocument'

export const CreatePost = () => {
  const [ title , setTitle ] = useState("");
  const [ image , setImage ] = useState("");
  const [ body , setBody ] = useState("");
  const [ tags , setTags ] = useState([]);
  const [ formError , setFormError ] = useState("");
  
  const {user} = useAuthValue('')

  const { insertDocument,response } = useInsertDocument('posts');
  
  const navigate = useNavigate()

  const hundleSubmit = (e) => {
    e.preventDefault();
    setFormError('')
    console.log('antes do try')
    //validate image url
   
     if(image === URL){
       new URL(image)
     }else{
       setFormError('TEM que ser uma url')
     }
    console.log('depois do try ' + image)
    console.log(formError)
    //criar o array de tags 

     const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //checar todos os valores
    
    if(!title || !image || !tags || !body){
      setFormError("Por Favor, preencha todos os campos!")
    }

    if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })
    //redirect to home page
    navigate("/")
    
    

  };
 
  return (
    <div className={styles.create_post}>
      <h1>Crie seus posts</h1>
      <p>Escreva sobreo que você quiser e compartilhar o seu conhecimento!</p>
      <form onSubmit={hundleSubmit}>
        <label>
          <span>Título:</span>
          <input 
          type="text"
          name="title"
          required
          placeholder="Pense num bom título..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          />
        </label>

        <label>
          <span>URL da imagem:</span>
          <input 
          type="text"
          name="image"
          required
          placeholder="Insira uma imagem que representa o seu post"
          onChange={(e) => setImage(e.target.value)}
          value={image}
          />
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea 
          name="body"
          required
          placeholder='Insira o conteuúdo do post'
          onChange={(e) => setBody(e.target.value)}
          value={body}
          ></textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input 
          type="text"
          name="tags"
          required
          placeholder="Insira as tags separadas por vírgulas"
          onChange={(e) => setTags(e.target.value)}
          value={tags}
          />
        </label>
        
        {!response.loading && <button  className='btn'>Cadastrar</button>}
        {response.loading && <button disabled className='btn'>Aguarde...</button>}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}
