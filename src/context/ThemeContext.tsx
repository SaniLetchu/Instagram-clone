import React, { createContext, useMemo, useState } from 'react';

interface ThemeContextInterface {
	theme: string;
	toggleTheme(): void;
	textAndIconColor: string;
	secondaryBackgroundColor: string;
	borderColor: string;
	buttonBackgroundColor: string;
	reverseTextAndIconColor: string;
	backgroundColor: string;
	textInputBackgroundColor: string;
	iconHoverBackgroundColor: string;
}

interface ThemeProps {
	children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextInterface>(
	{} as ThemeContextInterface
);

export default function ThemeProvider({ children }: ThemeProps) {
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	const backgroundColor = theme === 'dark' ? 'black' : 'white';
	const secondaryBackgroundColor =
		theme === 'dark' ? 'rgb(38, 38, 38)' : 'white';
	const buttonBackgroundColor = theme === 'dark' ? 'white' : 'rgb(38, 38, 38)';
	const iconHoverBackgroundColor =
		theme === 'dark' ? 'rgb(20, 20, 20)' : 'rgb(220, 220, 220)';
	const textInputBackgroundColor =
		theme === 'dark' ? 'rgb(38, 38, 38)' : 'rgb(239, 239, 239)';

	const textAndIconColor = theme === 'dark' ? 'white' : 'black';
	const reverseTextAndIconColor = theme === 'dark' ? 'black' : 'white';

	const borderColor =
		theme === 'dark' ? 'rgba(250, 250, 250, 0.2)' : 'rgba(0, 0, 0, 0.2)';

	const provider = useMemo(
		() => ({
			toggleTheme,
			theme,
			textAndIconColor,
			borderColor,
			secondaryBackgroundColor,
			buttonBackgroundColor,
			reverseTextAndIconColor,
			backgroundColor,
			textInputBackgroundColor,
			iconHoverBackgroundColor,
		}),
		[theme]
	);

	return (
		<ThemeContext.Provider value={provider}>{children}</ThemeContext.Provider>
	);
}
