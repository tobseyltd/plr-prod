export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			billing_customers: {
				Row: {
					email: string;
					id: string;
					metadata: Json | null;
					user_id: string;
				};
				Insert: {
					email: string;
					id: string;
					metadata?: Json | null;
					user_id: string;
				};
				Update: {
					email?: string;
					id?: string;
					metadata?: Json | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'billing_customers_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			billing_onetime: {
				Row: {
					created: string;
					customer_id: string;
					id: string;
					metadata: Json | null;
					mode: Database['public']['Enums']['payment_mode'];
					payment_intent: string | null;
					payment_status: Database['public']['Enums']['payment_status'];
					status: Database['public']['Enums']['checkout_status'];
					user_id: string;
				};
				Insert: {
					created: string;
					customer_id: string;
					id: string;
					metadata?: Json | null;
					mode: Database['public']['Enums']['payment_mode'];
					payment_intent?: string | null;
					payment_status: Database['public']['Enums']['payment_status'];
					status: Database['public']['Enums']['checkout_status'];
					user_id: string;
				};
				Update: {
					created?: string;
					customer_id?: string;
					id?: string;
					metadata?: Json | null;
					mode?: Database['public']['Enums']['payment_mode'];
					payment_intent?: string | null;
					payment_status?: Database['public']['Enums']['payment_status'];
					status?: Database['public']['Enums']['checkout_status'];
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'billing_onetime_customer_id_fkey';
						columns: ['customer_id'];
						isOneToOne: false;
						referencedRelation: 'billing_customers';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'billing_onetime_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			billing_products: {
				Row: {
					active: boolean;
					description: string;
					id: string;
					metadata: Json | null;
					name: string;
				};
				Insert: {
					active: boolean;
					description: string;
					id: string;
					metadata?: Json | null;
					name: string;
				};
				Update: {
					active?: boolean;
					description?: string;
					id?: string;
					metadata?: Json | null;
					name?: string;
				};
				Relationships: [];
			};
			billing_subscriptions: {
				Row: {
					cancel_at_period_end: boolean | null;
					created: string;
					current_period_end: string;
					current_period_start: string;
					customer_id: string;
					id: string;
					metadata: Json | null;
					product_id: string;
					status: Database['public']['Enums']['subscription_status'];
					trial_end: string | null;
					trial_start: string | null;
					user_id: string;
				};
				Insert: {
					cancel_at_period_end?: boolean | null;
					created: string;
					current_period_end: string;
					current_period_start: string;
					customer_id: string;
					id: string;
					metadata?: Json | null;
					product_id: string;
					status: Database['public']['Enums']['subscription_status'];
					trial_end?: string | null;
					trial_start?: string | null;
					user_id: string;
				};
				Update: {
					cancel_at_period_end?: boolean | null;
					created?: string;
					current_period_end?: string;
					current_period_start?: string;
					customer_id?: string;
					id?: string;
					metadata?: Json | null;
					product_id?: string;
					status?: Database['public']['Enums']['subscription_status'];
					trial_end?: string | null;
					trial_start?: string | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'billing_subscriptions_customer_id_fkey';
						columns: ['customer_id'];
						isOneToOne: false;
						referencedRelation: 'billing_customers';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'billing_subscriptions_product_id_fkey';
						columns: ['product_id'];
						isOneToOne: false;
						referencedRelation: 'billing_products';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'billing_subscriptions_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			lessons: {
				Row: {
					comments: Json[] | null;
					created_at: string;
					description: string | null;
					ep: string | null;
					files: [];
					id: string;
					img: string | null;
					likes: number | null;
					quiz: Json[];
					skill: string | null;
					title: string | null;
					topic: string | null;
					updated_at: string;
					video1: string | null;
					video1_content: string | null;
					video2: string | null;
					video2_content: string | null;
					video3: string | null;
					video3_content: string | null;
				};
				Insert: {
					comments?: Json[] | null;
					created_at?: string;
					description?: string | null;
					ep?: string | null;
					files?: Json[] | null;
					id?: string;
					img?: string | null;
					likes?: number | null;
					quiz?: Json[];
					skill?: string | null;
					title?: string | null;
					topic?: string | null;
					updated_at?: string;
					video1?: string | null;
					video1_content?: string | null;
					video2?: string | null;
					video2_content?: string | null;
					video3?: string | null;
					video3_content?: string | null;
				};
				Update: {
					comments?: Json[] | null;
					created_at?: string;
					description?: string | null;
					ep?: string | null;
					files?: Json[] | null;
					id?: string;
					img?: string | null;
					likes?: number | null;
					quiz?: Json[];
					skill?: string | null;
					title?: string | null;
					topic?: string | null;
					updated_at?: string;
					video1?: string | null;
					video1_content?: string | null;
					video2?: string | null;
					video2_content?: string | null;
					video3?: string | null;
					video3_content?: string | null;
				};
				Relationships: [];
			};
			profiles: {
				Row: {
					created_at: string;
					full_name: string | null;
					id: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					full_name?: string | null;
					id: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					full_name?: string | null;
					id?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			checkout_status: 'complete' | 'open' | 'no_payment_required';
			payment_mode: 'payment' | 'setup' | 'subscription';
			payment_status: 'paid' | 'unpaid';
			subscription_status:
				| 'trialing'
				| 'active'
				| 'canceled'
				| 'incomplete'
				| 'incomplete_expired'
				| 'past_due'
				| 'unpaid'
				| 'paused';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	storage: {
		Tables: {
			buckets: {
				Row: {
					allowed_mime_types: string[] | null;
					avif_autodetection: boolean | null;
					created_at: string | null;
					file_size_limit: number | null;
					id: string;
					name: string;
					owner: string | null;
					owner_id: string | null;
					public: boolean | null;
					updated_at: string | null;
				};
				Insert: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id: string;
					name: string;
					owner?: string | null;
					owner_id?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Update: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id?: string;
					name?: string;
					owner?: string | null;
					owner_id?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Relationships: [];
			};
			migrations: {
				Row: {
					executed_at: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Insert: {
					executed_at?: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Update: {
					executed_at?: string | null;
					hash?: string;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			objects: {
				Row: {
					bucket_id: string | null;
					created_at: string | null;
					id: string;
					last_accessed_at: string | null;
					metadata: Json | null;
					name: string | null;
					owner: string | null;
					owner_id: string | null;
					path_tokens: string[] | null;
					updated_at: string | null;
					version: string | null;
				};
				Insert: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					owner_id?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Update: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					owner_id?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'objects_bucketId_fkey';
						columns: ['bucket_id'];
						isOneToOne: false;
						referencedRelation: 'buckets';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			can_insert_object: {
				Args: {
					bucketid: string;
					name: string;
					owner: string;
					metadata: Json;
				};
				Returns: undefined;
			};
			extension: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			filename: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			foldername: {
				Args: {
					name: string;
				};
				Returns: string[];
			};
			get_size_by_bucket: {
				Args: Record<PropertyKey, never>;
				Returns: {
					size: number;
					bucket_id: string;
				}[];
			};
			search: {
				Args: {
					prefix: string;
					bucketname: string;
					limits?: number;
					levels?: number;
					offsets?: number;
					search?: string;
					sortcolumn?: string;
					sortorder?: string;
				};
				Returns: {
					name: string;
					id: string;
					updated_at: string;
					created_at: string;
					last_accessed_at: string;
					metadata: Json;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
		? PublicSchema['Enums'][PublicEnumNameOrOptions]
		: never;
