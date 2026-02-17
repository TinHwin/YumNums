import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

import SwitchSelector from 'react-native-switch-selector';
import * as Progress from 'react-native-progress';

import { auth } from '../firebase/firebaseConfig';

import { Dimensions } from 'react-native';

import {
    Soup,
    Book,
    ChartColumnIncreasing,
    CirclePlus,
    Heart,
    Timer,
    Flame,
    ThumbsUp,
    PiggyBank,
    Beef,
    Wheat,
    Hamburger,
    ImageIcon,
} from 'lucide-react-native';
import { AnalyzedInstructions, Nutrition, Recipe } from '../types/RecipeContextType';

const window = Dimensions.get('window');
const ratio = window.width / 100;

type RecipeInstructionsProps = {
    nutrition: Nutrition;
    analyzedInstructions: AnalyzedInstructions;
};

const RecipeInstructionsComponent = ({
    nutrition,
    analyzedInstructions,
}: RecipeInstructionsProps) => {
    if (!nutrition || nutrition.length === 0) {
        return <Text>No nutrition available</Text>
    }
    if (!analyzedInstructions || analyzedInstructions.length === 0) {
        return <Text>No instructions available</Text>
    }

    const equipments = new Set<string>();

    analyzedInstructions[0].steps.forEach(step => {
        step.equipment.forEach(equipment =>
            equipments.add(equipment.name)
        )
    });

    let SoupIconComponent = Soup;
    let TimerIconComponent = Timer;

    return (
        <View style={RecipeInstructionsAndNutritionStyle.recipeInstructionsContainerStyle}>
            <View style={RecipeInstructionsAndNutritionStyle.recipePrepCookTotalTimeServingsContainerStyle}>
                <View style={RecipeInstructionsAndNutritionStyle.recipePrepCookTimeContainerStyle}>
                    <View style={RecipeInstructionsAndNutritionStyle.recipeIconContainerStyle}>
                        <TimerIconComponent size={24} color={'black'} />
                        <Text style={RecipeInstructionsAndNutritionStyle.recipeIconTextContainerStyle}>Prep Time: </Text>
                        <Text>10 minutes</Text>
                    </View>
                    <View style={RecipeInstructionsAndNutritionStyle.recipeIconContainerStyle}>
                        <TimerIconComponent size={24} color={'black'} />
                        <Text style={RecipeInstructionsAndNutritionStyle.recipeIconTextContainerStyle}>Cook Time: </Text>
                        <Text>23 minutes</Text>
                    </View>
                </View>
                <View style={RecipeInstructionsAndNutritionStyle.recipeTotalTimeServingsContainerStyle}>
                    <View style={RecipeInstructionsAndNutritionStyle.recipeIconContainerStyle}>
                        <TimerIconComponent size={24} color={'black'} />
                        <Text style={RecipeInstructionsAndNutritionStyle.recipeIconTextContainerStyle}>Total Time: </Text>
                        <Text>50 minutes</Text>
                    </View>
                    <View style={RecipeInstructionsAndNutritionStyle.recipeIconContainerStyle}>
                        <SoupIconComponent size={24} color={'black'} />
                        <Text style={RecipeInstructionsAndNutritionStyle.recipeIconTextContainerStyle}>Servings: </Text>
                        <Text>10</Text>
                    </View>
                </View>
            </View>
            <Text style={RecipeInstructionsAndNutritionStyle.recipeIngredientsTextStyle}>
                Ingredients
            </Text>
            <View style={RecipeInstructionsAndNutritionStyle.recipeIngredientsContainerStyle}>
                {nutrition.ingredients.map(ingredient =>
                    <Text>
                        {'\u2022'} {ingredient.name}: {ingredient.amount} {ingredient.unit}
                    </Text>
                )}
            </View>
            <Text style={RecipeInstructionsAndNutritionStyle.recipeEquipmentsTextStyle}>
                Equipments
            </Text>
            <View style={RecipeInstructionsAndNutritionStyle.recipeEquipmentsContainerStyle}>
                {Array.from(equipments).map(equipment => (
                    <Text>
                        {'\u2022'} {equipment}
                    </Text>
                ))}
            </View>
            <Text style={RecipeInstructionsAndNutritionStyle.recipeInstructionsTitleTextStyle}>
                Instructions
            </Text>
            <View>
                {analyzedInstructions[0].steps.map(step =>
                    <View key={step.number}>
                        <Text style={RecipeInstructionsAndNutritionStyle.recipeInstructionsStepTextStyle}>
                            Step: {step.number}
                        </Text>
                        <Text style={RecipeInstructionsAndNutritionStyle.recipeInstructionsStepContentTextStyle}>
                            {step.step}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const RecipeNutritionsComponent = ({ recipe }: { recipe: Recipe }) => {
    let SoupIconComponent = Soup;
    let TimerIconComponent = Timer;

    const calories = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Calories');
    const protein = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Protein');
    const carbs = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Carbohydrates');
    const fat = recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Fat');

    return (
        <View>
            <View style={RecipeInstructionsAndNutritionStyle.recipeNutritionMainMacrosContainerStyle}>
                <View style={RecipeInstructionsAndNutritionStyle.recipeNutritionMainMarcosIconsContainerStyle}>
                    <View style={RecipeInstructionsAndNutritionStyle.recipeNutritionMarcosIconContainerStyle}>
                        <TimerIconComponent size={24} color={'black'} />
                        <Text>{calories?.amount ?? 0} kcal</Text>
                    </View>
                    <View style={RecipeInstructionsAndNutritionStyle.recipeNutritionMarcosIconContainerStyle}>
                        <TimerIconComponent size={24} color={'black'} />
                        <Text>{protein?.amount ?? 0}g of protein</Text>
                    </View>
                </View>
                <View style={RecipeInstructionsAndNutritionStyle.recipeNutritionMainMarcosIconsContainerStyle}>
                    <View style={RecipeInstructionsAndNutritionStyle.recipeNutritionMarcosIconContainerStyle}>
                        <TimerIconComponent size={24} color={'black'} />
                        <Text>{carbs?.amount ?? 0}g of carbs</Text>
                    </View>
                    <View style={RecipeInstructionsAndNutritionStyle.recipeNutritionMarcosIconContainerStyle}>
                        <SoupIconComponent size={24} color={'black'} />
                        <Text>{fat?.amount ?? 0}g of fat</Text>
                    </View>
                </View>
            </View>
            <View>
                {recipe.nutrition.nutrients.map(nutrient => 
                    <View>
                        <Text>
                            {nutrient.name}
                        </Text>
                        <Text>
                            {nutrient.amount}{nutrient.unit}
                        </Text>
                        <Progress.Bar progress={nutrient.percentOfDailyNeeds / 100} width={100} />
                    </View>
                )}
            </View>
        </View>
    );
};

const RecipeInstructionsAndNutritionScreen = ({ route }) => {
    const { recipe } = route.params;

    if (!recipe) {
        return <Text>Loading recipe...</Text>;
    }

    let SoupIconComponent = Soup;
    let BookIconComponent = Book;
    let ChartColumnIncreasingIconComponent = ChartColumnIncreasing;
    let CirclePlusIconComponent = CirclePlus;
    let TimerIconComponent = Timer;
    let FlameIconComponent = Flame;
    let ThumbsUpIconComponent = ThumbsUp;
    let HeartIconComponent = Heart;
    let PiggyBankIconComponent = PiggyBank;
    let BeefIconComponent = Beef;
    let WheatIconComponent = Wheat;
    let HamburgerIconComponent = Hamburger;

    const switchSelectorOptions = [
        { label: 'Instructions', value: 'instructions', customIcon: ({ selectedRecipeInfo }) => <BookIconComponent size={24} color={selectedRecipeInfo ? 'black' : 'white'} /> },
        { label: 'Nutrition', value: 'nutrition', customIcon: ({ selectedRecipeInfo }) => <ChartColumnIncreasingIconComponent size={24} color={!selectedRecipeInfo ? 'white' : 'black'} /> }
    ];

    const [selectedRecipeInfo, setSelectedRecipeInfo] = useState('instructions');

    return (
        <ScrollView style={RecipeInstructionsAndNutritionStyle.scrollViewScreenStyle}>
            <View style={RecipeInstructionsAndNutritionStyle.recipeHeaderContainerStyle}>
                <View>
                    <Image
                        style={RecipeInstructionsAndNutritionStyle.recipeImageStyle}
                        source={{ uri: recipe.image }}
                    />
                    <View style={RecipeInstructionsAndNutritionStyle.recipeLikesContainerStyle}>
                        <ThumbsUpIconComponent size={24} color={'white'} />
                        <Text style={[RecipeInstructionsAndNutritionStyle.recipeLikesTextStyle, { fontWeight: 'bold' }]}>
                            {recipe.aggregateLikes}
                        </Text>
                        <Text style={[RecipeInstructionsAndNutritionStyle.recipeLikesTextStyle, { fontWeight: 'bold' }]}>
                            Likes
                        </Text>
                    </View>
                </View>
                <View style={RecipeInstructionsAndNutritionStyle.recipeTitleContainerStyle}>
                    <View style={RecipeInstructionsAndNutritionStyle.recipeTitleLikesContainerStyle}>
                        <Text
                            style={RecipeInstructionsAndNutritionStyle.recipeTitleStyle}
                        >
                            {recipe.title}
                        </Text>
                    </View>
                    <View style={RecipeInstructionsAndNutritionStyle.recipeSaveAddButtonsContainerStyle}>
                        <View style={RecipeInstructionsAndNutritionStyle.recipeSaveButtonContainerStyle}>
                            <HeartIconComponent size={24} color={'white'} />
                            <Text style={RecipeInstructionsAndNutritionStyle.recipeSaveButtonTextStyle}>
                                Save
                            </Text>
                        </View>
                        <View style={RecipeInstructionsAndNutritionStyle.recipeAddButtonContainerStyle}>
                            <CirclePlusIconComponent size={24} color={'white'} />
                            <Text style={RecipeInstructionsAndNutritionStyle.recipeAddButtonTextStyle}>
                                Add
                            </Text>
                        </View>
                    </View>
                </View>
                <Text>
                    {recipe.summary?.replace(/<[^>]+>/g, '')}
                </Text>
            </View>
            <View style={RecipeInstructionsAndNutritionStyle.switchOperatorStyle}>
                <SwitchSelector
                    options={switchSelectorOptions}
                    initial={0}
                    onPress={value => setSelectedRecipeInfo(value)}
                    buttonColor={'#90BE6D'}
                    borderColor={'#90BE6D'}
                    hasPadding
                />
            </View>
            <View>
                {selectedRecipeInfo === 'instructions' && <RecipeInstructionsComponent nutrition={recipe.nutrition} analyzedInstructions={recipe.analyzedInstructions} />}
                {selectedRecipeInfo === 'nutrition' && <RecipeNutritionsComponent recipe={recipe} />}
            </View>
        </ScrollView>
    );
};

const RecipeInstructionsAndNutritionStyle = StyleSheet.create({
    scrollViewScreenStyle: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    recipeHeaderContainerStyle: {
        backgroundColor: 'whitesmoke',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 10,
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    recipeImageStyle: {
        width: window.width - 40,
        height: 80 * ratio,
        borderRadius: 20
    },
    recipeTitleContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
    },
    recipeTitleStyle: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
    },
    recipeTitleLikesContainerStyle: {
        flex: 1,
        flexDirection: 'row',
    },
    recipeLikesContainerStyle: {
        position: 'absolute',
        backgroundColor: 'cornflowerblue',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 5,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    recipeLikesTextStyle: {
        color: 'white'
    },
    recipeSaveAddButtonsContainerStyle: {
        flexDirection: 'row',
        gap: 5
    },
    recipeSaveButtonContainerStyle: {
        flexDirection: 'row',
        backgroundColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 5,
        borderRadius: 10
    },
    recipeSaveButtonTextStyle: {
        color: 'white',
        fontWeight: 'bold'
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
        color: 'white',
        fontWeight: 'bold'
    },
    recipeSummaryStyle: {

    },
    recipeInstructionsContainerStyle: {
        gap: 10,
        margin: 10,
        borderRadius: 10
    },
    recipePrepCookTotalTimeServingsContainerStyle: {
        flexDirection: 'column',
        marginBottom: 20,
        padding: 10,
        gap: 10,
        borderWidth: 0.5,
        borderTopWidth: 10,
        borderTopColor: '#90BE6D',
        borderColor: '#90BE6D',
        borderRadius: 10,
    },
    recipePrepCookTimeContainerStyle: {
        flexDirection: 'row',
    },
    recipeTotalTimeServingsContainerStyle: {
        flexDirection: 'row',
    },
    recipeIconContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    recipeIconTextContainerStyle: {
        fontWeight: 'bold'
    },
    recipeIngredientsTextStyle: {
        fontWeight: 'bold',
    },
    recipeIngredientsContainerStyle: {
        marginBottom: 10
    },
    recipeEquipmentsTextStyle: {
        fontWeight: 'bold',
    },
    recipeEquipmentsContainerStyle: {
        marginBottom: 20
    },
    recipeInstructionsTitleTextStyle: {
        marginBottom: 10,
        fontWeight: 'bold'
    },
    recipeInstructionsStepTextStyle: {
        marginBottom: 10,
        fontWeight: 'bold'
    },
    recipeInstructionsStepContentTextStyle: {
        marginBottom: 10,
    },
    switchOperatorStyle: {
        margin: 10,
    },


    // Nutrition Styles
    recipeNutritionContainerStyle: {
        gap: 10,
        margin: 10,
        borderRadius: 10
    },
    recipeNutritionMainMacrosContainerStyle: {
        flexDirection: 'column',
        marginBottom: 20,
        padding: 10,
        gap: 10,
        borderWidth: 0.5,
        borderTopWidth: 10,
        borderTopColor: '#90BE6D',
        borderColor: '#90BE6D',
        borderRadius: 10,
    },
    recipeNutritionMainMarcosIconsContainerStyle: {
        flexDirection: 'row',
    },
    recipeNutritionMarcosIconContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    recipeNutritionMarcosIconTitleStyle: {
        fontWeight: 'bold'
    },
});

export default RecipeInstructionsAndNutritionScreen;
