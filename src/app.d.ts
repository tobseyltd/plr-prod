// See https://kit.svelte.dev/docs/types#app

import type { Database } from "$lib/supabase-types";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

// for information about these interfaces
declare global {
	/// <reference types="stripe-event-types" />
	namespace App {
		// interface Error {}
		 interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
		 }
		interface PageData {
			session: Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
