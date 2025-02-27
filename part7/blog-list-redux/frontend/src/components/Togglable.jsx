import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div style={{ marginBottom: '15px' }}>
      <Box
        style={hideWhenVisible}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <Button variant="contained" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </Box>
      <Box
        style={showWhenVisible}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        {props.children}
        <Button variant="contained" onClick={toggleVisibility}>
          cancel
        </Button>
      </Box>
    </div>
  )
})
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
