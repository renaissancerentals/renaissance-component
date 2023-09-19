import React from "react";

export const PrettyPrintJson: React.FC<PrettyPrintJsonProps> = ({json}) => {
    return (
        <>
            <div>
                <pre>{JSON.stringify(json, null, 2)}</pre>
            </div>
        </>
    );
};

export interface PrettyPrintJsonProps {
    json: any;
}