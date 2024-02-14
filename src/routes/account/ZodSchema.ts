import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export const profileSchema = z.object({
	full_name: z.string().max(140, 'Name must be 140 characters or less').nullish()
});

export const passwordSchema = z.object({
	password: z
	.string()
	.min(6, 'Password must be at least 6 characters')
	.max(64, 'Password must be 64 characters or less'),
	passwordConfirm: z
	.string()
	.min(6, 'Password must be at least 6 characters')
	.max(64, 'Password must be 64 characters or less')
});

export const emailSchema = loginSchema.pick({ email: true });

export type LoginSchema = typeof loginSchema;
export type ProfileSchema = typeof profileSchema;
export type PasswordSchema = typeof passwordSchema
export type EmailSchema = typeof emailSchema
