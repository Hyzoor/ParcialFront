'use client'
import { getCocktailById } from "@/lib/api/cocktail";
import { Cocktail } from "@/types";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import "./styles.css"

const cocktailPageById = () => {

	const { id } = useParams();

	const router = useRouter();

	const [cocktail, setCocktail] = useState<Cocktail | null>(null);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getCocktailById(Number(id))
			.then((e) => setCocktail(e))
			.catch((e) => setError(e))
			.finally(() => setLoading(false))

	}, [id])



	const getIngredients = () => {

		const objectCocktail = cocktail ? cocktail : {};

	
		const entries = Object.entries(objectCocktail); 
		const ingredients = entries.filter(([key, values]) => (key.toString().includes("Ingredient")))
		return ingredients.filter(([key, value]) => (value));
		
	}


	return (

		<div className="cocktail-info-container">

			<button onClick={router.back}> Tirame patras loquete</button>

			{cocktail &&
				<div className="image-info-container">

					<img src={cocktail?.strDrinkThumb} />

					<div className="info-text-container">

						<h1> {cocktail.strDrink} </h1>
						<h2> {"Categoria: " + cocktail.strCategory} </h2>
						<h2> {"Tipo: " + cocktail.strAlcoholic} </h2>
						<h2> {"Tipo de vaso: " + cocktail.strGlass} </h2>
						<h2> {"Instrucciones: " + cocktail.strInstructions} </h2>
						
						{getIngredients().map(([key, value]) => <h2 key={key}> {"Ingrediente: " + value}) </h2>)}

					</div>
				</div>
			}


			{!cocktail && loading && <h1>Loading...</h1>}
			{error && <h2> Error: {error} </h2>}

		</div>
	)
}

export default cocktailPageById;

