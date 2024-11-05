const apiKey = process.env.API_KEY;
const searchRecipes = async (searchTerm: string, page:number) => {
    if(!apiKey){
        throw new Error("Missing API key");
    }

    const url = new URL("https://api/spoonacular/recipes/complexSearch");

    const queryParams = {
        apiKey,
        query: searchTerm,
        number: "10",
        offset: (page * 10).toString()
    }
    url.search = new URLSearchParams(queryParams).toString()

    try{
        const searchResponse = await fetch(url);
        const resultsJson = await searchResponse.json();
        return resultsJson;
    }catch(error){
        console.log(error);
    }
};