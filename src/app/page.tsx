'use client'

import { getCocktailsByName, getRandomCocktail } from "@/lib/api/cocktail";
import { Cocktail } from "@/types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CocktailComponent } from "./components/Cocktail";
import "./page.css"

const Home = () => {

	const [name, setName] = useState<string>("");
	const [finalName, setFinalName] = useState<string>("");
	const [cocktails, setCocktails] = useState<Cocktail[]>([]);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	const router = useRouter();

	const fetchCocktails = async (name: string) => {

		setLoading(true);
		await getCocktailsByName(name)
			.then((e) => setCocktails(e))
			.catch((e) => setError(`Error al obtener los cocktails: ${e}`))
			.finally(() => setLoading(false))

	}

	const fetchRandomCocktail = async () => {

		setLoading(true);

		await getRandomCocktail()
			.then((e) => router.push("cocktail/" + e?.idDrink))
			.catch((e) => setError(`Error al obtener cocktail random: ${e}`))
			.finally(() => setLoading(false))

	}

	useEffect(() => {

		if (!finalName) return;
		fetchCocktails(finalName)

	}, [finalName])



	return (

		<div className="main-container">
			<div className="search-container">

				<input
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					onKeyDown={(e) => { if (e.key == "Enter") setFinalName(name) }}
				/>

				<button onClick={() => fetchRandomCocktail()}>
					Dime algo bonito 
				</button>

			</div>

			{loading && finalName && <h2>Loading...</h2>}
			{error && <h3>Error: {error}</h3>}
			<div className="cocktail-cards-container">
				{!loading && cocktails && cocktails.map((e) => <CocktailComponent key={e.idDrink} cocktail={e} />)}
			</div>

		</div>


	)

}



export default Home;
