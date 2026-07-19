import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView, ScrollView, StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";


export default function AuthScreen() {
  const [tab, setTab] = useState<"login" | "signup">("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const BASE_URL = "http://172.22.204.4:3000";
  const isSignup = tab === "signup";
 const handleSignup = async () => {
  try {
    if (!name.trim()) {
    alert("Please enter your name");
    return;
  }

  if (!email.trim()) {
    alert("Please enter your email");
    return;
  }

  if (!password.trim()) {
    alert("Please enter your password");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }
  const userId=name;
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        email,
        password,
      }),
    });
    
    const data = await response.json();
    console.log("Signup Response:", data);
    if (response.ok) {
      // Save email locally
      await AsyncStorage.setItem("userEmail", email);
      // await AsyncStorage.setItem("token", data.token);
      console.log("Signup Success");

      // router.replace("/home");
    } else {
      alert(data.message || "Signup Failed");
    }
  } catch (error) {
    console.error(error);
  }
};
const handleLogin = async () => {
  try {
    

  if (!email.trim()) {
    alert("Please enter your email");
    return;
  }

  if (!password.trim()) {
    alert("Please enter your password");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      await AsyncStorage.setItem("userid",
    String(data.userId)
  ); 
  console.log(data);
  console.log("User ID saved:", data.userId);
      // Save email locally
      await AsyncStorage.setItem("token", email);
      alert(data.message || "Invalid Credentials");
      console.log("Login Success");

      router.replace("/dashboard");
    } else {
      alert(data.message || "Invalid Credentials");
    }
  } catch (error) {
    console.error(error);
  }
};
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <View style={styles.content}>

        {/* Badge */}

        <View style={styles.badge}>
          <Ionicons name="sparkles" size={15} color="#F59E0B" />
          <Text style={styles.badgeText}>
            Personal AI Fitness Coach
          </Text>
        </View>

        {/* Title */}

        <Text style={styles.title}>
  Your smartest{"\n"}
  fitness investment{"\n"}
  starts here.
</Text>

<Text style={styles.subtitle}>
  Track nutrition, build better habits and achieve
  your goals with your own AI coach.
