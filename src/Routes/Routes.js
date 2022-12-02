import React, { lazy } from 'react'
import { APP_VALUES } from '../constants/app'
import { HomeRedirect } from './RouteUtils.js'
const RouteController = lazy(() => import('./RouteController'))
const Page404 = lazy(() => import('../Paginas/NotFound'))
const Login = lazy(() => import('../Login/Login'))
const Dashboard = lazy(() => import('../Paginas/Dashboard'))
const Usuarios = lazy(() => import('../Paginas/Usuarios'))

const routes = [
	{
		path: "/",
		exact: true,
		component: HomeRedirect
	},
	{
		path: "/login",
		exact: true,
		render: props => <Login {...props} />
	},
	{
		path: `/${APP_VALUES.ROOT_ROUTE}`,
		render: props => <RouteController component={Home} {...props} />,
		routes: [
			{
				path: `/${APP_VALUES.ROOT_ROUTE}`,
				exact: true,
				render: props => <RouteController component={Dashboard} {...props} />
			},
			{
				path: `/${APP_VALUES.ROOT_ROUTE}/usuarios`,
				exact: true,
				render: props => <RouteController component={Usuarios} {...props} />
			},
			{
				path: `/${APP_VALUES.ROOT_ROUTE}/*`,
				exact: true,
				render: props => <NotFound {...props} />
			},
		]
	},
	{
		path: '*',
		render: props => <Page404 {...props} />
	}
]

export default routes