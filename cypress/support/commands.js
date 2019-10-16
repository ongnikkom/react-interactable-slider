const { $ } = Cypress;

// Since our carousel slider occupies nearly the full width of the window
// We can use the width of the window and assume that the carousel will be of that width


/**
 * After retreiving the x(top-left corner point) cordinate,
 * we want to assert that the value of x will be __LESS__ than the window width,
 * making the slide __visible__ to the user
 */
Cypress.Commands.add('isNotInViewport', ($slide) => {
  const right = $(cy.state('window')).width();
  const rect = $slide[0].getBoundingClientRect();
  expect(rect.x).to.be.greaterThan(right) 
})


/**
 * After retreiving the x(top-left corner point) cordinate,
 * we want to assert that the value of x will be __MORE__ than the window width,
 * making the slide __not visible__ to the user
 */
Cypress.Commands.add('isInViewport', ($slide) => {
  const right = $(cy.state('window')).width();
  const rect = $slide[0].getBoundingClientRect();
  expect(rect.x).to.be.lessThan(right) 
});
