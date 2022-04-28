import React from 'react';

export default function ErrorsDisplay ({ errors }:{ errors: string[] }) {
    let errorsDisplay: JSX.Element | null = null;

    if (errors.length > 0) {
        errorsDisplay = (
            <div className="error--container">
                <ul className="error--list">
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>
        );
    }

    return errorsDisplay;
}
