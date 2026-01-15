export interface Diets {
    glutenFree: boolean;
    ketogenic: boolean;
    vegetarian: boolean;
    lactoVegetarian: boolean;
    ovoVegetarian: boolean;
    vegan: boolean;
    pescetarian: boolean;
    paleo: boolean;
    primal: boolean;
    lowFODMAP: boolean;
    whole30: boolean;
}

export interface Intolerances {
    dairy: boolean;
    egg: boolean;
    gluten: boolean;
    grain: boolean;
    peanut: boolean;
    seafood: boolean;
    sesame: boolean;
    shellfish: boolean;
    soy: boolean;
    sulfite: boolean;
    treeNut: boolean;
    wheat: boolean;
}

export interface UserGoalsAndPreferencesContextType {
    weeklyBudget: string;
    weeklyCalories: string;
    diets: Diets;
    intolerances: Intolerances;

    setWeeklyBudget: React.Dispatch<React.SetStateAction<string>>;
    setWekklyCalories: React.Dispatch<React.SetStateAction<string>>;
    toggleDiets: (key: keyof Diets) => void;
    toggleIntolerance: (key: keyof Intolerances) => void;
}