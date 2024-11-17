import { getVmInfo } from './get_vm_info.js';
import { lineFind, padStuff } from './utilities.js';

// Parse the necessary lines for vminfo, for a single VM
const parseVmInfo = async (vm) => {
	try {
		const vmstats = await getVmInfo(vm);

		const regexp1 = /[^:]+:?\s+(.+)/g;
		const regexp2 = /T([0-9]{2}:[0-9]{2}):[0-9]+\.[0-9]+/g;

		// Find the stat lines from vboxmanage showvminfo, and parse the value
		let vmstat_memory=lineFind(vmstats,'Memory size').replace(regexp1, "$1");
		let vmstat_cpus=lineFind(vmstats,'Number of CPUs').replace(regexp1, "$1");
		let vmstat_state=lineFind(vmstats,'State').replace(regexp1, "$1").replace(regexp2, " $1").replace(/since /g, '');
		let vmstat_vrde=lineFind(vmstats,'VRDE port').replace(regexp1, "$1");
		let vmstat_ostype=lineFind(vmstats,'OS type').replace(regexp1, "$1");

		// Pad value with spaces to build column layout for the terminal
		let vm_pad=padStuff(vm.length, 17);
		let vmstat_memory_pad=padStuff(vmstat_memory.length, 7);
		let vmstat_cpus_pad=padStuff(vmstat_cpus.length, 1);
		let vmstat_state_pad=padStuff(vmstat_state.length, 30);
		let vmstat_vrde_pad=padStuff(vmstat_vrde.length, 3);
		let vmstat_ostype_pad=padStuff(vmstat_ostype.length, 11);

		// Write to terminal
		console.log(
			vm, vm_pad,
			vmstat_memory, vmstat_memory_pad,
			vmstat_cpus, vmstat_cpus_pad,
			vmstat_state, vmstat_state_pad,
			vmstat_vrde, vmstat_vrde_pad,
			vmstat_ostype, vmstat_ostype_pad
		);
	} catch (error) {
		console.error('Error getting virtual machine info:', error)
	}
}

export { parseVmInfo };
