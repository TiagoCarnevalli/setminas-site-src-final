import { ReactNode } from "react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata = {
	title: "Setminas - Seu Lugar ao Seu Alcance",
	description:
		"Há mais de 9 anos desenvolvendo loteamentos de qualidade em Minas Gerais.",
	icons: {
		icon: "/images/logos/favicon_setminas.png",
		shortcut: "/images/logos/favicon_setminas.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="pt-BR">
			<body className="flex flex-col min-h-screen">
				<Header />
				<div className="flex-grow">{children}</div>
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
