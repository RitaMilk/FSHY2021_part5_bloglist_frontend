import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('renders content', () => {
  const user={
    username:'Susi'
  }
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Miska',
    likes: 55,
    url:'www.fmi.fi'
  }

  const component = render(
    <Blog blog={blog} loggedUser={user}/>
  )

  component.debug()
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  expect(component.container).toHaveTextContent(
    'Miska'
  )

  expect(component.container).toHaveTextContent(
    'www.fmi.fi'
  )
  const div = component.container.querySelector('.wholeBlogContent')
  expect(div).toHaveTextContent(
    'www.fmi.fi'
  )
  expect(div).toHaveTextContent(
    '55'
  )
  expect(div).not.toBeVisible()
  // method 2
  const element = component.getByText(
    'Blog: Component testing is done with react-testing-library -by- Miska'
  )
  expect(element).toBeDefined()
  expect(element).toBeVisible()

})
test('clicking the button make whole blog visible', () => {
  const user={
    username:'Susi'
  }
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Miska',
    likes: 55,
    url:'www.fmi.fi'
  }

  const component = render(
    <Blog blog={blog} loggedUser={user}/>
  )


  const button = component.getByText('view')

  fireEvent.click(button)

  const div = component.container.querySelector('.wholeBlogContent')
  expect(div).toHaveTextContent(
    'www.fmi.fi'
  )
  expect(div).toHaveTextContent(
    '55'
  )
  expect(div).toBeVisible()
})