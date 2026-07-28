import BASE_URL from "@/storage/ipAdress";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
const API =BASE_URL;

interface WeightHistory {
  month: string;
  weight: number;
  date: string;
}

export default function WeightProgress() {
  const [loading, setLoading] = useState(true);


  const [newWeight, setNewWeight] = useState("");

  const [history, setHistory] = useState<WeightHistory[]>([]);

  const [canUpdate, setCanUpdate] = useState(false);

  const [daysLeft, setDaysLeft] = useState(0);

  

  useEffect(() => {
  checkUpdateAllowed();
  setLoading(false);
}, []);

  const checkUpdateAllowed = () => {
    const today = new Date();

    const lastDay = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();

    const remaining =
      lastDay - today.getDate();

    setDaysLeft(remaining);

    if (remaining === 0) {
      setCanUpdate(true);
    } else {
      setCanUpdate(false);
    }
  };

 const updateWeight = async () => {
  if (!canUpdate) {
    Alert.alert(
      "Not Available",
      "Weight can only be updated on the last day of the month."
    );
    return;
  }

  if (!newWeight) {
    Alert.alert("Enter Weight");
    return;
  }

  try {
    const profileData = await AsyncStorage.getItem("profile");

    if (!profileData) {
      Alert.alert("Error", "Profile not found");
      return;
    }

    const profile = JSON.parse(profileData);
    const user = profile.data;

    const updatedProfile = {
      userid: user.userid,
      full_name: user.full_name,
      gender: user.gender,
      age: user.age,

      height: Number(user.height_cm),

      // updated weight
      weight: Number(newWeight),

      target_weight: Number(user.target_weight_kg),

      activityLevel: user.activity_level,

      goal: user.goal,
      goalType: user.goal_type,

      target_date: user.target_date,
      referral_source: user.referral_source,
      water:user.water,
    };


    const response = await axios.post(
      `${API}/update-profile`,
      updatedProfile
    );


    console.log("Update profile response:", response.data);


    if (response.status === 200) {

      // update local storage also
      profile.data.current_weight_kg = Number(newWeight);

      await AsyncStorage.setItem(
        "profile",
        JSON.stringify(profile)
      );


      Alert.alert(
        "Success",
        "Weight Updated."
      );

      

    }


  } catch (err) {

    console.log("Weight update error:", err);

    Alert.alert(
      "Error",
      "Unable to update."
    );

  }
};

  if (loading) {
    return (
      <View
        style={styles.loader}
      >
        <ActivityIndicator
          size="large"
          color="#000"
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            router.back()
          }
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#000"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Update Weight 
        </Text>

        <View
          style={{ width: 28 }}
        />
      </View>

      <View style={styles.card}>
    <Text style={styles.cardTitle}>
        Update Monthly Weight
    </Text>

    <TextInput
        placeholder="Enter your weight"
        value={newWeight}
        onChangeText={setNewWeight}
        keyboardType="decimal-pad"
        editable={canUpdate}
        style={[
            styles.input,
            !canUpdate && {
                backgroundColor:"#F3F3F3"
            }
        ]}
    />

    <TouchableOpacity
        style={[
            styles.button,
            !canUpdate && {
                backgroundColor:"#999"
            }
        ]}
        disabled={!canUpdate}
        onPress={updateWeight}
    >
        <Text style={styles.buttonText}>
            Update Weight
        </Text>
    </TouchableOpacity>

    {!canUpdate && (
        <Text style={styles.note}>
            Weight can only be updated on the last day of each month.
        </Text>
    )}
</View>

           

      {/* <View style={styles.graphCard}>
        <LineChart
          data={{
            labels: history.map((item) => item.month),
            datasets: [
              {
                data: history.map((item) => item.weight),
              },
            ],
          }}
          width={Dimensions.get("window").width - 70}
          height={220}
          yAxisSuffix="kg"
          withInnerLines
          withOuterLines={false}
          withShadow={false}
          bezier
fromZero={false}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 1,
            color: () => "#000",
            labelColor: () => "#555",
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#000",
            },
            propsForBackgroundLines: {
    stroke: "#E5E5E5",
},

strokeWidth: 3,
          }}
          style={{
            borderRadius: 16,
          }}
        />
      </View> */}

      

      

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 55,
    marginBottom: 25,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },

  current: {
    fontSize: 15,
    color: "#777",
  },

  weight: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    marginTop: 15,
  },

  button: {
    backgroundColor: "#000",
    marginTop: 18,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  note: {
    textAlign: "center",
    color: "#888",
    marginTop: 15,
    fontSize: 14,
  },

  sectionTitle: {
    marginTop: 30,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "700",
  },

 graphCard:{
    backgroundColor:"#fff",
    borderRadius:20,
    paddingVertical:25,
    paddingHorizontal:10,
    marginTop:5,
    elevation:2,
},
  historyCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    elevation: 2,
  },

  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },

  month: {
    fontSize: 17,
    fontWeight: "600",
  },

  date: {
    color: "#888",
    marginTop: 4,
  },

  historyWeight: {
    fontSize: 18,
    fontWeight: "700",
  },
});