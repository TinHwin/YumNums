import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateContextType } from '../types/DateContextType';

export const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
    const computeDates = (date: Date): DateContextType => {
        const todayDate = new Date(date);
        const todayDateKey = todayDate.toISOString().split('T')[0];

        const startOfThisWeekDate = new Date(todayDate);
        startOfThisWeekDate.setDate(todayDate.getDate() - todayDate.getDay());

        const endOfThisWeekDate = new Date(startOfThisWeekDate);
        endOfThisWeekDate.setDate(startOfThisWeekDate.getDate() + 6);

        const startOfLastWeekDate = new Date(startOfThisWeekDate);
        startOfLastWeekDate.setDate(startOfThisWeekDate.getDate() - 7);

        const endOfLastWeekDate = new Date(startOfThisWeekDate);
        endOfLastWeekDate.setDate(startOfThisWeekDate.getDate() - 1);

        const startOfNextWeekDate = new Date(startOfThisWeekDate);
        startOfNextWeekDate.setDate(startOfThisWeekDate.getDate() + 7);

        const endOfNextWeekDate = new Date(startOfThisWeekDate);
        endOfNextWeekDate.setDate(startOfThisWeekDate.getDate() + 13);

        return {
            todayDate,
            todayDateKey,
            thisWeekDates: { start: startOfThisWeekDate, end: endOfThisWeekDate },
            lastWeekDates: { start: startOfLastWeekDate, end: endOfLastWeekDate },
            nextWeekDates: { start: startOfNextWeekDate, end: endOfNextWeekDate }
        };
    };

    const [dates, setDates] = useState<DateContextType>(() => computeDates(new Date()));

    return (
        <DateContext.Provider
            value={ dates }
        >
            {children}
        </DateContext.Provider>
    )
};

export const useDateContext = () => {
    const context = useContext(DateContext);

    if (!context) throw new Error('useDateContext must be used inside AuthProvider');

    return context;
}