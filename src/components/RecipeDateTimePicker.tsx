import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Platform,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';

import { Colors } from '../styles/themes/colors';
import { Spacing } from '../styles/themes/spacing';
import { Radius } from '../styles/themes/radius';

import { MealType } from '../types/MealPlanContextType';
import { Recipe } from '../types/RecipeContextType';

import { useRecipeContext } from '../contexts/RecipeContext';
import { useMealPlanContext } from '../contexts/MealPlanContext';
import { useDateContext } from '../contexts/DateContext';

type RecipeDateTimePickerProps = {
    recipe: Recipe;
    visible: boolean;
    onClose: () => void;
};

export const RecipeDateTimePicker = ({ recipe, visible, onClose }: RecipeDateTimePickerProps) => {
    const { addRecipe } = useRecipeContext();
    const { addMeal } = useMealPlanContext();
    const dates = useDateContext();

    const todayDate = dates.todayDate;

    const startOfThisWeek = dates.thisWeekDates.start

    const endOfNextWeek = dates.nextWeekDates.end

    const [selectedDate, setSelectedDate] = useState<Date>(todayDate);
    const [selectedMealType, setSelectedMealType] = useState<MealType>();
    const [dateTimePickerVisible, setDateTimePickerVisible] = useState(false);

    const onChange = (e, selectedDate) => {
        setSelectedDate(selectedDate);
    }

    useEffect(() => {
        const checkValue = () => {
            console.log('Selected date:', selectedDate.toDateString());
            console.log('Selected meal type:', selectedMealType);
        };

        checkValue();

    }, [selectedDate, selectedMealType])

    const mealTypeRadioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: 'Breakfast',
            label: 'Breakfast',
            value: 'Breakfast'
        },
        {
            id: 'Lunch',
            label: 'Lunch',
            value: 'Lunch'
        },
        {
            id: 'Dinner',
            label: 'Dinner',
            value: 'Dinner'
        }
    ]), []);

    const [selectedMealTypeId, setSelectedMealTypeId] = useState<string | undefined>();

    useEffect(() => {
        if (selectedMealTypeId) setSelectedMealType(selectedMealTypeId as MealType);
    }, [selectedMealTypeId]);


    // https://www.skypack.dev/view/react-native-radio-buttons-group?utm_source=chatgpt.com
    // const [mealTypeRadioButtons, setMealTypeRadioButtons] = useState<RadioButtonProps[]>(mealTypeRadioButtonsData);

    //const onPressMealTypeRadioButton = (mealTypeRadioButtonsArray: RadioButtonProps[]) => {
        //setMealTypeRadioButtons(mealTypeRadioButtonsArray);

        //console.log(mealTypeRadioButtons)
    //};

    const handleAddMealSubmit = (date: Date, mealType: MealType, recipe: Recipe) => {
        if (!mealType) {
            console.log("Select a meal type first");
            return;
        }

        console.log('ADDED MEAL', date);

        console.log('RECIPE', recipe);
        addRecipe(recipe);
        addMeal(date, mealType, recipe.id);
    };

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.dateTimePickerModalOverlayContainer}>
                <View style={styles.dateTimePickerModalContainer}>
                    <Text style={styles.dateTimePickerModalTitleText}>
                        Add Meal
                    </Text>
                    <View style={styles.dateTimePickerModalSelectContainer}>
                        <Text style={styles.dateTimePickerModalSelectText}>
                            Select Date
                        </Text>
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display={'default'}
                            minimumDate={startOfThisWeek}
                            maximumDate={endOfNextWeek}
                            onChange={onChange}
                        />
                    </View>
                    <View style={styles.dateTimePickerModalSelectContainer}>
                        <Text style={styles.dateTimePickerModalSelectText}>
                            Select Meal Type
                        </Text>
                        <RadioGroup
                            radioButtons={mealTypeRadioButtons}
                            onPress={setSelectedMealTypeId}
                            selectedId={selectedMealTypeId}
                            layout='row'
                        />
                    </View>
                    <View style={styles.dateTimePickerModalButtonsContainer}>
                        <TouchableOpacity
                            style={styles.dateTimePickerModalCloseButtonContainer}
                            onPress={onClose}
                        >
                            <Text style={styles.dateTimePickerModalCloseButtonText}>
                                Close
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dateTimePickerModalSaveButtonContainer}
                            onPress={() => handleAddMealSubmit(selectedDate, selectedMealType, recipe)}
                        >
                            <Text
                                style={styles.dateTimePickerModalSaveButtonText}
                            >
                                Add
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    // DateTimePicker
    dateTimePickerModalOverlayContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateTimePickerModalContainer: {
        backgroundColor: Colors.background,
        alignItems: 'center',
        padding: Spacing.md,
        gap: Spacing.md,
        borderRadius: Radius.md
    },
    dateTimePickerModalTitleText: {
        fontWeight: 'bold',
        marginBottom: Spacing.md
    },
    dateTimePickerModalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.md
    },
    dateTimePickerModalCloseButtonContainer: {
        flex: 1,
        backgroundColor: 'tomato',
        alignItems: 'center',
        padding: Spacing.md,
        gap: Spacing.sm,
        borderRadius: Radius.md
    },
    dateTimePickerModalCloseButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    dateTimePickerModalSaveButtonContainer: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        padding: Spacing.md,
        gap: Spacing.sm,
        borderRadius: Radius.md
    },
    dateTimePickerModalSaveButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    dateTimePickerModalSelectContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: Spacing.sm,
        borderColor: Colors.onPrimary,
        borderWidth: 1,
        borderRadius: Radius.md
    },
    dateTimePickerModalSelectText: {
        flex: 1,
    },
})