</Text>
{/* <View style={styles.heroCircle}>

  <View style={styles.chart}>

    <View style={[styles.bar,{height:45}]} />

    <View style={[styles.bar,{height:75}]} />

    <View style={[styles.bar,{height:110}]} />

  </View>

  <View style={styles.flag}>
      <Ionicons
      name="flag"
      size={18}
      color="#F59E0B"
      />
  </View>

</View> */}

        {/* Tabs */}

        <View style={styles.tabs}>

          <TouchableOpacity
            style={[
              styles.tab,
              tab === "signup" && styles.activeTab,
            ]}
            onPress={() => setTab("signup")}
          >
            <Ionicons
              name="person-outline"
              size={18}
              color={tab === "signup" ? "#F59E0B" : "#777"}
            />

            <Text
              style={[
                styles.tabText,
                tab === "signup" && styles.activeText,
              ]}
            >
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              tab === "login" && styles.activeTab,
            ]}
            onPress={() => setTab("login")}
          >
            <Ionicons
              name="log-in-outline"
              size={18}
              color={tab === "login" ? "#F59E0B" : "#777"}
            />

            <Text
              style={[
                styles.tabText,
                tab === "login" && styles.activeText,
              ]}
            >
              Welcome Back
            </Text>
          </TouchableOpacity>

        </View>

        {/* Name */}

        {tab === "signup" && (
          <>
            <Text style={styles.label}>
              Full Name
            </Text>

            <TextInput
              placeholder="Alex Johnson"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          </>
        )}

        {/* Email */}

        <Text style={styles.label}>
          Email Address
        </Text>

        <TextInput
          placeholder="you@example.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}

        <Text style={styles.label}>
          {tab === "signup"
            ? "Create Password"
            : "Password"}
        </Text>

        <View style={styles.passwordContainer}>

          <TextInput
            secureTextEntry={!showPassword}
            placeholder="••••••••••"
            placeholderTextColor="#999"
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() =>
              setShowPassword(!showPassword)
            }
          >
            <Ionicons
              name={
                showPassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color="#777"
            />
          </TouchableOpacity>

        </View>

        {/* Button */}

        <TouchableOpacity
  style={styles.button}
  onPress={() => {
    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  }}
>
  <Text style={styles.buttonText}>
    {isSignup ? "Start Free Today" : "Sign In"}
  </Text>

  <Ionicons
    name="arrow-forward"
    size={18}
    color="white"
  />
</TouchableOpacity>

        {/* Divider */}

        <View style={styles.dividerRow}>

          <View style={styles.line} />

          <Text style={styles.or}>
            OR
          </Text>

          <View style={styles.line} />

        </View>

        {/* Google */}

        <TouchableOpacity style={styles.googleButton}>

          <Ionicons
            name="logo-google"
            size={22}
            color="#000"
          />

          <Text style={styles.googleText}>
            Continue with Google
          </Text>

        </TouchableOpacity>
        <View style={styles.usersContainer}>

<View style={styles.avatarRow}>

<View style={styles.avatar}/>
<View style={styles.avatar}/>
<View style={styles.avatar}/>
<View style={styles.avatar}/>

</View>

<View>

<Text style={styles.rating}>
★★★★★
</Text>

<Text style={styles.trusted}>
Trusted by 25,000+
fitness enthusiasts
</Text>

</View>

</View>
<View style={styles.footer}>

<Ionicons
name="lock-closed"
size={14}
color="#999"
/>

<Text style={styles.footerText}>
Your data is secure and encrypted
</Text>

</View>
      </View></ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  content: {
  flex: 1,
  paddingHorizontal: 24,
  paddingTop: 40,
  justifyContent: "center",
  maxWidth: 500,
  alignSelf: "center",
  width: "100%",
},
scrollContent: {
  flexGrow: 1,
},
  badge: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#FFF4E5",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 100,
    alignItems: "center",
    marginBottom: 30,
  },

  badgeText: {
    marginLeft: 8,
    color: "#D97706",
    fontWeight: "600",
    fontSize: 13,
  },

  title: {
    fontSize: 42,
    fontWeight: "800",
    lineHeight: 48,
    color: "#111",
  },

  subtitle: {
    marginTop: 18,
    fontSize: 16,
    color: "#666",
    lineHeight: 25,
    marginBottom: 35,
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#F1F1F1",
    borderRadius: 14,
    padding: 5,
    marginBottom: 35,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    flexDirection: "row",
  },

  activeTab: {
    backgroundColor: "white",
    borderRadius: 10,
  },

  tabText: {
    marginLeft: 8,
    color: "#777",
    fontWeight: "600",
  },

  activeText: {
    color: "#F59E0B",
  },

  label: {
    marginBottom: 10,
    color: "#222",
    fontWeight: "600",
    fontSize: 15,
  },
  heroCircle:{
alignSelf:"center",
width:170,
height:170,
borderRadius:100,
backgroundColor:"#FFF5E6",
justifyContent:"center",
alignItems:"center",
marginBottom:35,
},

chart:{
flexDirection:"row",
alignItems:"flex-end",
},

bar:{
width:18,
backgroundColor:"#F6C55B",
marginHorizontal:5,
borderRadius:4,
},

flag:{
position:"absolute",
right:45,
top:35,
},

usersContainer:{
marginTop:35,
flexDirection:"row",
alignItems:"center",
},

avatarRow:{
flexDirection:"row",
marginRight:18,
},

avatar:{
width:38,
height:38,
borderRadius:20,
backgroundColor:"#DDD",
marginRight:-8,
borderWidth:2,
borderColor:"white",
},

rating:{
fontSize:15,
color:"#F59E0B",
fontWeight:"700",
},

trusted:{
fontSize:13,
color:"#777",
marginTop:2,
},

footer:{
marginTop:35,
flexDirection:"row",
justifyContent:"center",
alignItems:"center",
},

footerText:{
marginLeft:8,
color:"#999",
fontSize:13,
},

  input: {
    height: 58,
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingHorizontal: 18,
    marginBottom: 22,
    fontSize: 15,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingHorizontal: 18,
    height: 58,
  },

  passwordInput: {
    flex: 1,
    fontSize: 15,
  },

  button: {
    marginTop: 28,
    height: 60,
    backgroundColor: "#111",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    marginRight: 10,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 28,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },

  or: {
    marginHorizontal: 15,
    color: "#888",
    fontWeight: "600",
  },

  googleButton: {
    height: 58,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  googleText: {
    marginLeft: 12,
    fontWeight: "600",
    fontSize: 15,
    color: "#111",
  },
});