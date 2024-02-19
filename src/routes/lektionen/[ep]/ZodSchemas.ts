import { unixTimestampToISOString } from "$lib/schemas";
import { z } from "zod";

export const commentSchema = z.object({
    id: z.string(),
    comment: z.string(),
    user: z.string(),
    created: unixTimestampToISOString,
})
