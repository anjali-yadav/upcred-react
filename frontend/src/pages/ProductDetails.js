import React from 'react'

function ProductDetails({ history, match }) {
	const id = match.params.id
	console.log(id)
	return (
		<div>
			<h1>{id}</h1>
		</div>
	)
}

export default ProductDetails
