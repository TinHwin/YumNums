import React from 'react';
import {
    Search,
    X,
    Soup,
    Book,
    ChartColumnIncreasing,
    CircleX,
    CirclePlus,
    Timer,
    Flame,
    ThumbsUp,
    Heart,
    PiggyBank,
    Beef,
    Wheat,
    Hamburger,
} from 'lucide-react-native';

import { Colors } from '../../styles/themes/colors';

// https://www.w3schools.com/typescript/typescript_union_types.php
type IconName =
    | 'Search'
    | 'X'
    | 'Soup'
    | 'Book'
    | 'ChartColumnIncreasing'
    | 'CircleX'
    | 'CirclePlus'
    | 'Timer'
    | 'Flame'
    | 'ThumbsUp'
    | 'Heart'
    | 'PiggyBank'
    | 'Beef'
    | 'Wheat'
    | 'Hamburger'

const iconMap = {
    Search,
    X,
    Soup,
    Book,
    ChartColumnIncreasing,
    CirclePlus,
    CircleX,
    Timer,
    Flame,
    ThumbsUp,
    Heart,
    PiggyBank,
    Beef,
    Wheat,
    Hamburger,
};

type IconProps = {
    name: IconName;
    color?: string;
    size?: number;
};

const Icon = ({ name, color = Colors.onSurface, size = 24 }: IconProps) => {
    const IconComponent = iconMap[name];

    return <IconComponent color={color} size={size} />;
};

export default Icon;