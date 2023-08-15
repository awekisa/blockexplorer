import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatTimestamp, timestampToDate } from '../scripts/utils';
import { Link } from 'react-router-dom';

export default function BlockView({alchemy}) {
    const search = useParams()['search'];
    const [block, setBlock] = useState();

    useEffect(() => {
        async function getBlock() {
            let parsedSearch = search;
            if (!search.startsWith('0x')) {
                parsedSearch = parseInt(search);

                if (!parsedSearch) {
                    throw new Error('Invalid input');
                }
            }

            const bl = await alchemy.core.getBlockWithTransactions(parsedSearch);
            setBlock(bl);
        }

        getBlock();
    }, []);
    
    return (
        <div>
            <div className="p-4 sm:px-0">
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Block #{block?.number}</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Timestamp</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block && formatTimestamp(block.timestamp)} - {block && timestampToDate(block.timestamp)}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Hash</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block?.hash}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Miner</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block?.miner}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Parent Hash</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block?.parentHash}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Nonce</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block?.nonce}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Transactions</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><Link className="text-red-600" to='/transactions' transactions={block?.transactions}>{block?.transactions.length} Transactions</Link></dd>
                </div>
                </dl>
            </div>
        </div>
    );
}