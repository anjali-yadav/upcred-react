import { Redirect, withRouter } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'
import { logout } from '../actions/userActions'
import { Link } from 'react-router-dom'

function Navbar({ history }) {
	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const handleLogout = () => {
		dispatch(logout())
		return <Redirect to='/signin'></Redirect>
	}
	const handleLogin = () => {
		history.push('/signin')
	}
	let count = 0
	// const cartItems = useSelector((state) => state.cart.cartItems)
	// useEffect(() => {
	// 	for (const item in cartItems) {
	// 		count += cartItems[item].qnt
	// 	}
	// }, [cartItems])

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						<Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
							UPCRED
						</Link>
					</Typography>
					{!userInfo ? (
						<Button color='inherit' onClick={handleLogin}>
							Login
						</Button>
					) : (
						<Box display='flex'>
							<Button color='inherit' onClick={handleLogout}>
								Logout
							</Button>
							<Button color='inherit' onClick={() => history.push('/products')}>
								Products
							</Button>
							<Button color='inherit' onClick={() => history.push('/cart')}>
								<Badge badgeContent={count} color='primary'>
									<ShoppingCartIcon />
								</Badge>
							</Button>
						</Box>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}
export default withRouter(Navbar)
