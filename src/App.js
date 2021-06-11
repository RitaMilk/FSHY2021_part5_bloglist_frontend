import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

//part 5.2 logout button
const ButtonLogout=(props)=>{
  console.log("I am logout button")
  console.log(`I am ${props.textB} button`)
  return(
        <button onClick={props.onClickEv } > {props.textB} </button>
  )
}
//
const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newBlog, setNewBlog] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)  
  const [typeMessage, setTypeMessage] = useState("positive") 

    const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      //part 5.2 login stay until logout
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      //part 5.2
      //part 5.3
      blogService.setToken(user.token)
      //part 5.3
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //console.login("Login epäonnistui!")
      setErrorMessage('Wrong credentials')
      setInfoMessage('Wrong credentials')
      setTypeMessage("error")
      setTimeout(() => {
        setErrorMessage(null)
        setInfoMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  //part 5.2 have to check local Storage when page is reloaded
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  //part 5.2
  //part 5.3 add new Blog with authorization
  const addBlog = (event) => {
    blogFormRef.current.toggleVisibility()
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    console.log("addBlog comp ja blogObject=",blogObject)
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        //setNewBlog('')
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setTypeMessage("positive")
        setInfoMessage("new blog is added")
      })
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
  }
  
const loginForm = () => (
  //<Togglable buttonLabel="log in">
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  //</Togglable>
)
 //part 5.1
 //part 5.5 togglable blogForm
 const blogFormRef = useRef()
 const blogForm = () => (
  <Togglable buttonLabel='add blog' ref={blogFormRef}>
    <BlogForm
      onSubmit={addBlog}
      newTitle={newTitle}
      newAuthor={newAuthor}
      newUrl={newUrl}
      handleTitleChange={({ target }) => setNewTitle(target.value)}
      handleAuthorChange={({ target }) => setNewAuthor(target.value)}
      handleUrlChange={({ target }) => setNewUrl(target.value)}
      
    />
  </Togglable>
)
 //part 5.2 handle click of logOut button
 const handleClick=()=>{
  console.log("...handlinh logout button click:")
  window.localStorage.removeItem('loggedBlogappUser')
   setUser(null)
}
 //part 5.2
return (
    <div>
      <h1>Blogs</h1>
      <Notification message={infoMessage} typeM={typeMessage}/>
      {user === null ?
        loginForm() :
        
        <div>
            <p>{user.name} logged-in 
                <ButtonLogout onClickEv={handleClick} textB={'logout'} />
            </p>
            { blogForm()}
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
        </div>
      }
    </div>
)
}

export default App