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
  Modal,
  Button
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { useNavigation } from '@react-navigation/native';

import { Recipe } from '../types/RecipeContextType';
import { useRecipeContext } from '../contexts/RecipeContext';

import SafeAreaScreen from '../components/layouts/SafeAreaScreen';
import Icon from '../components/icons/Icon';
import { Colors } from '../styles/themes/colors';
import { Spacing } from '../styles/themes/spacing';
import { Radius } from '../styles/themes/radius';

import { RecipeCard } from '../components/RecipeCard';

const RecipeSearchScreen = () => {
  const { fetchComplexSearchRecipes } = useRecipeContext();

  const [search, setSearch] = useState('');
  const [searchRecipes, setSearchRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSearchRecipes = async () => {
      try {
        const storedSearchRecipes = await AsyncStorage.getItem('searchRecipes');

        if (storedSearchRecipes) setSearchRecipes(JSON.parse(storedSearchRecipes));
      } catch (error) {
        console.error('Failed to load search recipes from AsyncStorage', error);
      }
    };

    loadSearchRecipes();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('searchRecipes', JSON.stringify(searchRecipes));
  }, [searchRecipes]);

  const handleClearSearchBar = () => {
    setSearch('');
  }

  const handleComplexSearchRecipesSubmit = async () => {
    if (search.trim() === '') return;

    setLoading(true);

    try {
      const complexSearchRecipesResults = await fetchComplexSearchRecipes(search);

      if (complexSearchRecipesResults && complexSearchRecipesResults.length > 0) {
        console.log('Fetch Return: ', complexSearchRecipesResults);
        setSearchRecipes(complexSearchRecipesResults);

      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarTextInputContainer}>
          <Icon name='Search' color='black' size={24} />
          <TextInput
            style={styles.searchBarTextInput}
            placeholder='Search recipe...'
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleComplexSearchRecipesSubmit}
            returnKeyType='search'
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={handleClearSearchBar}>
              <Icon name='X' color='black' size={24} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView style={styles.recipeResultsScrollView}>
        <View style={styles.recipeResultsContainer}>
          {searchRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} toggleMealButton='Add' />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main
  screen: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    marginBottom: Spacing.xxl * 2
  },
  // Search Bar
  searchBarContainer: {
    backgroundColor: Colors.primary
  },
  searchBarTextInputContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Spacing.sm,
    padding: Spacing.sm,
    borderColor: Colors.onPrimary,
    borderWidth: 1,
    borderRadius: Radius.round
  },
  searchBarTextInput: {
    flex: 1,
    marginLeft: Spacing.xs,
    marginRight: Spacing.xs
  },
  // Recipe Results
  recipeResultsScrollView: {
    flexGrow: 1
  },
  recipeResultsContainer: {
    padding: Spacing.sm
  },
});

export default RecipeSearchScreen;
