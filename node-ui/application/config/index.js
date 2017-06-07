/*webpack配置*/
'use strict'
const path = require('path');
const config={
	srcDir:path.join(__dirname, '..', 'webapp'),
	buildDir:path.join(__dirname, '..', 'build')
}
module.exports =config;