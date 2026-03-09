
import { useEffect, useState } from "react";
import { getCocktailById } from "@/lib/api/cocktail";
import { useRouter } from "next/navigation";
import { Cocktail } from "@/types";

import "./styles.css";


export const CocktailComponent = (params: { id?: number, cocktail?: Cocktail }) => {

	const id = params.id;
	const router = useRouter();

	const [cocktail, setCocktail] = useState<Cocktail | null>(params.cocktail ? params.cocktail : null);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {

		setLoading(true);

		if (!params.cocktail && id) {
			getCocktailById(id)
				.then((e) => setCocktail(e))
				.catch((e) => setError(e))
				.finally(() => setLoading(false))
		}

	}, [id]);


	return (

		<div className="cocktail-card" onClick={() => router.push("cocktail/" + cocktail?.idDrink)}>

			{
				cocktail ?
					<>
						{cocktail?.strDrinkThumb && <img src={cocktail?.strDrinkThumb} />}
						<h1>{cocktail?.strDrink}</h1>
					</>

					: <h1>Loading...</h1>
			}
			
			{!cocktail && loading && <h1>Loading...</h1>}
			{error && <h2> Error: {error} </h2>}

		</div >
	)
}
