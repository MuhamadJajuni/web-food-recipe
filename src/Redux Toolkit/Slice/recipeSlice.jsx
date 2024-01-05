import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";


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
  async ({ id, title, ingredients, videolink, category_id, image }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:3000/updateRecipe/${id}`,
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
  'recipes/detailRecipes',
  async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Adjust content type if necessary
        },
      });

      console.log('Server Response:', response.data);

      return response.data;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      console.log('Error Response:', error.response); // Log the error response
      throw error; // Rethrow the error to propagate it to the caller
    }
  }
);


// GET MY RECIPES
export const getMyRecipes = createAsyncThunk(
  "recipes/getMyRecipes",
  async ({ page }) => {
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
  selectId: (recipe) => recipe.data.id,
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
        recipesEntity.updateOne(state, action.payload);
      })
      .addCase(getMyRecipes.fulfilled, (state, action) => {
        recipesEntity.upsertMany(state, action.payload);
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
