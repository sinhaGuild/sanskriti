import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme")

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: [
					'sf pro display',
					...fontFamily.sans
				],
				mono: [
					'space Mono',
					...fontFamily.mono
				],
				serif: [
					'playfair display',
					...fontFamily.serif
				],
				script: [
					'zapfino',
					...fontFamily.serif
				],
				hindi: [
					'shangrila'
				]
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				marquee: {
					from: {
						transform: 'translateX(0)'
					},
					to: {
						transform: 'translateX(calc(-100% - var(--gap)))'
					}
				},
				appear: {
					'0%': {
						opacity: '0',
						transform: 'translateY(1rem)',
						filter: 'blur(.5rem)'
					},
					'50%': {
						filter: 'blur(0)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
						filter: 'blur(0)'
					}
				},
				'appear-zoom': {
					'0%': {
						opacity: '0',
						transform: 'scale(.5)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'pulse-hover': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'50%': {
						opacity: '0.5',
						transform: 'translateY(-1rem)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				hover: {
					'0%': {
						transform: 'translateY(0) translateX(0)'
					},
					'50%': {
						transform: 'translateY(-1rem) translateX(1rem)'
					},
					'100%': {
						transform: 'translateY(0) translateX(0)'
					}
				},
				'hover-reverse': {
					'0%': {
						transform: 'translateY(0) translateX(0)'
					},
					'50%': {
						transform: 'translateY(1rem) translateX(1rem)'
					},
					'100%': {
						transform: 'translateY(0) translateX(0)'
					}
				},
				'pulse-fade': {
					'0%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.3'
					},
					'100%': {
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				appear: 'appear 0.6s forwards ease-out',
				'appear-zoom': 'appear-zoom 0.6s forwards ease-out',
				'pulse-hover': 'pulse-hover 6s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			}
		}
	},
	plugins: [require('@tailwindcss/aspect-ratio'), require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config;
