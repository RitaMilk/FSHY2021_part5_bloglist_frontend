import React, { useState } from 'react'
import blogService from '../services/blogs'
//eslint import Notification from '../components/Notification'
/* const ButtonShowBlog=(props)=>{
  console.log("I am show blog button")
  console.log(`I am ${props.textB} button`)
  return(
        <button onClick={props.onClickEv } > {props.textB} </button>
  )
} */
const Blog = ({ blog,
  loggedUser
}) => {
  //const [theBlog, setTheBlog] = useState(blog)
  const [likes, setLikes] = useState(blog.likes)
  //eslintconst [blogUserName, setBlogUserName] = useState(blog.user)
  // eslint-disable-next-line no-unused-vars
  const [infoMessage, setInfoMessage] = useState(null)
  const [blogContentVisible, setBlogContentVisible] = useState(false)
  const hideWhenVisible = { display: blogContentVisible ? 'none' : '' }
  const showWhenVisible = { display: blogContentVisible ? '' : 'none' }
  //
  const toggleBlogContentVisible=() => {
    setBlogContentVisible(!blogContentVisible)
  }
  //const [buttonVisible, setButtonVisible] = useState(blog.user.id===loggedUser.name?true:false)
  //eslintconst [buttonVisible, setButtonVisible] = useState(true)
  //eslintconst showButtonWhenLoggedUser = { display: buttonVisible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  /*  useEffect(() => {
    setBlogUserName(blog.user.id)
  }, [])  */
  const updateBlog = (event) => {

    event.preventDefault()
    const blogObject = {
      user:blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes:200
    }
    console.log('updateBlog event ja blogObject=',blogObject)
    const changedBlog = { ...blog, likes: likes+1 }
    console.log('updateBlog event ja changedBlog=',changedBlog)
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
        console.log('returnedBlog=',returnedBlog)
        setLikes(returnedBlog.likes)
      //setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setInfoMessage(
          `Blog  was already removed from server ${error}`
        )
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
      })

  }
  //console.log('Bloc comp')
  //console.log('blog.likes=',blog.likes)
  //console.log('infoMessage=',infoMessage)
  //console.log('blog.user=',blog.user.id)
  return(
    <div style={blogStyle} className='blog'>
      <br></br>loggedUser is {loggedUser.username}

      <div style={hideWhenVisible} >

        {/* Blog: {blog.title} -by- {blog.author} <button onClick={() => setBlogContentVisible(true)}>view</button> */}
        Blog: {blog.title} -by- {blog.author} <button onClick={toggleBlogContentVisible}>view</button>
      </div>
      <div style={showWhenVisible} className='wholeBlogContent' >
        {/* {blog.title} <button onClick={() => setBlogContentVisible(false)}>hide</button> */}
        {blog.title} <button onClick={toggleBlogContentVisible}>hide</button>
        <br></br>{blog.url}
        <br></br> likes {likes} <button onClick={updateBlog}>like</button>

        <br></br>{blog.author}
        {/* <br></br>{blog.user.id} */}
        {/*  <br></br>{blogUserName._id} */}
      </div>
    </div>
  )
}
export default Blog