import React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Start of Hacky way to determine if the error message is a location restricted message
const locationErrorMessage = `[GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent: [400 Bad Request] User location is not supported for the API use.`;

const apiKeyInValidMessage = `[GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent: [400 Bad Request] API key not valid. Please pass a valid API key. [{"@type":"type.googleapis.com/google.rpc.ErrorInfo","reason":"API_KEY_INVALID","domain":"googleapis.com","metadata":{"service":"generativelanguage.googleapis.com"}}]`;

const errorMessages: Record<number, string> = {
    1: 'User location is not supported for the API use.',
    2: 'API key not valid. Please pass a valid API key.',
    3: 'Forbidden',
    4: 'Not Found',
    5: 'Internal Server Error',
    6: 'Service Unavailable',
    7: 'An error occurred. Please try again later.',
};

const errorMatcher = (message: string) => {
    let errorNumber = 7;

    if (message.includes(locationErrorMessage)) {
        errorNumber = 1;
    } else if (message.includes(apiKeyInValidMessage)) {
        errorNumber = 2;
    }
    return errorNumber;
};

// End of Hacky way to determine if the error message is a location restricted message

export default function ErrorComponent({ message }: { message: string }) {
    const displayMessage = errorMessages[errorMatcher(message)];

    return (
        <div className=" mb-2 h-auto  w-64 sm:mx-2 sm:w-auto">
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{displayMessage}</AlertDescription>
            </Alert>
        </div>
    );
}
