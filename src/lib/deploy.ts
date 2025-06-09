// import { ethers } from "ethers";
// import abi from "./WarisanDigitalABI.json"; // ABI hasil export
// import bytecodeJson from "./WarisanDigitalBytecode.json"; // Bytecode hasil export

// export async function deployWarisanDigital(
//   signer: ethers.Signer,
//   notaris: string,
//   saksi: string,
//   tokenAddress: string,
//   jumlahToken: BigInt,
//   waktuBuka: number
// ) {
//     const bytecode = bytecodeJson.bytecode;
//     const factory = new ethers.ContractFactory(abi, bytecode, signer);
//     const contract = await factory.deploy(notaris, saksi, tokenAddress, jumlahToken, waktuBuka);
//      await contract.waitForDeployment();
//     return contract.getAddress();
// }

import { ContractFactory } from 'ethers';
import WarisanDigitalAbi from './WarisanDigitalABI.json';
import WarisanDigitalBytecode from './WarisanDigitalBytecode.json';

export const deployWarisanDigital = async (
  signer: any,
  notaris: string,
  saksi: string,
  tokenAddress: string,
  jumlahToken: bigint,
  waktuBuka: number
) => {
    const bytecode = WarisanDigitalBytecode.bytecode;
    const factory = new ContractFactory(WarisanDigitalAbi, bytecode, signer);
    const contract = await factory.deploy(notaris, saksi, tokenAddress, jumlahToken, waktuBuka);
    await contract.waitForDeployment();
    return contract.target as string;
};
