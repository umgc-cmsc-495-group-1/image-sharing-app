import React from 'react';

const errorStyles: React.CSSProperties = {
  listStyleType: 'none',
  color: 'red',
  textAlign: 'center',
  fontSize: '1.25rem',
}

export default function ErrorsDisplay ({ errors }:{ errors: string[] }) {
    let errorsDisplay: JSX.Element | null = null;

    if (errors.length > 0) {
        errorsDisplay = (
            <div className="error--container">
                <ul className="error--list" style={errorStyles}>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>
        );
    }

    return errorsDisplay;
}
