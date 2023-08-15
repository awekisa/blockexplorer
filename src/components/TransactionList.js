import { Utils } from 'alchemy-sdk';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

import { truncateString } from '../scripts/utils';

export default function TransactionList({transactions, page, setPage}) {
    let pages = Math.ceil(transactions?.length / 10);

    return (
        <div>
            <table className="w-full min-w-max table-auto text-left">
                <thead >
                    <tr>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Hash</th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">From</th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">To</th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Value</th>
                    </tr>
                </thead>
                <tbody>
                    { transactions && transactions
                        .slice((page-1)*10, page*10)
                        .map((txn) => (
                            <tr key={txn.hash}>
                                <td className="p-4 border-b border-blue-gray-50">
                                <Link className="text-red-600" to={`/transactions/${txn.hash}`} >
                                    {txn.hash}
                                </Link></td>
                                <td className="p-4 border-b border-blue-gray-50">{truncateString(txn.from, 20)}</td>
                                <td className="p-4 border-b border-blue-gray-50">{truncateString(txn.to, 20)}</td>
                                <td className="p-4 border-b border-blue-gray-50">{Utils.formatUnits(txn.value)} ETH</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <Pagination pages={pages} totalResults={transactions?.length} page={page} setPage={setPage} />
        </div>        
    )
}