/* @refresh reload */
import './entry.css';
import { render } from '@solidjs/web';
// import 'solid-devtools';
import { Router } from './router';

render(() => <Router/>, document.getElementById('root')!);
