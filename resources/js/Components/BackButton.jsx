import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function RedirectButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-3 py-2 text-gray-800 dark:text-gray-200 border border-transparent rounded-md font-semibold text-sm tracking-wide hover:text-gray-700 dark:hover:text-white focus:text-gray-700 dark:focus:text-white active:text-gray-900 dark:active:text-gray-300 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            {children}
        </button>
    );
}
