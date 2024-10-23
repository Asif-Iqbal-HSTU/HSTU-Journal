import React from 'react';

export default function RedirectButton({ className = '', disabled, ...props}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-0 py-2 text-gray-800 dark:text-gray-200 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:text-gray-700 dark:hover:text-white focus:text-gray-700 dark:focus:text-white active:text-gray-900 dark:active:text-gray-300  transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {/* Long right arrow icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </button>
    );
}
