import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import { formatTimestamp, truncateString } from '../scripts/utils';


export default function BlockList({blocks, page, setPage }) {
    let pages = Math.ceil(blocks?.length / 10);

    return (
        <div>
            <table className="w-full min-w-max table-auto text-left">
                <thead >
                    <tr key='1' className=''>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Block Number</th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Since</th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Fee Recipient</th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Txn Count</th>
                    </tr>
                </thead>
                <tbody>
                    { blocks && blocks
                        .slice((page-1)*10, page*10)
                        .map((block) => (
                            <tr key={block.number}>
                            <td className="p-4 border-b border-blue-gray-50">
                            <Link className="text-red-600" to={`/blocks/${block.number}`} value={block} >
                                {block.number}
                            </Link></td>
                            <td className="p-4 border-b border-blue-gray-50">{formatTimestamp(block.timestamp)}</td>
                            <td className="p-4 border-b border-blue-gray-50">{truncateString(block.miner, 15)}</td>
                            <td className="p-4 border-b border-blue-gray-50">{block?.transactions?.length}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <Pagination pages={pages} totalResults={blocks?.length} page={page} setPage={setPage} />
        </div>
      )
}