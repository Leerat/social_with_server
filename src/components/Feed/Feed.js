import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Post from 'components/Post'

const PostsList = observer( ({posts}) =>  posts.map( (post, index) => <Post key={post.id} post={post} index={index} />))

@inject(['feedStore'], ['authStore'])
@observer
export default class Feed extends Component {

  componentDidMount () {
    const { feedStore, authStore } = this.props
    const ownerId = authStore.ownerId
    feedStore.getFeed(ownerId)
  }

  render() {
    const { feedStore } = this.props

    return (
      <div>
        <PostsList posts={feedStore.feed} />
      </div>
    )
  }
}
