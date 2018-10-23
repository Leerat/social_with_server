import { observable, action } from 'mobx'

import fetcher from 'utils/fetcher'

class FeedStore {
  @observable feed = []

  //We can chain this with reaction to ownedId change but...
  @action
  getFeed = async id => {
    const resp = await fetcher.get(`/api/posts/feed/${id}`)
    const json = await resp.json()

    this.feed = json.data
  }

  @action
  postPost = async (ownerId, text) => {
    const body = {
      author: ownerId,
      text: text
    }
    const resp = await fetcher.post(`/api/posts/`, body)
    const json = await resp.json()

    this.feed.unshift(json.data)
  }
}

export let feedStore = new FeedStore()
