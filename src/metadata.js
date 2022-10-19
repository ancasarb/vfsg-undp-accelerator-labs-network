import textures from 'textures';

export const color = {
	'Regional Bureau for Africa (RBA)': '#02aad1',
	'Regional Bureau for Arab States (RBAS)': '#8e4784',
	'Regional Bureau for Asia and Pacific (RBAP)': '#f59421',
	'Regional Bureau for Europe and the Commonwealth of Independent States (RBEC)': '#e00102',
	'Regional Bureau for Latin American Countries (RBLAC)': '#36978e'
};

export const energySourcesPadding = {
	'N/A': 45,
	Chemical: 75,
	'Household application': 150,
	Hydro: 60,
	Mechanical: 90,
	'Non-renewable': 110,
	'Renewable general': 135,
	Solar: 55,
	'Solar / Thermal': 110,
	Thermal: 70,
	Wind: 55
};

export const sdgsPadding = {
	'No poverty': 135,
	'Zero hunger': 140,
	'Good health and well-being': 230,
	'Quality education': 175,
	'Gender equality': 165,
	'Clean water and sanitation': 225,
	'Affordable and clean energy': 235,
	'Decent work and economic growth': 270,
	'Industry, innovation and infrastructure': 290,
	'Reduced inequalities': 195,
	'Sustainable cities and communities': 275,
	'Responsible consumption and production': 310,
	'Climate action': 160,
	'Life below water': 170,
	'Life on land': 145,
	'Peace, justice and strong institutions': 285,
	'Partnerships for the goals': 225
};

export const display = {
	'Regional Bureau for Africa (RBA)': ['Regional Bureau for', 'Africa (RBA)'],
	'Regional Bureau for Arab States (RBAS)': ['Regional Bureau for', 'Arab States (RBAS)'],
	'Regional Bureau for Asia and Pacific (RBAP)': ['Regional Bureau for', 'Asia and Pacific (RBAP)'],
	'Regional Bureau for Europe and the Commonwealth of Independent States (RBEC)': [
		'Regional Bureau for',
		'Europe and the',
		'Commonwealth of',
		'Independent States',
		'(RBEC)'
	],
	'Regional Bureau for Latin American Countries (RBLAC)': [
		'Regional Bureau for',
		'Latin American',
		'Countries (RBLAC)'
	]
};

export const sdgs = [
	{ sdg: 1, name: 'No poverty' },
	{ sdg: 2, name: 'Zero hunger' },
	{ sdg: 3, name: 'Good health and well-being' },
	{ sdg: 4, name: 'Quality education' },
	{ sdg: 5, name: 'Gender equality' },
	{ sdg: 6, name: 'Clean water and sanitation' },
	{ sdg: 7, name: 'Affordable and clean energy' },
	{ sdg: 8, name: 'Decent work and economic growth' },
	{ sdg: 9, name: 'Industry, innovation and infrastructure' },
	{ sdg: 10, name: 'Reduced inequalities' },
	{ sdg: 11, name: 'Sustainable cities and communities' },
	{ sdg: 12, name: 'Responsible consumption and production' },
	{ sdg: 13, name: 'Climate action' },
	{ sdg: 14, name: 'Life below water' },
	{ sdg: 15, name: 'Life on land' },
	{ sdg: 16, name: 'Peace, justice and strong institutions' },
	{ sdg: 17, name: 'Partnerships for the goals' }
];

export function getTexture(color) {
	return textures.lines().orientation('6/8').stroke(color).lighter().lighter().thicker().thicker();
}
