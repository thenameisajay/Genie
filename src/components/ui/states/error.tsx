import React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Start of Hacky way to determine if the error message is a location restricted message
const locationErrorMessage = `[GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent: [400 Bad Request] User location is not supported for the API use.`;

const errorMessages: Record<number, string> = {
    400: 'User location is not supported for the API use.',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    503: 'Service Unavailable',
    504: 'An error occurred. Please try again later.',
};

// End of Hacky way to determine if the error message is a location restricted message

export default function ErrorComponent({ message }: { message: string }) {
    console.log('message', message);

    const displayMessage =
        locationErrorMessage.toLocaleLowerCase().trim() ===
        message.toLocaleLowerCase().trim()
            ? errorMessages[400]
            : errorMessages[504];

    return (
        <div className=" mb-2 h-auto  w-64 sm:mx-2 sm:w-auto">
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{displayMessage}</AlertDescription>
            </Alert>
        </div>
    );
}
