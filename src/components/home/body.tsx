'use client';

import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { run } from '@/app/api/gemini';
import { fileToGenerativePart } from '@/lib/actions';
import { type InputSchemaType, inputSchema } from '@/schemas/inputSchema';
import { zodResolver } from '@hookform/resolvers/zod';
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
    const [imageParts, setImageParts] = useState<Array<object>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [apikeys, setApikeys] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [maxToken, setMaxToken] = useState<number>(0);
    const [generationConfig, setGenerationConfig] = useState<object>({});

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isValid },
    } = useForm<InputSchemaType>({
        resolver: zodResolver(inputSchema),
        mode: 'onChange',
        defaultValues: {
            text: '',
        },
    });

    const handleButtonClick = () => {
        const fileInput = document.getElementById('picture');
        fileInput?.click();
    };

    const onSubmit: SubmitHandler<InputSchemaType> = (
        data: InputSchemaType,
    ) => {
        const textValue = data.text;
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
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        setIsError(true);
                        setErrorMessage(error.message as string);
                        throw new Error(error.message as string);
                    });
            } else {
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
                        }
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        setIsError(true);
                        setErrorMessage(error.message as string);
                        throw new Error(error.message as string);
                    });
            }
        } catch (error) {
            console.error(error);
        }

        reset();
    };

    const handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            toast.success(` ${files.length} Files selected`);

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
            } else {
                setMaxToken(0);
            }
        }
    };

    useEffect(() => {
        getValues();
    }, [response, imageParts]);

    // Generation Configuration
    useEffect(() => {
        if (maxToken > 0) {
            setGenerationConfig({
                maxOutputTokens: maxToken,
            });
        } else {
            setGenerationConfig({});
        }
    }, [maxToken]);

    const DisplayResponseComponent = () => {
        return (
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
        );
    };

    return (
        <>
            <div className=" relative top-10 h-auto w-auto">
                <Card className="flex h-auto flex-col items-center justify-center px-2  sm:w-96">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex w-auto  flex-col items-center  justify-center ">
                            <div className="mt-2">
                                <Controller
                                    name="text"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            placeholder=" Ask anything"
                                            {...field}
                                            className="  relative top-2 mb-5 h-16 w-full border-none placeholder:text-base placeholder:font-semibold focus:border-none "
                                        ></Textarea>
                                    )}
                                />

                                {errors.text && (
                                    <p className="text-red-500">
                                        {errors.text.message}
                                    </p>
                                )}
                            </div>

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
                                    disabled={!isValid || isLoading}
                                    className="ml-2 h-10 w-10  rounded-full bg-black p-2 dark:bg-white"
                                >
                                    <ArrowBendDownLeft
                                        size={25}
                                        weight="fill"
                                    />
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
            <DisplayResponseComponent />
        </>
    );
}
