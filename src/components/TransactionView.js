
import { Utils } from 'alchemy-sdk';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function TransactionView({alchemy}) {
    const search = useParams()['search'];
    const [transaction, setTransaction] = useState();

    useEffect(() => {
        async function getTransaction() {
            const txn = await alchemy.transact.getTransaction(search);
            setTransaction(txn);
        }

        getTransaction();
    }, []);

    return (
        <div>
            <div className="p-4 sm:px-0">
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Hash #{transaction?.hash}</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Block Number</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction?.blockNumber}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">ChainId</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction?.chainId}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">From</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction?.from}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">To</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction?.to}</dd>
                </div>               
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Value</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction 
                        && Utils.formatUnits(transaction?.value?.toString())} ETH</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Nonce</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction?.nonce}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Gas Limit</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction 
                        && Utils.formatUnits(transaction?.gasLimit?.toString())} ETH</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Gas Price</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction 
                        &&Utils.formatUnits(transaction?.gasPrice?.toString())} ETH</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Max Fee Per Gas</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction 
                        && transaction.maxFeePerGas 
                            ? Utils.formatUnits(transaction?.maxFeePerGas?.toString())
                            : '--'} ETH</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Max Priority Fee Per Gas</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction && 
                        transaction?.maxPriorityFeePerGas 
                            ? Utils.formatUnits(transaction?.maxPriorityFeePerGas?.toString())
                            : '--'} ETH</dd>
                </div>
                </dl>
            </div>
        </div>
    );
}