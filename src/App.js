import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'

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

  //part 5.3 addBlog
  /* const handleBlogChange = (event) => {
    console.log(event.target.value)
    setNewBlog(event.target.value)
  } */
  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }
  //part 5.3
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
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

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
  //part 5.3
//part 5.1 two forms: login and addBlog
const loginForm = () => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>Log in to application</h2>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>      
)

 const blogForm = () => (
  <form onSubmit={addBlog}>
    <div>title:
       <input
        value={newTitle}
        onChange={handleTitleChange}
      />
    </div>
    <div>author:
       <input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
    </div>
    <div>url:
       <input
        value={newUrl}
        onChange={handleUrlChange}
      />
    </div>
    {/* <div>
    <input
      value={newBlog}
      onChange={handleBlogChange}
    />
    </div> */}
    <button type="submit">save</button>
  </form>  
)
 //part 5.1

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