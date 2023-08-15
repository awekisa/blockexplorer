import { Utils } from 'alchemy-sdk';
import { Link } from 'react-router-dom';
import { formatTimestamp, truncateString } from '../scripts/utils';

export default function({blocks, transactions}) {
    return (
        <div>
            <div className='inline-block mr-10'>
            <h4 className='mb-2 p-5 mt-0 text-xl font-medium leading-tight text-primary'>Blocks</h4>
                <table className="w-full shadow-lg bg-white min-w-max table-auto text-left">
                    <thead >
                        <tr key='1' className=''>
                            <th className="bg-blue-100 border text-left px-8 py-4">Block Number</th>
                            <th className="bg-blue-100 border text-left px-8 py-4">Since</th>
                            <th className="bg-blue-100 border text-left px-8 py-4">Fee Recipient</th>
                        </tr>
                    </thead>
                    <tbody>
                        { blocks && blocks.slice(0, 6).map((block) => (
                                <tr key={block.number}>
                                <td className="border px-8 py-4">
                                <Link className="text-red-600" to={`/blocks/${block.number}`} >
                                    {block.number}
                                </Link></td>
                                <td className="border px-8 py-4">{formatTimestamp(block.timestamp)}</td>
                                <td className="border px-8 py-4">{truncateString(block.miner, 15)}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className='inline-block'>
                <h4 className='mb-2 p-5 mt-0 text-xl font-medium leading-tight text-primary'>Transactions</h4>
                <table className="shadow-lg bg-white">
                    <thead >
                        <tr key='1' className=''>
                            <th className="bg-blue-100 border text-left px-8 py-4">Hash</th>
                            <th className="bg-blue-100 border text-left px-8 py-4">From</th>
                            <th className="bg-blue-100 border text-left px-8 py-4">To</th>
                            <th className="bg-blue-100 border text-left px-8 py-4">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        { transactions && transactions.slice(0, 6).map((txn) => (
                                <tr key={txn.hash}>
                                <td className="border px-8 py-4">
                                <Link className="text-red-600" to={`/transactions/${txn.hash}`} >
                                    {txn.hash}
                                </Link></td>
                                <td className="border px-8 py-4">{truncateString(txn.from, 15)}</td>
                                <td className="border px-8 py-4">{truncateString(txn.to, 15)}</td>
                                <td className="border px-8 py-4">{Utils.formatUnits(txn.value)}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>            
        </div>
    )
}