import { registerPlugin } from '@wordpress/plugins';
import {default as Sidebar, pluginName} from './Sidebar';


registerPlugin( pluginName, { render: Sidebar } );
