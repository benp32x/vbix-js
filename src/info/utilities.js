const lineFind = (text, query) => {
	const lines = text.split('\n');
	const found = lines.find(line => line.includes(query));

	if (found === undefined) {
		return '';
	} else {
		return found;
	}
}

const padStuff = (arg1, arg2) => {
	const numSpaces = arg2 - arg1;
	let spaces = '';

	// pad columns
	// http://stackoverflow.com/questions/238073/how-to-add-a-progress-bar-to-a-shell-script
	for (let i = 0; i < numSpaces; i++) {
		spaces += ' ';
	}
	return spaces;
}

export { lineFind, padStuff };
