import { z } from 'zod';

export const registerUserSchema = z.object({
	full_name: z.string().max(140).nullish(),
	email: z.string().email(),
	password: z.string().min(6).max(100),
	passwordConfirm: z.string().min(6).max(100)
});
