import { useState } from 'react';

export default function SearchBar({setSearch}) {
    const [inputValue, setInputValue] = useState('');

    const handleClick = () => {
        setSearch(inputValue);
        setInputValue('');
    }

    const handleChange = (evt) => {
        evt.preventDefault();
        setInputValue(evt.target.value);
    }

    return (
        <div className="flex flex-col justify-center items-center py-5">
            <div className="flex border border-purple-200 rounded">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search by hash, block number..."
                    onChange={handleChange}
                    value={inputValue}
                />
                <button className="px-4 text-white bg-purple-600 border-l rounded" onClick={handleClick}>
                    Search
                </button>
            </div>
        </div>
    );
}