import { useDispatch } from 'react-redux'
import Card from '@mui/material/Card'
import {
	Button,
	CardActionArea,
	CardActions,
	Box,
	Typography,
} from '@mui/material'
import { withRouter } from 'react-router'
import { addToCart } from '../actions/cartActions'

function Product({ product, history }) {
	const { hex } = product
	const dispatch = useDispatch()
	function handleAddClick() {
		dispatch(addToCart(product, 1))
		console.log('dispatched')
	}
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea sx={{ minHeight: 130, bgcolor: hex }}></CardActionArea>
			<Typography gutterBottom variant='h6' component='div' marginLeft='10px'>
				{product.name}
			</Typography>
			<CardActions>
				<Box style={{ flexGrow: 1 }}>
					<Button size='small' color='primary'>
						${product.price}
					</Button>
				</Box>
				<Box>
					<Button
						size='small'
						color='primary'
						variant='outlined'
						onClick={handleAddClick}
					>
						Add
					</Button>
				</Box>
			</CardActions>
		</Card>
	)
}

export default withRouter(Product)
