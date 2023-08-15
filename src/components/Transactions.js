import { useState } from 'react';
import TransactionList from './TransactionList';

export default function Transactions({transactions}) {
    const [page, setPage] = useState(1);

    return (
        <TransactionList transactions={transactions} page={page} setPage={setPage} />
    )
}