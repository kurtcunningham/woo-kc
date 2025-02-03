import * as sassVars from '../sassVars.json';


export default function prefixClassName(className) {
	const prefix = sassVars.classPrefix;
	return prefix + className;
}
