import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import Menu from 'components/Menu'
import Header from 'components/Header'

import theme from 'UI/theme'

const Main = styled.div`
  transition: all 200ms ease-in-out;
  opacity: ${props => props.loaded ? '1' : '0.01'};
  transform: translateX(${props => props.loaded ? '0' : '-25px'});
  display: flex;
`

const SideMenu = styled.div`
  flex: 0 0 auto;
`

const Content = styled.div`
  flex: 1 1 auto;
  margin-left: ${theme.interval};
`

@observer
class Layout extends Component {

  // We should write HOC withLoaded
  state={loaded: false}
  componentDidMount () {
    setTimeout(()=>this.setState({loaded: true}), 0)
  }

  render() {
    return (
      <Main loaded={this.state.loaded}>
        <SideMenu>
          <Menu />
        </SideMenu>
        <Content>
          <Header />
          {this.props.children}
        </Content>
      </Main>
    )
  }
}

export default Layout
