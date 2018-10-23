import React, { Component } from 'react'
import styled, { keyframes, css } from 'styled-components'

import theme from 'UI/theme'

const Wrapper = styled.div`
  margin: ${theme.interval} 0;
  position: relative;
`

const StyledInput = styled.input`
  display: block;
  background: transparent;
  border: none;
  width: 100%;
  padding-bottom: ${theme.multiInterval(0.5)} ;
  border-bottom: 1px solid #3b3966;
`

const twist = keyframes`
  0% {transform: translateX(0px)}
  25% {transform: translateX(-8px)}
  75% {transform: translateX(8px)}
  100% {transform: translateX(0px)}
`
const StyledLabel = styled.label`
  display: block;
  position: relative;
  ${props => props.error && css`color: ${theme.red};`}
  ${props => props.error && css`animation: ${twist} 200ms 2 ease-in-out;`}
  font-weight: 500;
`

const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
  bottom: ${theme.multiInterval(0.5)}
`

const Error = styled.span`
  float: right;
  color: ${theme.red};
`

export default class Field extends Component {
  render() {
    const { className=null, label=null, icon=null, error=null, ...props } = this.props
    return (
      <Wrapper >
        {error && <Error>{error}</Error>}
        <StyledLabel error={error}>{label}</StyledLabel>
        <StyledInput className={className} type="text" {...props} />
        {icon && <IconWrapper>{icon}</IconWrapper>}
      </Wrapper>
    )
  }
}
