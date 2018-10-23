import React, { Component } from 'react'
import styled from 'styled-components'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import Price from 'components/Price'

import Img from 'UI/Img'

const StyledCard = styled.div`
  flex: 0 0 182px;
  background: white;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  min-height: 350px;
  margin: 0 ${props => props.theme.interval()} ${props => props.theme.interval()} 0;
  transition: all 500ms ease-in-out;
  opacity: ${props => props.loaded ? 1 : 0.01};
  transform: translateY(${props => props.loaded ? 0 : '25px'});
`

const CardContent = styled.div`
  padding: ${props => props.theme.interval};
  > div {
    margin-bottom: ${props => props.theme.interval};
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const CardTitle = styled.div`
  color: #555;
  font-weight: bold;
`

@observer
export default class Card extends Component {
  @observable loaded = false

  @action setLoaded = () => {
    this.loaded = true
  }

  componentDidMount () {
    const { index } = this.props
    setTimeout(this.setLoaded, ((index||0)*50))
  }

  render() {
    const { product } = this.props

    return (
      <StyledCard loaded={this.loaded} >
        <Img productId={product.erp_id} widht={182} height={182} />
        <CardContent>
          <CardTitle>{product.name}</CardTitle>
          <Price price={product.price} />
        </CardContent>
        {this.props.children}
      </StyledCard>
    )
  }
}
