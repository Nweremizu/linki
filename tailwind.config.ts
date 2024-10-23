/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Config } from "tailwindcss";
import svgToDataUri from "mini-svg-data-uri";
// @ts-ignore
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
// @ts-ignore
import scrollbarHide from "tailwind-scrollbar-hide";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			brown: {
  				'50': '#fdf8f6',
  				'100': '#f2e8e5',
  				'200': '#eaddd7',
  				'300': '#e0cec7',
  				'400': '#d2bab0',
  				'500': '#bfa094',
  				'600': '#a18072',
  				'700': '#977669',
  				'800': '#846358',
  				'900': '#43302b'
  			},
  			btn: '#E0FF22',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		padding: {
  			'100': '100px'
  		},
  		fontFamily: {
  			display: ["var(--font-satoshi)", "system-ui", "sans-serif"],
  			default: ["var(--font-inter)", "system-ui", "sans-serif"]
  		},
  		animation: {
  			'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  			'fade-in': 'fade-in 0.2s ease-out forwards',
  			'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  			'slide-right-fade': 'slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  			'slide-down-fade': 'slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  			'slide-left-fade': 'slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  			'enter-from-right': 'enter-from-right 0.15s ease',
  			'enter-from-left': 'enter-from-left 0.15s ease',
  			'exit-to-right': 'exit-to-right 0.15s ease',
  			'exit-to-left': 'exit-to-left 0.15s ease',
  			'scale-in-content': 'scale-in-content 0.2s ease',
  			'scale-out-content': 'scale-out-content 0.2s ease',
  			'accordion-down': 'accordion-down 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  			'accordion-up': 'accordion-up 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  			wiggle: 'wiggle 0.75s infinite',
  			spinner: 'spinner 1.2s linear infinite',
  			blink: 'blink 1.4s infinite both',
  			pulse: 'pulse 1s linear infinite alternate',
  			'caret-blink': 'caret-blink 1.25s ease-out infinite',
  			scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
  			'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
  			'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear'
  		},
  		keyframes: {
  			'scale-in': {
  				'0%': {
  					transform: 'scale(0.95)'
  				},
  				'100%': {
  					transform: 'scale(1)'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'slide-up-fade': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(2px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-right-fade': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(-2px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-down-fade': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-2px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-left-fade': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(2px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'enter-from-right': {
  				'0%': {
  					transform: 'translateX(200px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			'enter-from-left': {
  				'0%': {
  					transform: 'translateX(-200px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			'exit-to-right': {
  				'0%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translateX(200px)',
  					opacity: '0'
  				}
  			},
  			'exit-to-left': {
  				'0%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translateX(-200px)',
  					opacity: '0'
  				}
  			},
  			'scale-in-content': {
  				'0%': {
  					transform: 'rotateX(-30deg) scale(0.9)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'rotateX(0deg) scale(1)',
  					opacity: '1'
  				}
  			},
  			'scale-out-content': {
  				'0%': {
  					transform: 'rotateX(0deg) scale(1)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'rotateX(-10deg) scale(0.95)',
  					opacity: '0'
  				}
  			},
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
  			wiggle: {
  				'0%, 100%': {
  					transform: 'translateX(0%)',
  					transformOrigin: '50% 50%'
  				},
  				'15%': {
  					transform: 'translateX(-4px) rotate(-4deg)'
  				},
  				'30%': {
  					transform: 'translateX(6px) rotate(4deg)'
  				},
  				'45%': {
  					transform: 'translateX(-6px) rotate(-2.4deg)'
  				},
  				'60%': {
  					transform: 'translateX(2px) rotate(1.6deg)'
  				},
  				'75%': {
  					transform: 'translateX(-1px) rotate(-0.8deg)'
  				}
  			},
  			spinner: {
  				'0%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0'
  				}
  			},
  			blink: {
  				'0%': {
  					opacity: '0.2'
  				},
  				'20%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0.2'
  				}
  			},
  			pulse: {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '1'
  				},
  				'20%,50%': {
  					opacity: '0'
  				}
  			},
  			scroll: {
  				to: {
  					transform: 'translate(calc(-50% - 0.5rem))'
  				}
  			},
  			'shimmer-slide': {
  				to: {
  					transform: 'translate(calc(100cqw - 100%), 0)'
  				}
  			},
  			'spin-around': {
  				'0%': {
  					transform: 'translateZ(0) rotate(0)'
  				},
  				'15%, 35%': {
  					transform: 'translateZ(0) rotate(90deg)'
  				},
  				'65%, 85%': {
  					transform: 'translateZ(0) rotate(270deg)'
  				},
  				'100%': {
  					transform: 'translateZ(0) rotate(360deg)'
  				}
  			}
  		},
  		dropShadow: {
  			'card-hover': ["0 8px 12px #222A350d", "0 32px 60px #2f30370f"]
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    scrollbarHide,
    addVariablesForColors,
    function ({ matchUtilities, theme }: { matchUtilities: any; theme: any }) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none" stroke="${value}"><path d="M0 .5H99.5V100"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

function addVariablesForColors({
  addBase,
  theme,
}: {
  addBase: any;
  theme: any;
}) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
