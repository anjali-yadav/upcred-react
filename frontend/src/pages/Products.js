import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Product from '../components/Product'
import { Grid } from '@mui/material'
import { colors } from '../colors'

function Products({ history }) {
	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin
	const [products, setProducts] = useState([])

	useEffect(() => {
		let mounted = true
		if (!userInfo) {
			history.push('/signin')
		} else {
			setProducts(colors)
		}
		return function cleanup() {
			mounted = false
		}
	}, [userInfo, history])

	return (
		<div>
			<h1>Products Page</h1>

			<Grid container spacing={3}>
				{products.length > 0 &&
					products.map((product) => (
						<Grid item xs={6} sm={4} md={3} key={product.id}>
							<Product product={product}></Product>
						</Grid>
					))}
			</Grid>
		</div>
	)
}

export default Products
