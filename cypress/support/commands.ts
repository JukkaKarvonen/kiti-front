Cypress.Commands.add('appVisit', (route: string) => {
  const publicPath: string = Cypress.env('APP_PUBLIC_PATH') || '/'
  const cleanedRoute = route.replace(/^\//, '')
  const base = publicPath.endsWith('/') ? publicPath : publicPath + '/'

  return cy.visit(`${base}${cleanedRoute}`)
})

export {}
