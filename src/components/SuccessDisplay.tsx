import React from 'react';

const errorStyles: React.CSSProperties = {
  listStyleType: 'none',
  color: 'green',
  textAlign: 'center',
  fontSize: '1.25rem',
}

export default function SuccessDisplay ({ success }:{ success: string[] }) {
  let errorsDisplay: JSX.Element | null = null;

  if (success.length > 0) {
    errorsDisplay = (
      <div className="error--container">
        <ul className="error--list" style={errorStyles} aria-label="submit-error-container">
          {success.map((item, i) => <li key={i} aria-label="submit-error-item">{item}</li>)}
        </ul>
      </div>
    );
  }

  return errorsDisplay;
}
