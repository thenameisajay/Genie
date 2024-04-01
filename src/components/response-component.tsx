import { RocketIcon } from '@radix-ui/react-icons';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ResponseComponent({ response }: { response: string }) {
    return (
        <>
            <Alert className=" mb-2 h-auto  w-64 sm:mx-2 sm:w-auto">
                <RocketIcon className="h-4 w-4 " />
                <AlertTitle>Response!</AlertTitle>
                <AlertDescription className="text-balance">
                    {response}
                </AlertDescription>
            </Alert>
        </>
    );
}
