import React, {
  useState
} from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const UserGoalsAndPreferencesScreen = () => {
  return (
    <ScrollView style={UserGoalsAndPreferencesScreenStyles.scrollViewStyle}>
      <View style={UserGoalsAndPreferencesScreenStyles.textInputContainerStyle}>
        <Text style={UserGoalsAndPreferencesScreenStyles.textStyle}>
          Weekly Budget Goal
        </Text>
        <TextInput 
          style={UserGoalsAndPreferencesScreenStyles.textInputStyle}
          placeholder='Enter budget'
        >
        </TextInput>
      </View>
      <View style={UserGoalsAndPreferencesScreenStyles.textInputContainerStyle}>
        <Text style={UserGoalsAndPreferencesScreenStyles.textStyle}>
          Weekly Calories Intake Goal
        </Text>
        <TextInput 
          style={UserGoalsAndPreferencesScreenStyles.textInputStyle}
          placeholder='Enter calories intake'
        >
        </TextInput>
      </View>
      <View style={UserGoalsAndPreferencesScreenStyles.dietContainerStyle}>
        <Text style={UserGoalsAndPreferencesScreenStyles.textStyle}>Dietary Preferences</Text>
        <View style={UserGoalsAndPreferencesScreenStyles.dietCheckboxContainerStyle}>
          <BouncyCheckbox
            text='Gluten Free'
            textStyle={UserGoalsAndPreferencesScreenStyles.dietTitleStyle}
            unFillColor='white'
            fillColor='black'
            size={24}
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
          />
          <Text style={UserGoalsAndPreferencesScreenStyles.dietDescriptionStyle}>
            Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const UserGoalsAndPreferencesScreenStyles = StyleSheet.create({
  scrollViewStyle: {
    flexGrow: 1,
    backgroundColor: '#90BE6D',
  },
  textInputContainerStyle: {
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
  },
  textStyle: {
    marginBottom: 10,
    fontWeight: 'bold'
  },
  textInputStyle: {
    backgroundColor: 'white',
    padding: 10,
    borderColor: 'dimgray',
    borderWidth: 1,
    borderRadius: 5,
  },
  dietContainerStyle: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
  },
  dietCheckboxContainerStyle: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
    borderColor: 'dimgray',
    borderWidth: 1,
    borderRadius: 5,
    gap: 10,
  },
  dietTitleStyle: {
    textDecorationLine: 'none',
    color: 'black',
    fontWeight: 'bold',
  },
  dietDescriptionStyle: {
    color: 'dimgray'
  },
});

export default UserGoalsAndPreferencesScreen;
