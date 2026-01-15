import React, {
  useState,
  useEffect
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useUserGoalsAndPreferencesContext } from '../contexts/UserGoalsAndPreferencesContext';


const UserGoalsAndPreferencesScreen = () => {
  const {
    weeklyBudget,
    weeklyCalories,
    diets,
    intolerances,
    setWeeklyBudget,
    setWeeklyCalories,
    toggleDiet,
    toggleIntolerance
  } = useUserGoalsAndPreferencesContext();

  const saveData = async () => {

  };

  return (
    <ScrollView style={UserGoalsAndPreferencesScreenStyles.scrollViewStyle}>
      <View style={UserGoalsAndPreferencesScreenStyles.textInputContainerStyle}>
        <Text style={UserGoalsAndPreferencesScreenStyles.textStyle}>
          Weekly Budget Goal
        </Text>
        <TextInput
          style={UserGoalsAndPreferencesScreenStyles.textInputStyle}
          value={weeklyBudget}
          placeholder='Enter budget'
          onChangeText={setWeeklyBudget}
        />
      </View>
      <View style={UserGoalsAndPreferencesScreenStyles.textInputContainerStyle}>
        <Text style={UserGoalsAndPreferencesScreenStyles.textStyle}>
          Weekly Calories Intake Goal
        </Text>
        <TextInput
          style={UserGoalsAndPreferencesScreenStyles.textInputStyle}
          value={weeklyCalories}
          placeholder='Enter calories intake'
          onChangeText={setWeeklyCalories}
        />
      </View>
      <Text style={UserGoalsAndPreferencesScreenStyles.textStyle}>Dietary Preferences</Text>
      <View style={UserGoalsAndPreferencesScreenStyles.dietContainerStyle}>
        <View style={UserGoalsAndPreferencesScreenStyles.dietCheckboxContainerStyle}>
          <BouncyCheckbox
            text='Gluten Free'
            textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
            unFillColor='white'
            fillColor='black'
            size={24}
            isChecked={diets.glutenFree}
            onPress={() => toggleDiet('glutenFree')}
          />
          <Text style={UserGoalsAndPreferencesScreenStyles.dietDescriptionStyle}>
            Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated).
          </Text>
        </View>
        <View style={UserGoalsAndPreferencesScreenStyles.dietCheckboxContainerStyle}>
          <BouncyCheckbox
            text='Ketogenic'
            textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
            unFillColor='white'
            fillColor='black'
            size={24}
            isChecked={diets.ketogenic}
            onPress={() => toggleDiet('ketogenic')}
          />
          <Text style={UserGoalsAndPreferencesScreenStyles.dietDescriptionStyle}>
            The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not. The formula we use is 55-80% fat content, 15-35% protein content, and under 10% of carbohydrates.
          </Text>
        </View>
        <View style={UserGoalsAndPreferencesScreenStyles.dietCheckboxContainerStyle}>
          <BouncyCheckbox
            text='Vegetarian'
            textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
            unFillColor='white'
            fillColor='black'
            size={24}
            isChecked={diets.vegetarian}
            onPress={() => toggleDiet('vegetarian')}
          />
          <Text style={UserGoalsAndPreferencesScreenStyles.dietDescriptionStyle}>
            No ingredients may contain meat or meat by-products, such as bones or gelatin.
          </Text>
        </View>
        <View style={UserGoalsAndPreferencesScreenStyles.dietCheckboxContainerStyle}>
          <BouncyCheckbox
            text='Lacto-Vegetarian'
            textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
            unFillColor='white'
            fillColor='black'
            size={24}
            isChecked={diets.lactoVegetarian}
            onPress={() => toggleDiet('lactoVegetarian')}
          />
          <Text style={UserGoalsAndPreferencesScreenStyles.dietDescriptionStyle}>
            All ingredients must be vegetarian and none of the ingredients can be or contain egg.
          </Text>
        </View>
        <View style={UserGoalsAndPreferencesScreenStyles.dietCheckboxContainerStyle}>
          <BouncyCheckbox
            text='Ovo-Vegetarian'
            textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
            unFillColor='white'
            fillColor='black'
            size={24}
            isChecked={diets.ovoVegetarian}
            onPress={() => toggleDiet('ovoVegetarian')}
          />
          <Text style={UserGoalsAndPreferencesScreenStyles.dietDescriptionStyle}>
            All ingredients must be vegetarian and none of the ingredients can be or contain dairy.
          </Text>
        </View>
        <View style={UserGoalsAndPreferencesScreenStyles.dietCheckboxContainerStyle}>
          <BouncyCheckbox
            text='Vegan'
            textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
            unFillColor='white'
            fillColor='black'
            size={24}
            isChecked={diets.vegan}
            onPress={() => toggleDiet('vegan')}
          />
          <Text style={UserGoalsAndPreferencesScreenStyles.dietDescriptionStyle}>
            No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.
          </Text>
        </View>
        <View style={UserGoalsAndPreferencesScreenStyles.dietCheckboxContainerStyle}>
          <BouncyCheckbox
            text='Pescetarian'
            textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
            unFillColor='white'
            fillColor='black'
            size={24}
            isChecked={diets.pescetarian}
            onPress={() => toggleDiet('pescetarian')}
          />
          <Text style={UserGoalsAndPreferencesScreenStyles.dietDescriptionStyle}>
            Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not.
          </Text>
        </View>
        <View style={UserGoalsAndPreferencesScreenStyles.dietCheckboxContainerStyle}>
          <BouncyCheckbox
            text='Paleo'
            textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
            unFillColor='white'
            fillColor='black'
            size={24}
            isChecked={diets.paleo}
            onPress={() => toggleDiet('paleo')}
          />
          <Text style={UserGoalsAndPreferencesScreenStyles.dietDescriptionStyle}>
            Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.
          </Text>
        </View>
        <View style={UserGoalsAndPreferencesScreenStyles.dietCheckboxContainerStyle}>
          <BouncyCheckbox
            text='Primal'
            textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
            unFillColor='white'
            fillColor='black'
            size={24}
            isChecked={diets.primal}
            onPress={() => toggleDiet('primal')}
          />
          <Text style={UserGoalsAndPreferencesScreenStyles.dietDescriptionStyle}>
            Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.
          </Text>
        </View>
        <View style={UserGoalsAndPreferencesScreenStyles.dietCheckboxContainerStyle}>
          <BouncyCheckbox
            text='Low FODMAP'
            textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
            unFillColor='white'
            fillColor='black'
            size={24}
            isChecked={diets.lowFODMAP}
            onPress={() => toggleDiet('lowFODMAP')}
          />
          <Text style={UserGoalsAndPreferencesScreenStyles.dietDescriptionStyle}>
            FODMAP stands for "fermentable oligo-, di-, mono-saccharides and polyols". Our ontology knows which foods are considered high in these types of carbohydrates (e.g. legumes, wheat, and dairy products)
          </Text>
        </View>
        <View style={UserGoalsAndPreferencesScreenStyles.dietCheckboxContainerStyle}>
          <BouncyCheckbox
            text='Whole30'
            textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
            unFillColor='white'
            fillColor='black'
            size={24}
            isChecked={diets.whole30}
            onPress={() => toggleDiet('whole30')}
          />
          <Text style={UserGoalsAndPreferencesScreenStyles.dietDescriptionStyle}>
            Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.
          </Text>
        </View>
      </View>

      <View style={UserGoalsAndPreferencesScreenStyles.intolerancesContainerStyle}>
        <Text style={UserGoalsAndPreferencesScreenStyles.intolerancesTitleStyle}>Intolerances</Text>
        <BouncyCheckbox
          text='Dairy'
          textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
          unFillColor='white'
          fillColor='black'
          size={24}
          isChecked={intolerances.dairy}
          onPress={() => toggleIntolerance('dairy')}
        />
        <BouncyCheckbox
          text='Egg'
          textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
          unFillColor='white'
          fillColor='black'
          size={24}
          isChecked={intolerances.egg}
          onPress={() => toggleIntolerance('egg')}
        />
        <BouncyCheckbox
          text='Gluten'
          textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
          unFillColor='white'
          fillColor='black'
          size={24}
          isChecked={intolerances.gluten}
          onPress={() => toggleIntolerance('gluten')}
        />
        <BouncyCheckbox
          text='Grain'
          textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
          unFillColor='white'
          fillColor='black'
          size={24}
          isChecked={intolerances.grain}
          onPress={() => toggleIntolerance('grain')}
        />
        <BouncyCheckbox
          text='Peanut'
          textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
          unFillColor='white'
          fillColor='black'
          size={24}
          isChecked={intolerances.peanut}
          onPress={() => toggleIntolerance('peanut')}
        />
        <BouncyCheckbox
          text='Seafood'
          textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
          unFillColor='white'
          fillColor='black'
          size={24}
          isChecked={intolerances.seafood}
          onPress={() => toggleIntolerance('seafood')}
        />
        <BouncyCheckbox
          text='Sesame'
          textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
          unFillColor='white'
          fillColor='black'
          size={24}
          isChecked={intolerances.sesame}
          onPress={() => toggleIntolerance('sesame')}
        />
        <BouncyCheckbox
          text='Shellfish'
          textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
          unFillColor='white'
          fillColor='black'
          size={24}
          isChecked={intolerances.shellfish}
          onPress={() => toggleIntolerance('shellfish')}
        />
        <BouncyCheckbox
          text='Soy'
          textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
          unFillColor='white'
          fillColor='black'
          size={24}
          isChecked={intolerances.soy}
          onPress={() => toggleIntolerance('soy')}
        />
        <BouncyCheckbox
          text='Sulfite'
          textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
          unFillColor='white'
          fillColor='black'
          size={24}
          isChecked={intolerances.sulfite}
          onPress={() => toggleIntolerance('sulfite')}
        />
        <BouncyCheckbox
          text='TreeNut'
          textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
          unFillColor='white'
          fillColor='black'
          size={24}
          isChecked={intolerances.treeNut}
          onPress={() => toggleIntolerance('treeNut')}
        />
        <BouncyCheckbox
          text='Wheat'
          textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
          unFillColor='white'
          fillColor='black'
          size={24}
          isChecked={intolerances.wheat}
          onPress={() => toggleIntolerance('wheat')}
        />
      </View>
    </ScrollView>
  );
};

const UserGoalsAndPreferencesScreenStyles = StyleSheet.create({
  scrollViewStyle: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 20,
    backgroundColor: '#90BE6D'
  },
  textInputContainerStyle: {
    marginBottom: 20,
  },
  textStyle: {
    marginBottom: 10,
    fontWeight: 'bold'
  },
  textInputStyle: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'dimgray',
    borderWidth: 1,
    borderRadius: 5,
  },
  dietContainerStyle: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    color: 'dimgray',
    borderColor: 'dimgray',
    borderWidth: 1,
    borderRadius: 5,
  },
  dietCheckboxContainerStyle: {
    marginBottom: 20,
    gap: 10,
  },
  dietTitleStyle: {
    textDecorationLine: 'none',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  dietDescriptionStyle: {
  },
  intolerancesContainerStyle: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    gap: 10,
  },
  intolerancesTitleStyle: {
    textDecorationLine: 'none',
    color: 'black',
    fontWeight: 'bold',
  }
});

export default UserGoalsAndPreferencesScreen;
