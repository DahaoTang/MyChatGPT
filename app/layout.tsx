import "./globals.css";
import { Noto_Sans } from "next/font/google";

const noto_sans = Noto_Sans({
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: "My GPT",
	description: "A ChatGPT-like chat application",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={noto_sans.className}>{children}</body>
		</html>
	);
}
