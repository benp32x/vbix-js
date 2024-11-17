import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const listCreatedVms = (async () => {
	let { stdout } = await execAsync(`vboxmanage list vms -s`);
	stdout = stdout.replace(/\"([^"]+)\"\s\{.+\}/g, '$1').trim().split('\n');
	return stdout;
})();

export { listCreatedVms };