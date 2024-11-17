import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const getVmInfo = async (vm) => {
	const { stdout } = await execAsync(`vboxmanage showvminfo ${vm}`);
	return stdout;
};

export { getVmInfo };