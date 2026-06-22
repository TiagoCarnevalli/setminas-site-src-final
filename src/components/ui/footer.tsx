"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { adsConversionContact } from "@/lib/googleAds";

export default function Footer() {
	const pathname = usePathname();
	const [email, setEmail] = useState("");
	const [sign, setSign] = useState({
		loading: false,
		success: false,
	});

	async function atualizarPlanilha() {
		try {
			setSign({ ...sign, loading: true });
			const res = await fetch("/api/update-sheet", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					values: [email],
				}),
			});

			const data = await res.json();
			console.log(data);

			adsConversionContact({ pathname });

			setSign({ ...sign, success: true });
			setEmail(""); // Limpa o campo de email após o envio
		} catch (error) {
			console.error("Erro ao atualizar planilha:", error);
		} finally {
			setSign({ ...sign, loading: false });
		}
	}

	return (
		<footer className="bg-[#0F3B7D] text-white pt-12 pb-6">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Coluna 1 - Logo e informações */}
					<div className="space-y-4">
						<div className="flex items-center">
							<img
								src="/images/logos/logo_setminas_texto-branco.png"
								alt="Esfera Setminas"
								className="h-10 w-auto" // Ajustar altura da esfera conforme necessário
							/>
						</div>
						<p className="text-sm">
							Há mais de 9 anos desenvolvendo loteamentos de qualidade em Minas
							Gerais.
						</p>
						<div className="flex space-x-4 mt-4">
							<a
								href="https://www.facebook.com/share/1614P7sjaE/?mibextid=wwXIfr"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-blue-200"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
								</svg>
							</a>
							<a
								href="https://www.instagram.com/setminas?igsh=NWJ1MHRiZHNjMjNz"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-blue-200"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
								</svg>
							</a>
							<a
								href="http://wa.me/5535984244567"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-blue-200"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.795.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
								</svg>
							</a>
						</div>
					</div>

					{/* Coluna 2 - Links Rápidos */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/sobre-nos"
									className="hover:text-blue-200 transition-colors"
								>
									Sobre Nós
								</Link>
							</li>
							<li>
								<Link
									href="/empreendimentos"
									className="hover:text-blue-200 transition-colors"
								>
									Empreendimentos
								</Link>
							</li>
							<li>
								<Link
									href="/blog"
									className="hover:text-blue-200 transition-colors"
								>
									Blog
								</Link>
							</li>
						</ul>
					</div>

					{/* Coluna 3 - Contato */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Contato</h3>
						<ul className="space-y-2">
							<li className="flex items-start">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-2 mt-0.5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<span>
									Av. Alfredo Custódio de Paula,
									<br />
									130, Santa Elisa.
									<br />
									CEP 37.553-063.
									<br />
									Pouso Alegre - MG.
								</span>
							</li>
							<li className="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
								<span>(35) 98424-4567</span>
							</li>
							<li className="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
								<span>contato@setminas.com.br</span>
							</li>
						</ul>
					</div>

					{/* Coluna 4 - Newsletter */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Newsletter</h3>
						<p className="text-sm mb-4">
							Receba novidades sobre lançamentos e ofertas especiais.
						</p>
						<form
							className="space-y-2"
							onSubmit={(e) => {
								e.preventDefault();
								atualizarPlanilha();
							}}
						>
							<input
								type="email"
								placeholder="Seu e-mail"
								className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<button
								type="submit"
								className="w-full flex align-center justify-center gap-2 bg-white text-[#0F3B7D] px-4 py-2 rounded hover:bg-blue-100 transition-colors"
								disabled={sign.loading}
							>
								Inscrever-se{" "}
								{sign.loading ? (
									<Image
										src={"/icons/spinner.svg"}
										alt="Carregando..."
										width={24}
										height={24}
										className="flex-shrink-0"
									/>
								) : sign.success ? (
									<Image
										src={"/icons/check-circle.svg"}
										alt="Sucesso!"
										width={24}
										height={24}
										className="flex-shrink-0"
									/>
								) : (
									<></>
								)}
							</button>
						</form>
					</div>
				</div>

				<div className="border-t border-blue-800 mt-8 pt-6 text-sm text-center">
					<p>
						&copy; {new Date().getFullYear()} Setminas. Todos os direitos
						reservados.
					</p>
				</div>
			</div>
		</footer>
	);
}
