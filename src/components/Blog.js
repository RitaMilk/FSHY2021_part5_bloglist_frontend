import React, {useState} from 'react' 
import blogService from '../services/blogs'
import Notification from '../components/Notification'
const ButtonShowBlog=(props)=>{
  console.log("I am show blog button")
  console.log(`I am ${props.textB} button`)
  return(
        <button onClick={props.onClickEv } > {props.textB} </button>
  )
}
const Blog = ({blog}) => {
  //const [theBlog, setTheBlog] = useState(blog)
  const [likes, setLikes] = useState(blog.likes)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogContentVisible, setBlogContentVisible] = useState(false)
  const hideWhenVisible = { display: blogContentVisible ? 'none' : '' }
  const showWhenVisible = { display: blogContentVisible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
 /*  useEffect(() => {
    setLikes(likes) 
  }, [blog.likes]) */
  const updateBlog = (event) => {
    
    event.preventDefault()
    const blogObject = {
        user:blog.user.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes:200
    }
    console.log("updateBlog event ja blogObject=",blogObject)
    const changedBlog = { ...blog, likes: likes+1 }
    console.log("updateBlog event ja changedBlog=",changedBlog)
    //setLikes(blogObject.likes)
    
    /*  blogService
      .update(blog.id,blogObject)
      .then(returnedBlog=>{
        console.log("returnedBlog=",returnedBlog)
        setTheBlog(returnedBlog)
      })  */
      blogService
      .update(blog.id,changedBlog)
      .then(returnedBlog => {
        console.log("returnedBlog=",returnedBlog)
        setLikes(returnedBlog.likes)
      //setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Blog  was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })    
      
}
  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible} >
        {/* {blog.title} <ButtonShowBlog>onClickEv={} textB='view'</ButtonShowBlog> */}
        {blog.title}<button onClick={() => setBlogContentVisible(true)}>view</button>
      </div>  
      <div style={showWhenVisible} >
          {blog.title} <button onClick={() => setBlogContentVisible(false)}>hide</button>
          <br></br>{blog.url}
          <br></br> likes {likes} <button onClick={updateBlog}>like</button>
          <br></br>{blog.author}
      </div>
    </div>
)
}
export default Blog