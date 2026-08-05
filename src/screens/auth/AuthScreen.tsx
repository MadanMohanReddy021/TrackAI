import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import BASE_URL from "../../storage/ipAdress";
import { createStyles } from "../../styles/authStyles";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { configureGoogle } from "../../config/google";

export default function AuthScreen() {
  const [tab, setTab] = useState<"login" | "signup">("signup");
  const [otp, setOtp] = useState("");
  const [loginOtpRequired, setLoginOtpRequired] = useState(false);
  const [loginOtp, setLoginOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("None");

  const isSignup = tab === "signup";
  const { colors } = useTheme();

  const styles = createStyles(colors);
  useEffect(() => {
    console.log(BASE_URL);
    configureGoogle();
  }, []);
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      console.log("Google Play Services available");
      const currentUser = await GoogleSignin.getCurrentUser();
      console.log("Current User:", currentUser);
      if (currentUser) {
        await GoogleSignin.signOut();
      }

      await GoogleSignin.signIn();

      const tokens = await GoogleSignin.getTokens();

      const idToken = tokens.idToken;

      const backendResponse = await fetch(`${BASE_URL}/google-sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken,
        }),
      });

      const data = await backendResponse.json();

      if (backendResponse.ok) {
        await AsyncStorage.setItem("userid", String(data.userId));

        await AsyncStorage.setItem("userid", data.userid);

        // Check user profile
        const profileResponse = await fetch(
          `${BASE_URL}/get-profile/?userid=${data.userid}`,
        );

        const profileData = await profileResponse.json();

        if (profileData.success) {
          // Existing user
          router.replace("/dashboard");
        } else {
          // New Google user
          router.replace("/onboarding");
        }
      } else {
        await GoogleSignin.signOut();
        alert(data.message || "Google login failed");
      }
    } catch (error) {
      console.log("Google Login Error:", error);

      try {
        await GoogleSignin.signOut();
      } catch {}
    }
  };
  const handleSignup = async () => {
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("userid", String(data.userid));
        router.replace("/onboarding");
      } else if (response.status == 400) {
        await AsyncStorage.setItem("userid", String(data.userid));
        setOtpSent(true);

        alert("OTP sent to your email");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
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

      console.log("Login Response:", data);

      console.log(response.ok);
      // LOGIN SUCESS
      if (response.ok) {
        await AsyncStorage.setItem("userid", String(data.userid));
        const profileResponse = await fetch(
          `${BASE_URL}/get-profile/?userid=${data.userId}`,
        );

        const profileData = await profileResponse.json();

        console.log("Profile Response:", profileData);

        if (profileData.success) {
          // Existing user
          router.replace("/dashboard");
        } else {
          // New Google user
          router.replace("/onboarding");
        }
        console.log(response.status);
        if (data.token) {
          await AsyncStorage.setItem("token", data.token);
        }
        router.replace("/dashboard");
      }
      // OTP REQUIRED
      else if (response.status === 400) {
        await AsyncStorage.setItem("userid", String(data.userid));
        setLoginOtpRequired(true);

        alert(data.message || "OTP verification required");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.log("Login Error:", error);
    }
  };
  const verifyOTP = async () => {
    try {
      const userid = await AsyncStorage.getItem("userid");
      const enteredOtp = isSignup ? otp : loginOtp;

      if (!enteredOtp.trim()) {
        alert("Please enter OTP");
        return;
      }

      const response = await fetch(
        `${BASE_URL}${isSignup ? "/signup/otpverify" : "/signup/otpverify"}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userid,

            otp: enteredOtp,
          }),
        },
      );

      const data = await response.json();

      console.log("OTP Verify Response:", data);

      if (response.ok) {
        // Store userid from backend

        await AsyncStorage.setItem("userid", String(data.userId));

        // Store token if backend sends

        if (data.token) {
          await AsyncStorage.setItem("token", data.token);
        }

        // clear OTP

        setOtp("");
        setLoginOtp("");

        // hide OTP boxes

        setOtpSent(false);
        setLoginOtpRequired(false);

        router.replace("/dashboard");
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.log("Verify OTP Error:", error);
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
            <Text style={styles.badgeText}>Personal AI Fitness Coach</Text>
          </View>

          {/* Title */}

          <Text style={styles.title}>
            Your smartest{"\n"}
            fitness investment{"\n"}
            starts here.
          </Text>

          <Text style={styles.subtitle}>
            Track nutrition, build better habits and achieve your goals with
            your own AI coach.
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
              style={[styles.tab, tab === "signup" && styles.activeTab]}
              onPress={() => setTab("signup")}
            >
              <Ionicons
                name="person-outline"
                size={18}
                color={tab === "signup" ? "#F59E0B" : "#777"}
              />

              <Text
                style={[styles.tabText, tab === "signup" && styles.activeText]}
              >
                Get Started
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, tab === "login" && styles.activeTab]}
              onPress={() => setTab("login")}
            >
              <Ionicons
                name="log-in-outline"
                size={18}
                color={tab === "login" ? "#F59E0B" : "#777"}
              />

              <Text
                style={[styles.tabText, tab === "login" && styles.activeText]}
              >
                Welcome Back
              </Text>
            </TouchableOpacity>
          </View>

          {/* Name */}

          {/* {tab === "signup" && (
            <>
              <Text style={styles.label}>Full Name</Text>

              <TextInput
                placeholder="Alex Johnson"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            </>
          )} */}

          {/* Email */}

          <Text style={styles.label}>Email Address</Text>

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
            {tab === "signup" ? "Create Password" : "Password"}
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

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#777"
              />
            </TouchableOpacity>
          </View>
          {otpSent && (
            <>
              <Text style={styles.label}>Verification Code</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter 6 digit OTP"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
              />
            </>
          )}
          {loginOtpRequired && (
            <>
              <Text style={styles.label}>Verification Code</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter 6 digit OTP"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                maxLength={6}
                value={loginOtp}
                onChangeText={setLoginOtp}
              />
            </>
          )}
          {/* Button */}

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (isSignup) {
                if (!otpSent) {
                  handleSignup();
                } else {
                  verifyOTP();
                }
              } else {
                if (loginOtpRequired) {
                  verifyOTP();
                } else {
                  handleLogin();
                }
              }
            }}
          >
            <Text style={styles.buttonText}>
              {isSignup ? "Start Free Today" : "Sign In"}
            </Text>

            <Ionicons name="arrow-forward" size={18} color="white" />
          </TouchableOpacity>

          {/* Divider */}

          <View style={styles.dividerRow}>
            <View style={styles.line} />

            <Text style={styles.or}>OR</Text>

            <View style={styles.line} />
          </View>

          {/* Google */}

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
          >
            <Ionicons name="logo-google" size={22} color="#000" />

            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>
          <View style={styles.usersContainer}>
            <View style={styles.avatarRow}>
              <View style={styles.avatar} />
              <View style={styles.avatar} />
              <View style={styles.avatar} />
              <View style={styles.avatar} />
            </View>
          </View>
          <View style={styles.footer}>
            <Ionicons name="lock-closed" size={14} color={colors.text} />

            <Text style={styles.footerText}>
              Your data is secure and encrypted
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
