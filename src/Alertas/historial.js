import React, { useState, useEffect, forwardRef } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

// se muestra solo cuando el identificador del mensaje cambia
const Alertas = props => {
	const { message } = props
	const [open, setOpen] = useState(false)

	const handleClose = (event, reason) => {
		if (reason === 'clickaway')
			return
		setOpen(false)
	}

	const Alert = forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={10} ref={ref} variant="filled" {...props} />
	})

	useEffect(() => {
		if (message.ident)
			setOpen(true)
	}, [message])

	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top',
		horizontal: 'center', }}>
			<Alert onClose={handleClose} severity={message.type} sx={{ width: '300%' }}>
				{message.message}
			</Alert>
		</Snackbar>
	)
}

export default Alertas