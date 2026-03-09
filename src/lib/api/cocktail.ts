import { CocktailResponse } from "@/types";
import { api } from "./axios"



export const getCocktailById = async (id: number) => {

	const response = await api.get<CocktailResponse>(`lookup.php?i=${id}`);
	return response.data.drinks[0];

}


export const getCocktailsByName = async (name: string) => {

	const response = await api.get<CocktailResponse>(`search.php?s=${name}`);
	return response.data.drinks;

}

export const getRandomCocktail = async () => {

	const response = await api.get<CocktailResponse>(`random.php`)
	return response.data.drinks[0];

}
