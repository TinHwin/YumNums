export interface DateContextType {
    todayDate: Date;
    todayDateKey: string;
    thisWeekDates: { start: Date; end: Date };
    lastWeekDates: { start: Date; end: Date };
    nextWeekDates: { start: Date; end: Date };
}