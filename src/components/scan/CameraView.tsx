import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    CameraView,
} from "expo-camera";

import {
    Camera,
    ImageIcon,
    RefreshCw,
    X,
    Zap,

    ZapOff,
} from "lucide-react-native";

type Props = {

    cameraRef: any;

    type: "front" | "back";

    flash: boolean;

    onFlash(): void;

    onSwitch(): void;

    onCapture(): void;

    onClose(): void;

    onGallery(): void;

};

export default function ScanCamera({

    cameraRef,

    type,

    flash,

    onFlash,

    onSwitch,

    onCapture,

    onClose,

    onGallery,

}: Props) {

    return (

        <View style={styles.container}>

            <CameraView

                ref={cameraRef}

                style={StyleSheet.absoluteFill}

                facing={type}

                flash={flash ? "on" : "off"}

            />

            <View style={styles.overlay} />

            {/* Header */}

            <View style={styles.header}>

                <TouchableOpacity

                    style={styles.circle}

                    onPress={onFlash}

                >

                    {

                        flash

                            ? <Zap size={22} color="yellow" />

                            : <ZapOff size={22} color="white" />

                    }

                </TouchableOpacity>

                <Text style={styles.title}>

                    Scan Food

                </Text>

                <TouchableOpacity

                    style={styles.circle}

                    onPress={onSwitch}

                >

                    <RefreshCw

                        size={22}

                        color="white"

                    />

                </TouchableOpacity>

            </View>

            {/* Scanner Frame */}

            <View style={styles.center}>

                <View style={styles.frame} />

            </View>

            <Text style={styles.tip}>

                Center your meal inside the frame

            </Text>

            {/* Bottom */}

            <View style={styles.footer}>

                <TouchableOpacity

                    onPress={onGallery}

                    style={styles.action}

                >

                    <ImageIcon

                        size={22}

                        color="white"

                    />

                    <Text style={styles.label}>

                        Gallery

                    </Text>

                </TouchableOpacity>

                <TouchableOpacity

                    onPress={onCapture}

                    style={styles.capture}

                >

                    <Camera

                        size={34}

                        color="#000"

                    />

                </TouchableOpacity>

                <TouchableOpacity

                    onPress={onClose}

                    style={styles.action}

                >

                    <X

                        size={22}

                        color="white"

                    />

                    <Text style={styles.label}>

                        Close

                    </Text>

                </TouchableOpacity>

            </View>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: "#000",

    },

    overlay: {

        ...StyleSheet.absoluteFill,

        backgroundColor: "rgba(0,0,0,.30)",

    },

    header: {

        position: "absolute",

        top: 60,

        width: "100%",

        paddingHorizontal: 25,

        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center",

    },

    title: {

        color: "#fff",

        fontSize: 18,

        fontWeight: "700",

    },

    center: {

        flex: 1,

        justifyContent: "center",

        alignItems: "center",

    },

    frame: {

        width: 280,

        height: 280,

        borderWidth: 3,

        borderColor: "#fff",

        borderRadius: 25,

    },

    footer: {

        position: "absolute",

        bottom: 40,

        width: "100%",

        flexDirection: "row",

        justifyContent: "space-around",

        alignItems: "center",

    },

    capture: {

        width: 85,

        height: 85,

        borderRadius: 45,

        backgroundColor: "#fff",

        justifyContent: "center",

        alignItems: "center",

    },

    circle: {

        width: 50,

        height: 50,

        borderRadius: 25,

        backgroundColor: "rgba(255,255,255,.2)",

        justifyContent: "center",

        alignItems: "center",

    },

    action: {

        alignItems: "center",

    },

    label: {

        color: "#fff",

        marginTop: 6,

        fontSize: 12,

    },

    tip: {

        position: "absolute",

        bottom: 150,

        width: "100%",

        textAlign: "center",

        color: "#fff",

        fontWeight: "600",

    },

});