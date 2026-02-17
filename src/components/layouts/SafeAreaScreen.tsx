import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '../../styles/themes/colors';
import { Spacing } from '../../styles/themes/spacing';

type SafeAreaScreenProps = {
    children: React.ReactNode;
    backgroundColor?: string;
};

const SafeAreaScreen = ({ children, backgroundColor = Colors.background }: SafeAreaScreenProps) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: backgroundColor,
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right
                }
            ]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default SafeAreaScreen;
