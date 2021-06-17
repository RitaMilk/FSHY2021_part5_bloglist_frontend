import React, { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  //const [infoMessage, setInfoMessage] = useState(null)
  //const [typeMessage, setTypeMessage] = useState("positive")

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  //part 5.6 addBlog in the BlogForm components
  const addBlog = (event) => {
    //part 5.6 blogFormRef.current.toggleVisibility()
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    console.log('addBlog comp ja blogObject=',blogObject)
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    //setTypeMessage("positive")
    //setInfoMessage("BlogForm: new blog is added")
    /* part 5.6 blogService
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
        }, 5000) */
  }
  //part 5.6
  return(
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
      <button type="submit">save</button>
    </form>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
export default BlogForm