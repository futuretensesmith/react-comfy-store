import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// below we are pointing at directory and not specific components
import { Navbar, Sidebar, Footer } from './components'
import { Home, Products, SingleProduct, About, Cart, Error, Checkout, PrivateRoute, AuthWrapper } from './pages'

import styled from 'styled-components'


function App() {
  return <AuthWrapper>
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route exact path='/products/:id' children={<SingleProduct />} />

        <PrivateRoute exact path='/checkout'>
          {/* Checkout is the child. We are restricting access to Checkout until the myUser logs in */}
          <Checkout />
        </PrivateRoute>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  </AuthWrapper>
}






















// **************** STYLED COMPONENTS *****************************
// don't have to set up separate react component
// use an arbitrary name to apply styled components to desired element 
// const Button = styled.button or styled.div or styled.article etc...
// uses JS feature of `` backticks. tag template literals. pass in css to apply to element
// you can reuse className with unique values and without name collisions if it is in a different styled component
// const Button = styled.button`
// background: green;
// color: white;
// `

// const Container = styled.div`
// background: red;
// color: white;
// font-size: 2rem;
// .hero {
//   font-size: 8rem;
// }
// `

// function App() {
//   return <div>
//     <h4>comfy sloth starter</h4>
//     <Button>click me</Button>
//     <Container>
//       <div>
//         <h3>hello world</h3>
//       </div>
//       <div className='hero'>hero text</div>
//     </Container>
//   </div>
// }
// *******************************************************
export default App
