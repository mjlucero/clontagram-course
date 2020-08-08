import React from 'react';

export default function Main({ children, center }) {
    let clases = `Main ${center ? 'Main--center' : ''}`;

    return <main className={clases}>{children}</main>;
}