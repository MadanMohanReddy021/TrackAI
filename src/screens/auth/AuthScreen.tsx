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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const handleAuthButtonPress = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (isSignup) {
        if (!otpSent) {
          await handleSignup();
        } else {
          await verifyOTP();
        }
      } else {
        if (loginOtpRequired) {
          await verifyOTP();
        } else {
          await handleLogin();
        }
      }
    } catch (error) {
      console.log("Authentication error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      try {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      } catch (error) {
        console.log("STEP 1 ERROR:", error);

        alert(
          "Google Play Services are not available. Please update Google Play Services and try again.",
        );

        return;
      }

      try {
        const currentUser = await GoogleSignin.getCurrentUser();

        if (currentUser) {
          await GoogleSignin.signOut();
        }
      } catch (error) {
        console.log("STEP 2 ERROR:", error);
      }

      // ================================
      // 3. GOOGLE SIGN IN
      // ================================
      let signInResult;

      try {
        signInResult = await GoogleSignin.signIn();
      } catch (error) {
        console.log("STEP 3 ERROR:", error);

        if (error?.code === "SIGN_IN_CANCELLED") {
          alert("Google sign-in was cancelled.");
        } else if (error?.code === "IN_PROGRESS") {
          alert("Google sign-in is already in progress.");
        } else {
          alert("Unable to sign in with Google. Please try again.");
        }

        return;
      }

      // ================================
      // 4. GET GOOGLE TOKEN
      // ================================
      let tokens;

      try {
        tokens = await GoogleSignin.getTokens();
      } catch (error) {
        console.log("STEP 4 ERROR:", error);

        alert(
          "Unable to get Google authentication details. Please try signing in again.",
        );

        return;
      }

      const idToken = tokens.idToken;

      if (!idToken) {
        alert("Google authentication failed. No ID token was received.");

        return;
      }

      let backendResponse;

      try {
        backendResponse = await fetch(`${BASE_URL}/google-sign`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
          }),
        });
      } catch (error) {
        console.log("STEP 5 ERROR:", error);

        alert(
          "Unable to connect to the server. Please check your internet connection and try again.",
        );

        return;
      }

      // ================================
      // 6. READ BACKEND RESPONSE
      // ================================
      let data;

      try {
        data = await backendResponse.json();
      } catch (error) {
        alert("The server returned an invalid response. Please try again.");

        return;
      }

      // ================================
      // 7. BACKEND SUCCESS
      // ================================
      if (backendResponse.ok) {
        const userid = data.userid || data.userId;

        if (!userid) {
          alert(
            "Login was successful, but the user ID was not received from the server.",
          );

          return;
        }

        // ================================
        // 8. SAVE USER ID
        // ================================
        await AsyncStorage.setItem("userid", String(userid));

        // ================================
        // 9. CHECK PROFILE
        // ================================
        try {
          const profileURL = `${BASE_URL}/get-profile/?userid=${userid}`;

          const profileResponse = await fetch(profileURL);

          const profileData = await profileResponse.json();

          // ================================
          // 10. NAVIGATION
          // ================================
          if (profileData.success) {
            router.replace("/dashboard");
          } else {
            router.replace("/onboarding");
          }
        } catch (error) {
          console.log("STEP 9 ERROR:", error);

          alert(
            "Google login was successful, but we could not load your profile. Please try again.",
          );
        }
      } else {
        // ================================
        // BACKEND FAILED
        // ================================
        console.log("BACKEND LOGIN FAILED:", backendResponse.status, data);

        try {
          await GoogleSignin.signOut();
        } catch {}

        if (backendResponse.status === 400) {
          alert(
            data.message ||
              "Google account information is invalid. Please try again.",
          );
        } else if (backendResponse.status === 401) {
          alert(
            "Google authentication failed. Please sign in with Google again.",
          );
        } else if (backendResponse.status >= 500) {
          alert("The server is currently unavailable. Please try again later.");
        } else {
          alert(data.message || "Google login failed. Please try again.");
        }
      }
    } catch (error) {
      console.log("FINAL GOOGLE LOGIN ERROR:", error);

      try {
        await GoogleSignin.signOut();
      } catch {}

      alert(
        "Something went wrong while signing in with Google. Please try again.",
      );
    }
  };
  const handleSignup = async () => {
    try {
      // Validate input
      if (!name.trim()) {
        alert("Please enter your name.");
        return;
      }

      if (!email.trim()) {
        alert("Please enter your email address.");
        return;
      }

      if (!password.trim()) {
        alert("Please enter a password.");
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim())) {
        alert("Please enter a valid email address.");
        return;
      }

      if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
      }

      let response;

      try {
        response = await fetch(`${BASE_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        });
      } catch (error) {
        console.log("Signup Network Error:", error);

        alert(
          "Unable to connect to the server. Please check your internet connection and try again.",
        );
        return;
      }

      let data;

      try {
        data = await response.json();
      } catch (error) {
        alert("The server returned an invalid response. Please try again.");
        return;
      }

      console.log("Signup Response:", data);

      if (response.ok) {
        if (!data.userid) {
          alert(
            "Account creation was successful, but the user ID was not received.",
          );
          return;
        }

        await AsyncStorage.setItem("userid", String(data.userid));

        router.replace("/onboarding");
      } else if (response.status === 400) {
        if (data.userid) {
          await AsyncStorage.setItem("userid", String(data.userid));
        }

        setOtpSent(true);

        alert(
          data.message ||
            "Your account requires email verification. An OTP has been sent to your email.",
        );
      } else if (response.status === 409) {
        alert(
          data.message || "An account with this email address already exists.",
        );
      } else if (response.status >= 500) {
        alert("The server is currently unavailable. Please try again later.");
      } else {
        alert(
          data.message || "Unable to create your account. Please try again.",
        );
      }
    } catch (error: any) {
      console.log("Signup Error:", error);

      alert(
        "Something went wrong while creating your account. Please try again.",
      );
    }
  };
  const handleLogin = async () => {
    try {
      // Validate email
      if (!email.trim()) {
        alert("Please enter your email address.");
        return;
      }

      // Validate password
      if (!password.trim()) {
        alert("Please enter your password.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim())) {
        alert("Please enter a valid email address.");
        return;
      }

      let response;

      try {
        response = await fetch(`${BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        });
      } catch (error) {
        console.log("Login Network Error:", error);

        alert(
          "Unable to connect to the server. Please check your internet connection and try again.",
        );
        return;
      }

      let data;

      try {
        data = await response.json();
      } catch (error) {
        alert("The server returned an invalid response. Please try again.");
        return;
      }

      console.log("Login Response:", data);
      console.log("Status:", response.status);

      // LOGIN SUCCESS
      if (response.ok) {
        const userid = data.userid ?? data.userId;

        if (!userid) {
          alert(
            "Login was successful, but the user ID was not received from the server.",
          );
          return;
        }

        await AsyncStorage.setItem("userid", String(userid));

        // Save token if provided
        if (data.token) {
          await AsyncStorage.setItem("token", data.token);
        }

        // Check profile
        try {
          const profileResponse = await fetch(
            `${BASE_URL}/get-profile/?userid=${userid}`,
          );

          const profileData = await profileResponse.json();

          console.log("Profile Response:", profileData);

          if (profileData.success) {
            // Existing user
            router.replace("/dashboard");
          } else {
            // Profile not completed
            router.replace("/onboarding");
          }
        } catch (error) {
          console.log("Profile Check Error:", error);

          alert(
            "Login was successful, but we could not load your profile. Please try again.",
          );
        }

        return;
      }

      // OTP REQUIRED
      if (response.status === 400) {
        if (data.userid) {
          await AsyncStorage.setItem("userid", String(data.userid));
        }

        setLoginOtpRequired(true);

        alert(
          data.message ||
            "Email verification is required. Please enter the OTP sent to your email.",
        );

        return;
      }

      // INVALID CREDENTIALS
      if (response.status === 401) {
        alert(
          data.message ||
            "Incorrect email or password. Please check your credentials and try again.",
        );

        return;
      }

      // USER NOT FOUND
      if (response.status === 404) {
        alert(data.message || "No account was found with this email address.");

        return;
      }

      // SERVER ERROR
      if (response.status >= 500) {
        alert("The server is currently unavailable. Please try again later.");

        return;
      }

      // OTHER ERROR
      alert(
        data.message ||
          "Unable to log in. Please check your details and try again.",
      );
    } catch (error: any) {
      console.log("Login Error:", error);

      alert("Something went wrong while logging in. Please try again.");
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
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={handleAuthButtonPress}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting
                ? "Please wait..."
                : isSignup
                  ? "Start Free Today"
                  : "Sign In"}
            </Text>

            {!isSubmitting && (
              <Ionicons name="arrow-forward" size={18} color="white" />
            )}
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
