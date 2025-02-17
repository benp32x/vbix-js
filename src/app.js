import { listCreatedVms } from './info/arr_created.js';
import { parseVmInfo } from './info/parse_vm_info.js';

// ----------------------------------------------------------------------------
// FLAGS:
// ----------------------------------------------------------------------------

// NOTE: yargs or commander can be used for more complex flag parsing
const args = process.argv.slice(2);

let hopt = 0;
let copt = 0;
let iopt = 0;
let mopt = 0;

args.forEach(arg => {
	switch (arg) {
		case '-h':
			hopt = 1;
			break;
		case '-c':
			copt = 1;
			break;
		case '-i':
			iopt = 1;
			break;
		case '-m':
			mopt = 1;
			break;
		default:
			console.log(`Unknown flag: ${arg}`)
	}
});

// ----------------------------------------------------------------------------
// EXECUTE:
// ----------------------------------------------------------------------------

// Helo:
if (hopt) {
	console.log("-h, help mode still under development")
}

// Info:
if (iopt) {
	/*
	 * NOTE: Ensuring squential operation here does limit performance (but not 
	 *       the user experience, given the single user use-case of vbix).
	 * 
	 * TODO: The initial goal for the info view:
	 * 
	 *       1.) replicate vbix's functionality
	 *       2.) try to lay the foundation for async operations as much as possible
	 *       3.) gradually evolve the code at each touchpoint to further align 
	 *           with the strengths of js (as opposed to simply cramming a BASH-centric 
	 *           way of doing things into javascript.)
	 */

	console.log('VM INFORMATION');

	console.log('--------------------------------------------------------------------------------');
	console.log('NAME               RAM     CPU STATE                           RDP   OSTYPE     ');
	console.log('--------------------------------------------------------------------------------');

	listCreatedVms
		.then(async (arrCreated) => {
			if (Array.isArray(arrCreated)) {
				// Sequentially process each item in the array to ensure ordered output
				for (const vm of arrCreated) {
					// Ensure that parseVmInfo completes before moving to the next
					await parseVmInfo(vm); 
				}
			} else {
				console.error('Error: arrCreated is not an array.');
			}
		})
		.catch((err) => {
			console.error('Error:', err.message);
		});
}

// Create:
if (copt) {
	console.log("-c, creation mode still under development")
}

// Manage:
if (mopt) {
	console.log("-m, manage mode still under development")
}
