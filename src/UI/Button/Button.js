import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import theme from 'UI/theme'

const StyledButton = styled.button`
  transition: all 500ms ease-in-out;
  background: ${props => props.basic ? 'transparent': 'linear-gradient(135deg, #9550fa 0%,#d44cd6 100%)'};
  border: ${props => props.basic ? `2px solid rgba(80,99,156,0.6)`: '0'};
  color: ${({basic, color}) => basic ? (color ? theme[color] : theme.dark): 'white'};
  padding: ${theme.multiInterval(0.5)} ${theme.multiInterval(2)};
  border-radius: ${theme.multiInterval(2)};
  font-weight: 600;
  cursor: pointer;
  opacity: 0.8;
`

const Button = observer(props => <StyledButton {...props}>{props.children || props.content}</StyledButton>)
export default Button
