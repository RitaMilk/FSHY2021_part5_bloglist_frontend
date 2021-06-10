import React from 'react'

const BlogForm = ({
    onSubmit,
    newTitle,
    newAuthor,
    newUrl,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange
    }) => (
    <form onSubmit={onSubmit}>
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
  export default BlogForm