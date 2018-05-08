import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper';
import styled from 'styled-components'

const Title = styled.div`
  margin: auto;
  margin-bottom: 15px;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`

const style = {
	margin: '35px auto',
	padding: 20,
	width: 'auto',
  maxWidth: 600,
  textAlign: 'left'
}

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
}

function Box ({
 title,
 children
}) {
  return (
    <Paper zDepth={2} style={style}>
      {title && <Title>{title}</Title>}
      {children}
    </Paper>
  )
}

Box.PropTypes = propTypes

export default Box
