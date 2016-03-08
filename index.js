'use strict';
var shell = require('shelljs');
var fs = require('fs');
var remove = require('remove_index');
var chalk = require('chalk');
var title = [];

function checkForReadme() {
	fs.stat('./README.md', function(err) {
    if (err == null) {
      getBody('./README.md');
    } else if(err.code == 'ENOENT') {
			fs.stat('./readme.md', function(err) {
		    if (err == null) {
		      getBody('./readme.md');
		    } else if(err.code == 'ENOENT') {
		      throw new Error('README could not be found. Cannot edit title of file that doesn\'t exist')
		    } else {
		      console.log('Some other error: ', err.code);
		    }
		  });
    } else {
      console.log('Some other error: ', err.code);
    }
  });
};

function getBody(readme) {
	fs.readFile(readme, 'utf8', function read(err, data) {
    if (err) {
      throw err;  //possibly don't error but add notice in README to copy and paste data in
    }
		data = data.replace('\r\n','\n');
		data = data.split('\n');
		title.push(data[0]);
    data = remove(data, 0);
		buildReadme(data, 1, readme);
  });
};

function buildReadme(data, flag, readme) {
	fs.writeFile(readme, data.join('\n'), { flags: 'w' }, function(error) {
    if (error) {
      console.error(chalk.red('Error writing to README.md'));
      process.exit(1);
    }

		if (flag) {
			console.log(chalk.green('npmprep removed the title of ./README.md !'));
			publish(data, readme);
		} else {
			console.log(chalk.green('npmprep added the title back to ./README.md !'));
		}
  });
};

function publish(data, readme) {
	shell.exec('npm publish');
	data = title.concat(data);
	buildReadme(data, 0, readme);
};


module.exports = function () {
	checkForReadme();
};
