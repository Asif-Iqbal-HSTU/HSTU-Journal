import React, { useState } from 'react';

const KeywordField = () => {
    const [keywords, setKeywords] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Add keyword to the list
    const handleAddKeyword = () => {
        if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
            setKeywords([...keywords, inputValue.trim()]);
            setInputValue(''); // Clear input field
        }
    };

    // Remove keyword from the list
    const handleRemoveKeyword = (keyword) => {
        setKeywords(keywords.filter((kw) => kw !== keyword));
    };

    return (
        <div className="p-4 border rounded bg-gray-50 dark:bg-gray-800">
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Keywords
            </label>
            <div className="flex mt-2">
                <input
                    type="text"
                    id="keywords"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a keyword"
                    className="border rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                >
                    Add
                </button>
            </div>

            {/* Keywords Display */}
            <div className="mt-4 flex flex-wrap">
                {keywords.map((keyword, index) => (
                    <span
                        key={index}
                        className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 dark:bg-gray-600 dark:text-gray-100"
                    >
                        {keyword}
                        <button
                            type="button"
                            onClick={() => handleRemoveKeyword(keyword)}
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default KeywordField;
