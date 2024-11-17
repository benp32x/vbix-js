import { listCreatedVms } from './info/arr_created.js';
import { parseVmInfo } from './info/parse_vm_info.js';

// ----------------------------------------------------------------------------
// FLAGS:
// ----------------------------------------------------------------------------

// NOTE: yargs or commander can be used for more complex flag parsing
const args = process.argv.slice(2);

let hopt = false;
let copt = false;
let iopt = false;
let mopt = false;

args.forEach(arg => {
	switch (arg) {
		case '-h':
			hopt = true;
			break;
		case '-c':
			copt = true;
			break;
		case '-i':
			iopt = true;
			break;
		case '-m':
			mopt = true;
			break;
		default:
			console.log(`Unknown flag: ${arg}`)
	}
});

// ----------------------------------------------------------------------------
// EXECUTE:
// ----------------------------------------------------------------------------

// Info:
if (iopt) {
	/*
	 * NOTE: Ensuring squential operation here does limit performance (but not 
	 *       the user experience, given the single user use-case of vbix).
	 * 
	 * TODO: The current goal is to replicate the functionality of vbix Eventually 
	 *       this data will be handled in a way tp fully leverage Node's I/O and 
	 *       Parallelization features, but for now the goal is:
	 * 
	 *       1.) replicate vbix's functionality
	 *       2.) try to lay the foundation for async operations as much as possible
	 *       3.) gradually evolve the code at each touchpoint to further align 
	 *           with node's strengths (as opposed to simply cramming a BASH-centric 
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
