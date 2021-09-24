import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Redirect } from 'react-router-dom'
import { Button } from '@mui/material'

function CartPage() {
	const userLogin = useSelector((state) => state.userLogin)
	const [checkout, setCheckout] = useState(false)

	const [cartItems, setCartItems] = useState([])
	const items = useSelector((state) => state.cart.cartItems)
	useEffect(() => {
		setCartItems(items)
		console.log(items)
	}, [items])
	const { loading, error, userInfo } = userLogin
	if (!userInfo) {
		return <Redirect push to='/signin'></Redirect>
	}
	if (checkout) {
		return <Redirect to='/checkout'></Redirect>
	}
	let total_price = 0
	return (
		<div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Product</TableCell>
							<TableCell align='center' width='100'>
								Image
							</TableCell>
							<TableCell align='right'>Price</TableCell>
							<TableCell align='right'>Quantity</TableCell>
							<TableCell align='right'>Total ($)</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.length > 0 &&
							items.map((row, idx) => {
								total_price += row.price * row.qnt
								return (
									<TableRow
										key={idx}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component='th' scope='row'>
											{row.name}
										</TableCell>
										<TableCell align='right' bgcolor={row.hex}></TableCell>
										<TableCell align='right'>{row.price}</TableCell>
										<TableCell align='right'>{row.qnt}</TableCell>
										<TableCell align='right'>{row.price * row.qnt}</TableCell>
									</TableRow>
								)
							})}
						<TableRow
							key='total'
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component='th' scope='row'>
								<b>Total</b>
							</TableCell>
							<TableCell align='right'></TableCell>
							<TableCell align='right'></TableCell>
							<TableCell align='right'></TableCell>
							<TableCell align='right'>
								<b>${total_price}</b>
							</TableCell>
						</TableRow>
						<TableRow
							key='checkout'
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component='th' scope='row'></TableCell>
							<TableCell align='right'></TableCell>
							<TableCell align='right'></TableCell>
							<TableCell align='right'></TableCell>
							<TableCell align='right'>
								<Button
									variant='contained'
									onClick={() => {
										setCheckout(true)
									}}
								>
									Checkout
								</Button>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default CartPage
