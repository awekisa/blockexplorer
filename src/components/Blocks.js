import { useState } from 'react';

import BlockList from './BlockList';

export default function Blocks({blocks}) {
    const [page, setPage] = useState(1);

    return (
        <BlockList blocks={blocks} page={page} setPage={setPage} />     
    )
}