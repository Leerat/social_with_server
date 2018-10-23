import React from 'react'
import { render } from 'react-dom'
import { Provider as MobxProvider } from 'mobx-react'
import { Provider as ReduxProvider } from 'react-redux'
import 'externals/normalize.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faNewspaper, faUserFriends, faEye } from '@fortawesome/pro-light-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faNewspaper, faUserFriends, faGithub, faEye)

import App from 'App'
import storeMobx from 'storeMobx'
import storeRedux from 'storeRedux'

render(
  <ReduxProvider store={storeRedux }>
    <MobxProvider {...storeMobx}>
      <App />
    </MobxProvider>
  </ReduxProvider>,
  document.getElementById('root')
)
