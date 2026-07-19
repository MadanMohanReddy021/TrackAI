import {
    CameraType,
    CameraView,
    useCameraPermissions
} from "expo-camera";
import { useEffect, useRef, useState } from "react";

export default function useCamera() {

    const cameraRef = useRef<CameraView>(null);

    const [permission, requestPermission] =
        useCameraPermissions();

    const [cameraType, setCameraType] =
        useState<CameraType>("back");

    const [flash, setFlash] =
        useState(false);

    useEffect(() => {

        if (!permission?.granted) {

            requestPermission();

        }

    }, []);

    const toggleFlash = () => {

        setFlash(v => !v);

    };

    const switchCamera = () => {

        setCameraType(prev =>

            prev === "back"

                ? "front"

                : "back"

        );

    };

    const capture = async () => {

        if (!cameraRef.current)

            return null;

        const photo =
            await cameraRef.current.takePictureAsync({

                quality: 0.9,

                skipProcessing: false,

            });

        return photo;

    };

    return {

        permission,

        cameraRef,

        flash,

        cameraType,

        toggleFlash,

        switchCamera,

        capture,

        flashMode: flash

            ? "on"

            : "off",

    };

}