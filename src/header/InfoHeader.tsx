import React from 'react';
import './assets/InfoHeader.css';

export const InfoHeader: React.FC<InfoHeaderProps> = ({children}) => (
    <header className="header-info">
        <div className="container">
            {children}
        </div>
    </header>
);

export interface InfoHeaderProps {
    children: React.ReactNode;
}