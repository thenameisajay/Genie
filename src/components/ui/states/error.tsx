import React from 'react';

export default function ErrorComponent({ message }: { message: string }) {
    return (
        <div>
            <h3 className="text-red-500">Something went wrong !!!</h3>
            <p>{message}</p>
        </div>
    );
}
