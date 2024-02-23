import { z } from "zod";

export const resetSchema = z.object({
	email: z.string().email('Keine korrekte E-Mail Adresse'),
});
