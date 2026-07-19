import { StyleSheet, Text, View } from "react-native";

type Props = {
    label: string;
    value: string | number;
    unit: string;
    accent?: boolean;
};

export default function MacroCard({
    label,
    value,
    unit,
    accent,
}: Props) {

    return (

        <View
            style={[
                styles.card,
                accent && styles.accent,
            ]}
        >

            <Text
                style={[
                    styles.label,
                    accent && styles.white,
                ]}
            >
                {label}
            </Text>

            <Text
                style={[
                    styles.value,
                    accent && styles.white,
                ]}
            >
                {value}

                <Text
                    style={styles.unit}
                >
                    {" "}
                    {unit}
                </Text>

            </Text>

        </View>

    );

}

const styles = StyleSheet.create({

    card: {

        flex: 1,

        backgroundColor: "#fff",

        borderRadius: 18,

        padding: 16,

        elevation: 2,

    },

    accent: {

        backgroundColor: "#111827",

    },

    label: {

        color: "#888",

        fontSize: 13,

    },

    value: {

        fontSize: 28,

        fontWeight: "700",

        marginTop: 8,

    },

    unit: {

        fontSize: 14,

        color: "#888",

    },

    white: {

        color: "#fff",

    },

});