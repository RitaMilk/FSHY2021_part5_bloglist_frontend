/* eslint-disable linebreak-style */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('Login')

  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      // ...Matti Luukkainen logged-in
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      //cy.contains('Wrong credentials')
      cy.get('.error').contains('Wrong credentials')
      cy.get('.blog').contains('Blogs')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('add blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Mike Cypress')
      cy.get('#url').type('https://fullstackopen.com/osa5/end_to_end_testaus#tehtavat-5-17-5-22')
      cy.get('#save-blog-button').click()
      cy.contains('a blog created by cypress')
    })
  })
})


