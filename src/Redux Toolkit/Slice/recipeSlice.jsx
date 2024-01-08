import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

// GET MY RECIPES
export const getMyRecipe = createAsyncThunk(
  "recipes/getMyRecipe",
  async (page) => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/myRecipe", {
      params: {
        limit: 5,
        page: page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

// ADD RECIPES
export const addRecipes = createAsyncThunk(
  "recipes/addRecipes",
  async ({ title, ingredients, videolink, category_id, image }) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:3000/postRecipe",
      {
        title,
        ingredients,
        videolink,
        category_id,
        image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

// UPDATE RECIPES
export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async ({ menuId, title, ingredients, videolink, category_id, image }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:3000/updateRecipe/${menuId}`,
      {
        title,
        ingredients,
        videolink,
        category_id,
        image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

/// DETAIL RECIPES
export const detailRecipes = createAsyncThunk(
  "recipes/detailRecipes",
  async (menuId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/recipe/${menuId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      console.log("Error Response:", error.response);
      throw error;
    }
  }
);

// DELETE RECIPES
export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `http://localhost:3000/deleterecipe/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const recipesEntity = createEntityAdapter({
  selectId: (recipe) => recipe.id || recipe.data.id,
});

const recipeSlice = createSlice({
  name: "recipe",
  initialState: recipesEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRecipes.fulfilled, (state, action) => {
        recipesEntity.addOne(state, action.payload);
      })
      .addCase(detailRecipes.fulfilled, (state, action) => {
        recipesEntity.setOne(state, action.payload);
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        recipesEntity.updateOne(state, action.payload.data);
      })
      .addCase(getMyRecipe.fulfilled, (state, action) => {
        recipesEntity.setAll(state, action.payload.data);
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        recipesEntity.removeOne(state, action.payload);
      });
  },
});

export const recipesSelector = recipesEntity.getSelectors(
  (state) => state.recipes
);
export default recipeSlice.reducer;
