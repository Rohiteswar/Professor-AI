import React, { useState, useEffect } from 'react';

export enum AlertType {
    danger = 'danger',
    success = 'success',
    warning = 'warning',
    info = 'info',
    dark = 'dark'
}

interface AlertProps {
    type: AlertType;
    message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const alertClassNames: { [key in AlertType]: string } = {
        [AlertType.info]: 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
        [AlertType.danger]: 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400',
        [AlertType.success]: 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400',
        [AlertType.warning]: 'text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300',
        [AlertType.dark]: 'text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300',
    };

    const alertClassName = `fixed top-28 left-1/2 transform -translate-x-1/2 z-50 w-80 p-4 mb-4 text-sm rounded-lg ${alertClassNames[type]}`

    return (
        <>
            {isVisible && (
                <div className={alertClassName} role="alert">
                    <span className="sr-only">{type} Alert</span>
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    {message}
                </div>
            )}
        </>
    );
}

export default Alert;
