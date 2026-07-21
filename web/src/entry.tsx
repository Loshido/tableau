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
        component: lazy(() => import('./routes/auth'))
    },
    {
        path: "/punch",
        component: lazy(() => import('./routes/punch'))
    },
]

render(() => <>
    <header class="py-4 px-4 md:px-8 lg:px-[5vw] xl:px-[23vw]
        uppercase text-xs font-mono font-semibold bg-papier text-ink">
        <p class="text-orange">
            Debug
        </p>
        <nav class="flex flex-row items-center gap-2 -mx-1">
            <a href="/" class="relative before:absolute before:bottom-0 before:left-0 before:w-full 
                before:h-0 hover:before:h-full before:bg-orange px-1 py-0.5 hover:font-semibold transition-[font-weight]
                hover:before:text-ink before:transition-[height] before:-z-10 z-10">
                Index
            </a>
            <a href="/auth" class="relative before:absolute before:bottom-0 before:left-0 before:w-full 
                before:h-0 hover:before:h-full before:bg-orange px-1 py-0.5 hover:font-semibold transition-[font-weight]
                hover:before:text-ink before:transition-[height] before:-z-10 z-10">
                Auth
            </a>
            <a href="/punch" class="relative before:absolute before:bottom-0 before:left-0 before:w-full 
                before:h-0 hover:before:h-full before:bg-orange px-1 py-0.5 hover:font-semibold transition-[font-weight]
                hover:before:text-ink before:transition-[height] before:-z-10 z-10">
                Punch
            </a>
        </nav>
    </header>
    <Router>{routes}</Router>
</>, document.getElementById('root')!);