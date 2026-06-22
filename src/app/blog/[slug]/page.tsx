"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Spinner from "@/components/ui/spinner";

interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	content: string[];
	date: string;
	coverImage: string;
	urlOriginal?: {
		origin?: string;
		url: string;
	};
}

export default function BlogPostPage() {
	const params = useParams();
	const postId = params.slug;
	const [posts, setPosts] = React.useState<BlogPost>();
	const [loading, setLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		fetchPost();
	}, [postId]);

	async function fetchPost() {
		setLoading(true);
		try {
			const docRef = doc(db, "noticias", `${postId}`);

			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setPosts(docSnap.data() as BlogPost);
			} else {
				return;
			}
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	if (!posts) {
		return loading ? (
			<div className="container mx-auto px-4 py-12 text-center">
				<div className="flex items-center justify-center">
					<Spinner />
					Carregando...
				</div>
			</div>
		) : (
			<div className="container mx-auto px-4 py-12 text-center">
				<h1 className="text-3xl font-bold mb-4">Notícia não encontrada</h1>
				<p className="mb-8">
					O notícia que você está procurando não existe ou foi removida.
				</p>
				<Link
					href="/blog"
					className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
				>
					Ver todas as notícias
				</Link>
			</div>
		);
	}

	return (
		<main className="mx-auto max-w-3xl px-4 py-8">
			<div className="mb-6">
				<Link
					href="/blog"
					className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100"
				>
					← Voltar
				</Link>
			</div>
			<article className="space-y-6">
				<header className="space-y-2">
					<span className="text-xs text-gray-500">
						{new Date(posts.date).toLocaleDateString("pt-BR")}
					</span>
					<h1 className="text-3xl font-bold tracking-tight">{posts.title}</h1>
				</header>

				<div className="relative mt-4 h-64 w-full overflow-hidden rounded-lg">
					<Image
						src={posts.coverImage}
						alt={posts.title}
						fill
						className="object-cover"
						sizes="100vw"
						priority
					/>
				</div>

				<section className="prose prose-sm max-w-none text-gray-800 prose-headings:mt-6 prose-p:mt-3">
					{/* Aqui o conteúdo está como string simples.
						Se quiser, pode integrar um parser de markdown. */}
					{posts.content.map((paragraph, index) => (
						<p
							key={`${posts.slug}-${index}`}
							className="indent-4 text-justify mb-4"
						>
							{paragraph}
						</p>
					))}
				</section>
				{posts.urlOriginal && (
					<b className="text-sm text-gray-500">
						{posts.urlOriginal.origin ||
							(posts.urlOriginal.url && "Fonte do artigo")}
						{posts.urlOriginal.url && ": "}
						<a
							href={posts.urlOriginal.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 underline hover:text-blue-800"
						>
							{posts.urlOriginal.url}
						</a>
					</b>
				)}
			</article>
		</main>
	);
}
