import { Request, Response } from 'express';
import express from "express";
import cors from "cors";
import "dotenv/config";
import * as RecipeAPI from "./recipe-api";
import { PrismaClient } from "@prisma/client";


const app = express();
const prismaClient = new PrismaClient();
app.use(express.json());
app.use(cors());

// @ts-ignore
app.get("/api/recipes/search", async (req, res) => {
    res.json({message: 'success!'})
    //GET http://localhost/api/recipes/search?searchTem=burgers&page=1
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);
    const results = await RecipeAPI.searchRecipes(searchTerm, page);

    //console.log(results);

    return res.json(results);
});
// @ts-ignore
app.get("/api/recipes/:recipeId/summary", async (req, res) => {
    const recipeId = req.params.recipeId;
    const results = await RecipeAPI.getRecipeSummary(recipeId);
    return res.json(results);
})
// @ts-ignore
app.post("/api/recipes", async (req, res) => {
    const recipeId = req.body.recipeId;
    try {
        const favoriteRecipe = await prismaClient.favoriteRecipe.create({
            data: {
                recipeId: recipeId,
            },
        });
        return res.status(201).json(favoriteRecipe);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})
// @ts-ignore
app.get("/api/recipes/favorites", async (req, res) => {
    try{
        const recipes = await prismaClient.favoriteRecipe.findMany();
        const recipeIds = recipes.map((recipe: { recipeId: { toString: () => any; }; })=> recipe.recipeId.toString());
        const favorites = await RecipeAPI.getFavoriteRecipesByIDs(recipeIds);
        return res.json(favorites);
    }catch (error){
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
});
// @ts-ignore
app.delete("/api/recipes/favorites", async (req, res) => {
    const recipeId = req.body.recipeId;
    try {
        await prismaClient.favoriteRecipe.delete({
            where: {
                recipeId: recipeId
            }
        })
        return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});