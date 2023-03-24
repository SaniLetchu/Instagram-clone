import React, { createContext, useMemo, useState } from 'react';

interface ThemeContextInterface {
	theme: string;
	toggleTheme(): void;
}

interface ThemeProps {
	children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextInterface>(
	{} as ThemeContextInterface
);

export const ThemeProvider = ({ children }: ThemeProps) => {
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	const provider = useMemo(
		() => ({
			toggleTheme,
			theme,
		}),
		[theme]
	);

	return (
		<ThemeContext.Provider value={provider}>{children}</ThemeContext.Provider>
	);
};
