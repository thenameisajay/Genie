'use client';

import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { run } from '@/app/api/gemini';
import { type Message } from '@/interfaces/message';
import { fileToGenerativePart } from '@/lib/actions';
import { type InputSchemaType, inputSchema } from '@/schemas/inputSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image as ImagePhosphor, PaperPlaneRight } from '@phosphor-icons/react';
import { useLocalStorage } from 'usehooks-ts';

import Footer from '@/components/home/footer';
import Notes from '@/components/home/notes';
import ResponseComponent from '@/components/response-component';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ErrorComponent from '@/components/ui/states/error';
import LoadingComponent from '@/components/ui/states/loading';

//TODO : Use antd for input fields or text values
export default function Body() {
    const [imageParts, setImageParts] = useState<Array<object>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const [response, setResponse] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [maxToken] = useLocalStorage<number>('token', 0);
    const [generationConfig, setGenerationConfig] = useState<object>({});
    const [apikey] = useLocalStorage<string>('apikey', '');

    const settledState = (response: string) => {
        setResponse(response);
        setIsLoading(false);
        setImageParts([]);
    };

    const errorState = (message: string) => {
        setErrorMessage(message);
        setIsLoading(false);
        setIsError(true);
    };

    const initialStateApi = async () => {
        setIsError(false);
        setErrorMessage('');
        setResponse('');
        setIsLoading(true);
    };

    const makeTheCall = async (
        message: object,
        apikey: string,
        generationConfig: object,
    ) => {
        await run(message, apikey as string, generationConfig)
            .then((response) => {
                settledState(response as string);
            })
            .catch((error) => {
                errorState(error.message as string);
                throw new Error(error.message as string);
            });
    };

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

    //TODO : Hacky way to open file dialog
    const handleImageButtonUpload = () => {
        const fileInput = document.getElementById('picture');
        fileInput?.click();
    };

    const onSubmit: SubmitHandler<InputSchemaType> = async (
        data: InputSchemaType,
    ) => {
        await initialStateApi();
        const { text: textValue } = data;

        if (maxToken !== 0) {
            setGenerationConfig({
                maxNumTokens: maxToken,
            });
        }

        try {
            const message: Message = {
                text: textValue.trim(),
            };

            if (imageParts.length > 0) {
                message.imageParts = imageParts;
            }
            await makeTheCall(message, apikey as string, generationConfig);
        } catch (error) {
            console.error(error);
        } finally {
            reset();
        }
    };

    const handleImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            toast.success(` ${files.length} Files selected`);

            try {
                const generativePart: Array<object> = [];

                const fileLength = files.length;

                for (
                    let fileNumber = 0;
                    fileNumber < fileLength;
                    fileNumber++
                ) {
                    await fileToGenerativePart(files[fileNumber]).then(
                        (base64Image) => {
                            generativePart.push(base64Image);
                            setImageParts(generativePart);
                        },
                    );
                }
            } catch (error) {
                console.error(error);
                toast.error(error as string);
            }
        } else {
            toast.error('No files selected');
        }
    };

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
                                        <Input
                                            placeholder=" Ask anything"
                                            {...field}
                                            className="  relative top-2 mb-5 h-16 w-full border-none placeholder:text-base placeholder:font-semibold focus:border-none "
                                        />
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
                                    className="h-10 w-10  rounded-full bg-blue-500  p-2"
                                    type="button"
                                    onClick={handleImageButtonUpload}
                                >
                                    <ImagePhosphor size={25} weight="fill" />
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
                                    <PaperPlaneRight size={25} weight="fill" />
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
