import { z } from 'zod';

export const registerUserSchema = z.object({
	full_name: z.string().max(140).nullish(),
	email: z.string().email('Korrekte E-Mail Adresse eingeben'),
	password: z
		.string()
		.min(6, 'Passwort muss min. 6 Zeichen haben')
		.max(64, 'Passwort kann max. 64 Zeichen haben'),
	passwordConfirm: z
		.string()
		.min(6, 'Passwort muss min. 6 Zeichen haben')
		.max(64, 'Passwort kann max. 64 Zeichen haben')
});
