import Navbar from './components/Navbar'
import SignIn from './pages/SignIn'
import HomePage from './pages/HomePage'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'
import { Container } from '@mui/material'
import CheckoutPage from './pages/CheckoutPage'

function App() {
	return (
		<Router>
			<Navbar></Navbar>
			<main className='my-3' margin='10px auto'>
				<Container>
					<Route exact path='/signin' component={SignIn}></Route>
					<Route exact path='/products' component={Products}></Route>
					{/* <Route path="register" component={RegisterPage}></Route>
					<Route path="/profile" component={ProfilePage}></Route>
					<Route path="/cart/:id?" component={CartPage} exact></Route> */}
					<Route path='/checkout' component={CheckoutPage}></Route>
					<Route path='/cart' component={CartPage}></Route>
					<Route path='/products/:id' component={ProductDetails}></Route>
					<Route exact path='/' component={HomePage}></Route>
				</Container>
			</main>
			{/* <Footer></Footer> */}
		</Router>
	)
}

export default App
