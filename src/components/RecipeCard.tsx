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

import { useNavigation } from '@react-navigation/native';

import { Recipe } from '../types/RecipeContextType';
import { useRecipeContext } from '../contexts/RecipeContext';

import SafeAreaScreen from '../components/layouts/SafeAreaScreen';
import Icon from '../components/icons/Icon';

import { Colors } from '../styles/themes/colors';
import { Spacing } from '../styles/themes/spacing';
import { Radius } from '../styles/themes/radius';

import { RecipeDateTimePicker } from './RecipeDateTimePicker';

type RecipeCardProps = {
    recipe: Recipe;
    toggleMealButton: 'Add' | 'Remove' | 'None';
};

export const RecipeCard = ({ recipe, toggleMealButton }: RecipeCardProps) => {
    const [recipeDateTimePickerVisible, setRecipeDateTimePickerVisible] = useState(false);

    const navigation = useNavigation()

    const price = (recipe.pricePerServing / 100).toFixed(2);
    const calories = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Calories');
    const servings = recipe.servings;
    const protein = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Protein');
    const carbs = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Carbohydrates');
    const fat = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Fat');
    const prepTime = recipe?.preparationMinutes;
    const cookTime = recipe?.cookingMinutes;
    const totalTime = recipe?.readyInMinutes;

    return (
        <View style={styles.recipeContainer}>
            <View style={styles.recipeHeaderContainer}>
                <View style={styles.recipeTitleContainer}>
                    <Text style={styles.recipeTitle}>
                        {recipe.title}
                    </Text>
                </View>
                <View style={styles.recipeHeaderButtonsContainer}>
                    <View style={styles.recipeSaveButtonContainer}>
                        <Icon name='Heart' size={24} color={'white'} />
                        <Text style={styles.recipeSaveText}>Save</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.recipeAddButtonContainer}
                        onPress={() => {
                            if (toggleMealButton === 'Add') {
                                setRecipeDateTimePickerVisible(true)
                            } else if (toggleMealButton === 'Remove') {

                            }
                        }}
                    >
                        <Icon name={toggleMealButton === 'Add' ? 'CirclePlus' : 'CircleX'} size={24} color={'white'} />
                        <Text style={styles.recipeAddText}>
                            {toggleMealButton === 'Add' ? 'Add' : 'Remove'}
                        </Text>
                    </TouchableOpacity>
                    <RecipeDateTimePicker
                        recipe={recipe}
                        visible={recipeDateTimePickerVisible}
                        onClose={() => setRecipeDateTimePickerVisible(false)}
                    />
                </View>
            </View>
            <View style={styles.recipeBodyContainer}>
                <Image
                    source={{ uri: recipe.image }}
                    style={styles.recipeImage}
                />
                <View style={styles.recipeLikesContainer}>
                    <Icon name='ThumbsUp' size={16} color={'white'} />
                    <Text style={styles.recipeLikesText}>
                        {recipe.aggregateLikes ?? 0}
                    </Text>
                    <Text style={styles.recipeLikesText}>likes</Text>
                </View>
                <View style={styles.recipeSummaryContainer}>
                    <Text
                        numberOfLines={8}
                    >
                        {recipe.summary?.replace(/<[^>]+>/g, '')}
                    </Text>
                </View>
            </View>
            <View style={styles.recipeFooterContainer}>
                <View style={styles.recipeFooterIconsContainer}>
                    <View style={styles.recipeFooterIconContainer}>
                        <Icon name='PiggyBank' size={16} color={Colors.secondary} />
                        <View>
                            <Text style={styles.recipeIconText}>${price}</Text>
                            <Text>per serving</Text>
                        </View>
                        <View>
                        </View>
                    </View>
                    <View style={styles.recipeFooterIconContainer}>
                        <Icon name='Flame' size={16} color={Colors.secondary} />
                        <View>
                            <Text style={styles.recipeIconText}>{Math.round(calories?.amount ?? 0)} kcal</Text>
                            <Text>per serving</Text>
                        </View>
                        <View>
                        </View>
                    </View>
                    <View style={styles.recipeFooterIconContainer}>
                        <Icon name='Soup' size={16} color={Colors.secondary} />
                        <View>
                            <Text><Text style={styles.recipeIconText}>{servings}</Text> servings</Text>
                        </View>
                        <View>
                        </View>
                    </View>
                </View>
                <View style={styles.recipeFooterIconsContainer}>
                    <View style={styles.recipeFooterIconContainer}>
                        <Icon name='Beef' size={16} color={Colors.secondary} />
                        <View>
                            <Text style={styles.recipeIconText}>{protein?.amount?.toFixed(1)}g</Text>
                            <Text>per serving</Text>
                        </View>
                        <View>
                        </View>
                    </View>
                    <View style={styles.recipeFooterIconContainer}>
                        <Icon name='Wheat' size={16} color={Colors.secondary} />
                        <View>
                            <Text style={styles.recipeIconText}>{carbs?.amount?.toFixed(1)}g</Text>
                            <Text>per serving</Text>
                        </View>
                        <View>
                        </View>
                    </View>
                    <View style={styles.recipeFooterIconContainer}>
                        <Icon name='Hamburger' size={16} color={Colors.secondary} />
                        <View>
                            <Text style={styles.recipeIconText}>{fat?.amount?.toFixed(1)}g</Text>
                            <Text>per serving</Text>
                        </View>
                        <View>
                        </View>
                    </View>
                </View>
                <View style={styles.recipeFooterIconsContainer}>
                    <View style={styles.recipeFooterIconContainer}>
                        <Icon name='Timer' size={16} color={Colors.secondary} />
                        <View>
                            <Text>Prep Time:</Text>
                            <Text style={styles.recipeIconText}>{prepTime != null ? `${prepTime} minutes` : 'N/A'}</Text>
                        </View>
                        <View>
                        </View>
                    </View>
                    <View style={styles.recipeFooterIconContainer}>
                        <Icon name='Timer' size={16} color={Colors.secondary} />
                        <View>
                            <Text>Cooking Time:</Text>
                            <Text style={styles.recipeIconText}>{cookTime != null ? `${cookTime} minutes` : 'N/A'}</Text>
                        </View>
                        <View>
                        </View>
                    </View>
                    <View style={styles.recipeFooterIconContainer}>
                        <Icon name='Timer' size={16} color={Colors.secondary} />
                        <View>
                            <Text>Total Time:</Text>
                            <Text style={styles.recipeIconText}>{totalTime != null ? `${totalTime} minutes` : 'N/A'}</Text>
                        </View>
                        <View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.recipeFooterButtonsContainer}>
                <TouchableOpacity
                    style={styles.recipeInstructionsButtonContainer}
                    onPress={() => navigation.navigate('Recipe Instructions & Nutrition', { recipe })}
                >
                    <Icon name='Book' size={24} color={'white'} />
                    <Text style={styles.recipeInstructionsText}>
                        Instructions
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.recipeNutritionButtonContainer}
                    onPress={() => navigation.navigate('Recipe Instructions & Nutrition', { recipe })}
                >
                    <Icon name='ChartColumnIncreasing' size={24} color={'white'} />
                    <Text style={styles.recipeNutritionText}>
                        Nutrition
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    // Recipe
    recipeContainer: {
        flex: 1,
        backgroundColor: Colors.surface,
        marginBottom: Spacing.xl,
        padding: Spacing.md,
        borderRadius: Radius.md
    },
    // Recipe Header
    recipeHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
        gap: Spacing.md
    },
    recipeTitleContainer: {
        flex: 1,
        width: 140,
        flexDirection: 'row',
        alignItems: 'center',
    },
    recipeTitle: {
        fontWeight: 'bold'
    },
    recipeHeaderButtonsContainer: {
        flexDirection: 'row',
        gap: Spacing.md
    },
    recipeSaveButtonContainer: {
        flexDirection: 'row',
        backgroundColor: 'tomato',
        alignItems: 'center',
        padding: Spacing.md,
        gap: Spacing.sm,
        borderRadius: Radius.md
    },
    recipeSaveText: {
        color: 'white',
        fontWeight: 'bold'
    },
    recipeAddButtonContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        alignItems: 'center',
        padding: Spacing.md,
        gap: Spacing.sm,
        borderRadius: Radius.md
    },
    recipeAddText: {
        color: 'white',
        fontWeight: 'bold'
    },
    // Recipe Body
    recipeBodyContainer: {
        flexDirection: 'row',
        marginBottom: Spacing.md,
        gap: Spacing.md,
    },
    recipeImage: {
        width: 140,
        height: 140,
        borderRadius: Radius.md
    },
    recipeLikesContainer: {
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: 'cornflowerblue',
        padding: Spacing.sm,
        gap: Spacing.xs,
        borderTopLeftRadius: Radius.md,
        borderBottomRightRadius: Radius.md
    },
    recipeLikesText: {
        color: 'white',
        fontWeight: 'bold'
    },
    recipeSummaryContainer: {
        flex: 1,
        maxHeight: 140,

    },
    // Recipe Footer
    recipeFooterContainer: {
        flexDirection: 'column'
    },
    recipeFooterIconsContainer: {
        flexDirection: 'row',
        marginBottom: Spacing.md,
        gap: Spacing.md
    },
    recipeFooterIconContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: Spacing.sm
    },
    recipeIconText: {
        fontWeight: 'bold'
    },
    recipeFooterButtonsContainer: {
        flexDirection: 'row',
        gap: Spacing.md
    },
    recipeInstructionsButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.md,
        gap: Spacing.sm,
        borderRadius: Radius.md
    },
    recipeInstructionsText: {
        color: 'white',
        fontWeight: 'bold'
    },
    recipeNutritionButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.md,
        gap: Spacing.sm,
        borderRadius: Radius.md
    },
    recipeNutritionText: {
        color: 'white',
        fontWeight: 'bold'
    }
})