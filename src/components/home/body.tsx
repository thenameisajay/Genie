'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { run } from '@/app/api/gemini';
import { fileToGenerativePart } from '@/lib/actions';
import { ArrowBendDownLeft, ArrowCircleUp } from '@phosphor-icons/react';

import Footer from '@/components/home/footer';
import Notes from '@/components/home/notes';
import ResponseComponent from '@/components/response-component';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ErrorComponent from '@/components/ui/states/error';
import LoadingComponent from '@/components/ui/states/loading';
import { Textarea } from '@/components/ui/textarea';

//TODO : Use react hook form for forms and useHooks for local storage

export default function Body() {
    const [textValue, setTextValue] = useState<string>('');
    const [imageParts, setImageParts] = useState<Array<object>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [apikeys, setApikeys] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [maxToken, setMaxToken] = useState<number>(0);
    const [generationConfig, setGenerationConfig] = useState<object>({});

    const handleButtonClick = () => {
        const fileInput = document.getElementById('picture');
        fileInput?.click();
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setResponse('');
        event.preventDefault();
        setIsLoading(true);
        getValues();

        console.log('maxToken', maxToken);

        if (maxToken > 0) {
            setGenerationConfig({
                maxNumTokens: maxToken,
            });
        }

        // Packing text and images into an object called message and send it to the api
        try {
            if (imageParts === undefined || imageParts.length == 0) {
                const message = {
                    text: textValue.trim(),
                };

                void run(message, apikeys, generationConfig)
                    .then((response) => {
                        setResponse(response as string);
                        setIsLoading(false);

                        setImageParts([]);
                        setTextValue('');
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        setIsError(true);
                        const { message } = error;
                        setErrorMessage(message as string);
                        throw new Error(error as string);
                    });
            } else {
                // TODO : Handle states for image  generaation model
                const message = {
                    text: textValue.trim(),
                    imageParts: imageParts,
                };

                // Take the message object and send it to the api
                void run(message, apikeys, generationConfig)
                    .then((response) => {
                        if (response.length > 0 && response !== undefined) {
                            setResponse(response as string);
                            setIsLoading(false);
                            setImageParts([]);
                            setTextValue('');
                        }
                    })
                    .catch((error) => {
                        throw new Error(error as string);
                    });
            }
        } catch (error) {
            setIsLoading(false);
            setIsError(true);
            setErrorMessage(error as string);
            console.error(error);
        }
    };

    const handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            toast.success(` ${files.length} Files selected`);

            // Convert to generative parts and store in an array of objects

            const generativePart: Array<object> = [];
            for (let i = 0; i < files.length; i++) {
                void fileToGenerativePart(files[i]).then((base64Image) => {
                    generativePart.push(base64Image);
                    setImageParts(generativePart);
                });
            }
        } else {
            toast.error('No files selected');
        }
    };

    const getValues = () => {
        if (localStorage !== undefined) {
            // Check for configuration settings
            if (localStorage.getItem('apikey')) {
                setApikeys(localStorage.getItem('apikey') || '');
            } else {
                setApikeys('');
            }

            if (localStorage.getItem('token')) {
                setMaxToken(parseInt(localStorage.getItem('token') || ''));

                // await setSafety(localStorage.getItem("safety") || "");
            } else {
                setMaxToken(0);
            }
        }
    };

    useEffect(() => {
        getValues();
    }, [textValue, imageParts]);

    // Generation Configuration
    useEffect(() => {
        if (maxToken > 0) {
            setGenerationConfig({
                maxOutputTokens: maxToken,
            });
        } else {
            setGenerationConfig({});
        }
    }, [maxToken, textValue]);

    return (
        <>
            <div className=" relative top-10 h-auto w-auto">
                <Card className="flex h-auto flex-col items-center justify-center px-2  sm:w-96">
                    <form onSubmit={handleSubmit}>
                        <div className="flex w-auto  flex-col items-center  justify-center ">
                            <Textarea
                                placeholder=" Ask anything"
                                value={textValue}
                                onChange={(e) => setTextValue(e.target.value)}
                                className="  relative top-2 mb-5 h-16 w-full border-none placeholder:text-base placeholder:font-semibold focus:border-none "
                            />
                            <div className="mb-3 mr-2 mt-2 flex w-64  flex-row items-end justify-end">
                                <Button
                                    className="h-10 w-10  rounded-full bg-amber-900   p-2"
                                    type="button"
                                    onClick={handleButtonClick}
                                >
                                    <ArrowCircleUp size={25} weight="fill" />
                                    <Input
                                        className="ml-2 mr-2"
                                        id="picture"
                                        type="file"
                                        accept="image/jpeg, image/png , image/jpg , image/webp, image/heic , image/heif"
                                        onChange={handleImages}
                                        style={{ display: 'none' }}
                                        multiple
                                    />
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={
                                        textValue.length === 0 || isLoading
                                    }
                                    className="ml-2 h-10 w-10  rounded-full bg-black p-2 dark:bg-white"
                                >
                                    <ArrowBendDownLeft
                                        size={25}
                                        weight="fill"
                                        className=""
                                    />
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
            <div className="relative top-16 mx-3 flex  w-auto flex-col items-center justify-center">
                {isLoading && !response && <LoadingComponent />}

                {response.length > 0 ? (
                    <>
                        <ResponseComponent response={response} />
                    </>
                ) : (
                    !isLoading && !isError && <Notes />
                )}

                {!isLoading && isError && (
                    <ErrorComponent message={errorMessage} />
                )}
                <Footer />
            </div>
        </>
    );
}
