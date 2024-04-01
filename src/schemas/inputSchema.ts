import { z } from 'zod';

export const inputSchema = z.object({
    text: z
        .string()
        .trim()
        .min(1, { message: 'Text must be at least 1 character long.' }),
});

export type InputSchemaType = z.infer<typeof inputSchema>;
