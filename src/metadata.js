import textures from 'textures';

export const color = {
	'Regional Bureau for Africa (RBA)': '#02aad1',
	'Regional Bureau for Arab States (RBAS)': '#8e4784',
	'Regional Bureau for Asia and Pacific (RBAP)': '#f59421',
	'Regional Bureau for Europe and the Commonwealth of Independent States (RBEC)': '#e00102',
	'Regional Bureau for Latin American Countries (RBLAC)': '#36978e'
};

export const padding = {
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

export function getTexture(color) {
	return textures.lines().orientation('6/8').stroke(color).lighter().lighter().thicker().thicker();
}
