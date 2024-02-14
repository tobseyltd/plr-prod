export const lookupKeys = [
	'premium_monthly',
	'premium_yearly',
	/* 'premium_lifteime', */
	'premium_onetime'
] as const;

export const productNames = ['ABO', 'Einmalig'] as const;
type ProductNames = (typeof productNames)[number];

type ProductConfig = Record<ProductNames, { features: string[]; call_to_action: string }>;

export const productConfig: ProductConfig = {
	ABO: {
		features: [
			'Zugang zu Deep Dive Video Content',
			'Themen basierte Coding Challenges',
			'Zugang zur Lern-Community',
			'Downloadbarer Content',
			'Lerne wo und wann du willst',
			'Perfekt für Beginner bzw. Fortgeschrittene',
			'Jederzeit kündbar'
		],
		call_to_action: 'JETZT ABONNIEREN'
	},
	Einmalig: {
		features: [
			'Zugang zu Deep Dive Video Content',
			'Themen basierte Coding Challenges',
			'Zugang zur Lern-Community',
			'Downloadbarer Content',
			'Lerne wo und wann du willst',
			'Perfekt für Beginner bzw. Fortgeschrittene',
			'Lebenslanger Zugang'
		],
		call_to_action: 'JETZT KAUFEN'
	}
};
