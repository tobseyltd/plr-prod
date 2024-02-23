import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email('Keine korrekte E-Mail Adresse'),
	password: z.string()
});

export const profileSchema = z.object({
	full_name: z.string().max(140, 'Name must be 140 characters or less').nullish()
});

export const passwordSchema = z.object({
	password: z
		.string()
		.min(6, 'Das Passwort muss mindestens 6 Zeichen haben')
		.max(64, 'Das Passwort kann maximal 64 Zeichen haben'),
	passwordConfirm: z
		.string()
		.min(6, 'Das Passwort muss mindestens 6 Zeichen haben')
		.max(64, 'Das Passwort kann maximal 64 Zeichen haben')
});

export const emailSchema = loginSchema.pick({ email: true });

export type LoginSchema = typeof loginSchema;
export type ProfileSchema = typeof profileSchema;
export type PasswordSchema = typeof passwordSchema;
export type EmailSchema = typeof emailSchema;
