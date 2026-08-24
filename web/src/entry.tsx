/* @refresh reload */
import './entry.css';
import { render } from 'solid-js/web';
import 'solid-devtools';
import { RouteDefinition, Router } from '@solidjs/router';
import { lazy } from 'solid-js';

const routes: RouteDefinition[] = [
    {
        path: "/",
        component: lazy(() => import('./routes/index'))
    },
    {
        path: "/auth",
        component: lazy(() => import('./routes/(boarding)/auth'))
    },
    {
        path: "/boarding/associations",
        component: lazy(() => import('./routes/(boarding)/associations'))
    },
    {
        path: "/dash",
		component: window.innerWidth < 768
			? lazy(() => import('./routes/dash/layout-mobile'))
			: lazy(() => import('./routes/dash/layout')),
		children: [
			{
				path: "/discover",
				component: lazy(() => import("./routes/dash/discover/index"))
			},
			{
				path: "/registrations",
				component: lazy(() => import("./routes/dash/registrations/index"))
			},
			{
				path: "/organization",
				component: lazy(() => import("./routes/dash/organization/index"))
			},
			{
				path: "/profil",
				component: lazy(() => import("./routes/dash/profil/index"))
			},
			{
				path: "/*",
				component: lazy(() => import("./routes/dash/index"))
			}
		]
    },
]

render(() => <Router>{routes}</Router>, document.getElementById('root')!);
