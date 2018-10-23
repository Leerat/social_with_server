import React from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from 'loadable-components'
import { inject, observer } from "mobx-react"

import Container from 'UI/Container'

import Layout from 'components/Layout'
import PrivateArea from 'components/PrivateArea'
import Home from 'components/Home'
import { Login, Register } from 'components/Auth'

const Feed = loadable(() => import(/* webpackChunkName: "Feed" */ 'components/Feed'))
const Users = loadable(() => import(/* webpackChunkName: "Users" */ 'components/Users'))

const Routes = inject('authStore')(observer( ({authStore}) => {
   return (
     <Container>
       <Switch>
         <Route path="/login" component={Login} />
         <Route path="/register" component={Register} />
         <PrivateArea isAuthenticated={authStore.token}>
         {/*<PrivateArea isAuthenticated={true}>*/}
           <Layout>
             <Route exact path="/" component={Home} />
             <Route path="/feed" component={Feed} />
             <Route path="/users" component={Users} />
           </Layout>
         </PrivateArea>
       </Switch>
     </Container>
   )
  })
)

export default Routes
