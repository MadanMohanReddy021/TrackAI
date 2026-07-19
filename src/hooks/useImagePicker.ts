import * as ImagePicker from "expo-image-picker";

export default function useImagePicker() {

    async function pickImage() {

        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted)
            return null;

        const result =
            await ImagePicker.launchImageLibraryAsync({

                mediaTypes: ["images"],

                quality: 0.9,

                allowsEditing: false,

            });

        if (result.canceled)
            return null;

        return result.assets[0];

    }

    return {

        pickImage,

    };

}