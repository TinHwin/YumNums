import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
  Search,
  X,
  Soup,
  Book,
  ChartColumnIncreasing,
  CirclePlus,
  Timer,
  Flame,
  ThumbsUp,
  PiggyBank,
  Beef,
  Wheat,
  Hamburger,
} from 'lucide-react-native';

import { Recipe } from '../types/RecipeContextType';
import { useRecipeContext } from '../contexts/RecipeContext';

const RecipeSearchScreen = () => {
  let SearchIconComponent = Search;
  let XIconComponent = X;
  let SoupIconComponent = Soup;
  let BookIconComponent = Book;
  let ChartColumnIncreasingIconComponent = ChartColumnIncreasing;
  let CirclePlusIconComponent = CirclePlus;
  let TimerIconComponent = Timer;
  let FlameIconComponent = Flame;
  let ThumbsUpIconComponent = ThumbsUp;
  let PiggyBankIconComponent = PiggyBank;
  let BeefIconComponent = Beef;
  let WheatIconComponent = Wheat;
  let HamburgerIconComponent = Hamburger;

  const { fetchComplexSearchRecipes, savedRecipes, setSavedRecipes } = useRecipeContext();

  const [search, setSearch] = useState('');
  const [searchRecipes, setSearchRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClearSearchBar = () => {
    setSearch('');
  }

  const handleComplexSearchRecipesSubmit = async () => {
    if (search.trim() === '') return;

    setLoading(true);

    try {
      const complexSearchRecipesResults = await fetchComplexSearchRecipes(search);

      if (complexSearchRecipesResults) {
        console.log('Fetch Return: ', complexSearchRecipesResults);
        setSearchRecipes(complexSearchRecipesResults);
      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }

  const RecipeComponent = ({ recipe }: { recipe: Recipe }) => {
    const navigation = useNavigation()

    const calories = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Calories');
    const protein = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Protein');
    const carbs = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Carbohydrates');
    const fat = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Fat');

    return (
      <View style={RecipeSearchStyle.recipeSearchResultContainerStyle}>
        <View style={RecipeSearchStyle.recipeHeaderContainerStyle}>
          <View style={RecipeSearchStyle.recipeTitleContainerStyle}>
            <Text style={RecipeSearchStyle.recipeTitleStyle}>
              {recipe.title}
            </Text>
            <View style={RecipeSearchStyle.recipeLikesContainerStyle}>
              <ThumbsUpIconComponent size={16} color={'white'} />
              <Text style={RecipeSearchStyle.recipeLikesTextStyle}>
                {recipe.aggregateLikes ?? 0}
              </Text>
              <Text style={RecipeSearchStyle.recipeLikesTextStyle}>likes</Text>
            </View>
          </View>
          <View style={RecipeSearchStyle.recipeAddButtonContainerStyle}>
            <CirclePlusIconComponent size={24} color={'white'} />
            <Text style={RecipeSearchStyle.recipeAddButtonTextStyle}>
              Add
            </Text>
          </View>
        </View>
        <View style={RecipeSearchStyle.recipeBodyContainerStyle}>
          <Image
            source={{ uri: recipe.image }}
            style={RecipeSearchStyle.recipeImageStyle}
          />
          <View style={RecipeSearchStyle.recipeSummaryContainerStyle}>
            <Text
              style={RecipeSearchStyle.recipeSummaryTextStyle}
              numberOfLines={2}
            >
              {recipe.summary?.replace(/<[^>]+>/g, '')}
            </Text>
            <View>
              <View style={RecipeSearchStyle.recipeSummaryIconsContainerStyle}>
                <View style={RecipeSearchStyle.recipeSummaryIconContainerStyle}>
                  <TimerIconComponent size={16} color={'black'} />
                  <View style={RecipeSearchStyle.recipeSummaryIconTextsContainerStyle}>
                    <Text>Ready in </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                      {recipe.readyInMinutes} minutes
                    </Text>
                  </View>
                </View>
              </View>
              <View style={RecipeSearchStyle.recipeSummaryIconsContainerStyle}>
                <View style={RecipeSearchStyle.recipeSummaryIconTextsContainerStyle}>
                  <SoupIconComponent size={16} color={'black'} />
                  <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>
                    {recipe.servings}
                  </Text>
                  <Text> servings</Text>
                </View>
                <View style={RecipeSearchStyle.recipeSummaryIconTextsContainerStyle}>
                  <PiggyBankIconComponent size={16} color={'darkseagreen'} />
                  <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>
                    ${recipe.pricePerServing?.toFixed(2)}
                  </Text>
                  <Text> per serving</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={RecipeSearchStyle.recipeFooterIconsContainerStyle}>
          <View style={RecipeSearchStyle.recipeFooterIconContainerStyle}>
            <FlameIconComponent size={16} color={'salmon'} />
            <View>
              <Text style={{ fontWeight: 'bold' }}>
                {Math.round(calories?.amount ?? 0)} kcal
              </Text>
              <Text>per serving</Text>
            </View>
          </View>
          <View style={RecipeSearchStyle.recipeFooterIconContainerStyle}>
            <BeefIconComponent size={16} color={'firebrick'} />
            <View>
              <Text style={{ fontWeight: 'bold' }}>
                {protein?.amount?.toFixed(1)}g
              </Text>
              <Text>of protein</Text>
            </View>
          </View>
          <View style={RecipeSearchStyle.recipeFooterIconContainerStyle}>
            <WheatIconComponent size={16} color={'goldenrod'} />
            <View>
              <Text style={{ fontWeight: 'bold' }}>
                {carbs?.amount?.toFixed(1)}g
              </Text>
              <Text>of carbs</Text>
            </View>
          </View>
          <View style={RecipeSearchStyle.recipeFooterIconContainerStyle}>
            <HamburgerIconComponent size={16} color={'darkorange'} />
            <View>
              <Text style={{ fontWeight: 'bold' }}>
                {fat?.amount?.toFixed(1)}g
              </Text>
              <Text>of fat</Text>
            </View>
          </View>
        </View>
        <View style={RecipeSearchStyle.recipeFooterButtonsContainerStyle}>
          <TouchableOpacity style={RecipeSearchStyle.recipeInstructionsButtonContainerStyle}>
            <BookIconComponent size={24} color={'white'} />
            <Text 
              onPress={() => navigation.navigate('Recipe Instructions & Nutrition', { recipe })}
              style={RecipeSearchStyle.recipeInstructionsButtonTextStyle}>
              Instructions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={RecipeSearchStyle.recipeNutritionButtonContainerStyle}>
            <ChartColumnIncreasingIconComponent size={24} color={'white'} />
            <Text
              onPress={() => navigation.navigate('Recipe Instructions & Nutrition', { recipe })}
              style={RecipeSearchStyle.recipeNutritionButtonTextStyle}
            >
              Nutrition
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={RecipeSearchStyle.screenStyle}>
      <View style={RecipeSearchStyle.searchBarContainerStyle}>
        <View style={RecipeSearchStyle.searchBarTextInputContainerStyle}>
          <SearchIconComponent size={24} color='black' />
          <TextInput
            style={RecipeSearchStyle.searchBarTextInputStyle}
            placeholder='Search recipe...'
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleComplexSearchRecipesSubmit}
            returnKeyType='search'
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={handleClearSearchBar}>
              <XIconComponent size={24} color='black' />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView style={RecipeSearchStyle.recipeSearchResultsScrollViewStyle}>
        <View style={RecipeSearchStyle.recipeSearchResultsContainerStyle}>
          {searchRecipes.map(recipe => (
            <RecipeComponent key={recipe.id} recipe={recipe} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const SEARCH_ICON_SIZE = 24;

const RecipeSearchStyle = StyleSheet.create({
  screenStyle: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
  searchBarContainerStyle: {
    backgroundColor: '#90BE6D',
  },
  searchBarTextInputContainerStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderColor: 'dimgray',
    borderWidth: 1,
    borderRadius: 100,
  },
  searchBarTextInputStyle: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  recipeSearchResultsScrollViewStyle: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
  recipeSearchResultsContainerStyle: {
    padding: 10,
  },
  recipeSearchResultContainerStyle: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  recipeHeaderContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  recipeTitleContainerStyle: {
    flexDirection: 'row',
    width: 100,
    alignItems: 'center',
    gap: 10
  },
  recipeTitleStyle: {
    fontWeight: 'bold'
  },
  recipeLikesContainerStyle: {
    flexDirection: 'row',
    backgroundColor: 'cornflowerblue',
    alignItems: 'center',
    padding: 5,
    gap: 5,
    borderRadius: 10
  },
  recipeLikesTextStyle: {
    color: 'white'
  },
  recipeAddButtonContainerStyle: {
    flexDirection: 'row',
    backgroundColor: '#90BE6D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 5,
    borderRadius: 10
  },
  recipeAddButtonTextStyle: {
    color: 'white'
  },
  recipeBodyContainerStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 10
  },
  recipeImageStyle: {
    width: 100,
    height: 100,
    borderRadius: 20
  },
  recipeSummaryContainerStyle: {
    flex: 1,
    flexShrink: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
  },
  recipeSummaryTextStyle: {
    flex: 1,
  },
  recipeSummaryIconsContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    gap: 10,
  },
  recipeSummaryIconContainerStyle: {
    flexDirection: 'row',
    gap: 5
  },
  recipeSummaryIconTextsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeSummaryIconTextStyle: {
    flexDirection: 'row',
    marginBottom: 10
  },
  recipeFooterIconsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  recipeFooterIconContainerStyle: {
    flexDirection: 'row',
    gap: 5
  },
  recipeFooterButtonsContainerStyle: {
    flexDirection: 'row',
    gap: 10
  },
  recipeInstructionsButtonContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#90BE6D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 5,
    borderRadius: 10,
  },
  recipeInstructionsButtonTextStyle: {
    color: 'white'
  },
  recipeNutritionButtonContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#90BE6D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 5,
    borderRadius: 10,
  },
  recipeNutritionButtonTextStyle: {
    color: 'white'
  }
});

export default RecipeSearchScreen;
