import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

import Post from 'components/Post'

import theme from 'UI/theme'
import Textfield from 'UI/Textfield'
import Button from 'UI/Button'

const PostsList = observer( ({posts}) =>  posts.map( (post, index) => <Post key={post.id} post={post} index={index} />))

const StyledTextWrapper = styled.div`
  z-index: 0;
  position: relative;
  padding-bottom: ${theme.interval};
  border-bottom: 1px solid rgba(0,0,0,0.2);
`

const StyledButton = styled(Button)`
  z-index: 1;
  position: absolute;
  right: ${theme.multiInterval(0.25)};
  bottom: ${theme.multiInterval(1.5)};
`

@inject(['feedStore'], ['authStore'])
@observer
export default class Feed extends Component {
  @observable text = ''

  componentDidMount () {
    const { feedStore, authStore } = this.props
    const ownerId = authStore.ownerId
    feedStore.getFeed(ownerId)
  }

  handleWrite = e => {
    this.text = e.currentTarget.value
  }

  handlePost = () => {
    const { feedStore, authStore } = this.props
    if (this.text !== '') {
      feedStore.postPost(authStore.ownerId, this.text)
      this.text = ''
    }
  }

  render() {
    const { feedStore } = this.props

    return (
      <div>
        <StyledTextWrapper>
          <Textfield placeholder='Write our own post here' onChange={this.handleWrite} value={this.text}/>
          <StyledButton basic content='Post' onClick={this.handlePost} />
        </StyledTextWrapper>
        <PostsList posts={feedStore.feed} />
      </div>
    )
  }
}
