import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function PrivacyPolicy() {
    const {colors}=useTheme();

  const styles=createStyles(colors);
  return (
    <View style={styles.container}>
  {/* Fixed Header */}
  <View style={styles.header}>
    <TouchableOpacity onPress={() => router.back()}>
      <Ionicons
  name="arrow-back"
  size={28}
  color={colors.text}
/>
    </TouchableOpacity>

    <Text style={styles.headerTitle}>
      Privacy Policy
    </Text>

    <View style={{ width: 28 }} />
  </View>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      

      <Text style={styles.title}>
        Privacy Policy
      </Text>

      <Text style={styles.date}>
        Effective Date: July 16, 2026
      </Text>

      <Text style={styles.paragraph}>
        Tack AI ("we", "our", or "us")
        respects your privacy. This
        Privacy Policy explains how we
        collect, use, share, and protect
        your information when you use
        the Tack AI mobile application
        and related services (the
        "Service"). By using the Service,
        you agree to the practices
        described below.
      </Text>

      {/* ===================== */}
      {/* 1 */}
      {/* ===================== */}

      <Text style={styles.sectionTitle}>
        1. Information We Collect
      </Text>

      <Text style={styles.subTitle}>
        1.1 Personal Information
      </Text>

      <Text style={styles.paragraph}>
        When you create an account, we
        collect your name, email
        address, and password
        credentials (or a Google account
        identifier if you sign in with
        Google). You may also provide a
        profile picture and contact
        information when reaching out to
        support.
      </Text>

      <Text style={styles.subTitle}>
        1.2 Health and Fitness
        Information
      </Text>

      <Text style={styles.paragraph}>
        To personalize the Service, we
        collect information such as your
        age, gender, height, weight,
        activity level, dietary
        preferences, fitness goals,
        workout logs, meal logs, water
        intake, step counts, and
        progress history that you enter
        or that the app records with
        your permission.
      </Text>

      <Text style={styles.subTitle}>
        1.3 Images Uploaded for Food
        Recognition
      </Text>

      <Text style={styles.paragraph}>
        When you upload or capture a
        photo of food, the image is
        transmitted to our servers and
        processed by our AI model to
        estimate the foods present and
        their nutritional content.
        Images are used solely to
        provide this analysis and to
        maintain your personal food log,
        and are not used for
        advertising.
      </Text>

      <Text style={styles.subTitle}>
        1.4 Google Sign-In Information
      </Text>

      <Text style={styles.paragraph}>
        If you sign in with Google, we
        receive basic profile
        information from Google,
        including your name, email
        address, and profile picture, in
        accordance with the permissions
        you grant. We do not receive
        your Google password. Our use of
        Google user data complies with
        the Google API Services User
        Data Policy, including the
        Limited Use requirements.
      </Text>

      <Text style={styles.subTitle}>
        1.5 Device Information
      </Text>

      <Text style={styles.paragraph}>
        We automatically collect certain
        technical information such as
        device model, operating system
        version, language, time zone,
        app version, unique device
        identifiers, crash logs, and
        general diagnostic data to help
        us maintain and improve the
        Service.
      </Text>

      <Text style={styles.subTitle}>
        1.6 Cookies and Analytics
      </Text>

      <Text style={styles.paragraph}>
        We may use cookies, SDKs, or
        similar technologies to
        understand how the Service is
        used, measure performance, and
        improve features. Analytics data
        is aggregated and does not
        identify you personally in
        reports.
      </Text>

      {/* ===================== */}
      {/* 2 */}
      {/* ===================== */}

      <Text style={styles.sectionTitle}>
        2. How We Use Your Data
      </Text>

      <Text style={styles.bullet}>
        • Create and manage your
        account.
      </Text>

      <Text style={styles.bullet}>
        • Provide, personalize, and
        improve the Service, including
        AI-generated meal and workout
        recommendations.
      </Text>

      <Text style={styles.bullet}>
        • Process food images to
        estimate calories and
        nutritional information.
      </Text>

      <Text style={styles.bullet}>
        • Track your progress and
        display your history within the
        app.
      </Text>

      <Text style={styles.bullet}>
        • Send notifications,
        reminders, and important account
        or service messages (when
        enabled).
      </Text>

      <Text style={styles.bullet}>
        • Respond to your support
        requests.
      </Text>

      <Text style={styles.bullet}>
        • Detect, prevent, and address
        technical issues, fraud, or
        abuse.
      </Text>

      <Text style={styles.bullet}>
        • Comply with legal obligations
        and enforce our Terms and
        Conditions.
      </Text>

      {/* ===================== */}
      {/* 3 */}
      {/* ===================== */}

      <Text style={styles.sectionTitle}>
        3. AI Processing of Uploaded
        Images
      </Text>

      <Text style={styles.paragraph}>
        Uploaded food images are
        processed by our AI systems
        solely to identify foods and
        estimate nutritional values for
        your personal log. We do not
        sell your images, and we do not
        use your images to identify you
        or third parties. Images may be
        retained in association with
        your food log so you can review
        your history, and you may delete
        them at any time.
      </Text>

      {/* ===================== */}
      {/* 4 */}
      {/* ===================== */}

      <Text style={styles.sectionTitle}>
        4. Data Storage and Security
      </Text>

      <Text style={styles.paragraph}>
        Your data is stored on secure
        servers operated by us or
        trusted infrastructure providers
        acting on our behalf. We use
        industry-standard safeguards,
        including encryption in transit
        (HTTPS/TLS) and, where
        appropriate, encryption at rest,
        access controls, and monitoring,
        to protect your information.
      </Text>

      <Text style={styles.paragraph}>
        No system is 100% secure. While
        we work hard to protect your
        data, we cannot guarantee
        absolute security. You are
        responsible for maintaining the
        confidentiality of your account
        credentials.
      </Text>
            {/* ===================== */}
      {/* 5 */}
      {/* ===================== */}

      <Text style={styles.sectionTitle}>
        5. Third-Party Services
      </Text>

      <Text style={styles.paragraph}>
        We may share limited information
        with trusted third-party
        providers who help us operate
        the Service, such as
        authentication providers (e.g.,
        Google Sign-In), cloud hosting
        and storage providers, AI model
        providers used to process food
        images and generate
        recommendations, analytics and
        crash-reporting providers, and
        payment processors (if premium
        features are offered).
      </Text>

      <Text style={styles.paragraph}>
        These providers are only
        permitted to use your
        information to perform services
        for us and are contractually
        required to protect it. We do
        not sell your personal
        information.
      </Text>

      {/* ===================== */}
      {/* 6 */}
      {/* ===================== */}

      <Text style={styles.sectionTitle}>
        6. User Rights
      </Text>

      <Text style={styles.paragraph}>
        Depending on your location, you
        may have the right to:
      </Text>

      <Text style={styles.bullet}>
        • Access, correct, or update
        your personal information.
      </Text>

      <Text style={styles.bullet}>
        • Request a copy of the data we
        hold about you.
      </Text>

      <Text style={styles.bullet}>
        • Object to or restrict certain
        processing.
      </Text>

      <Text style={styles.bullet}>
        • Withdraw consent where
        processing is based on consent.
      </Text>

      <Text style={styles.bullet}>
        • Lodge a complaint with your
        local data protection authority.
      </Text>

      <Text style={styles.paragraph}>
        You can exercise most of these
        rights directly from within the
        app or by contacting us at the
        email below.
      </Text>

      {/* ===================== */}
      {/* 7 */}
      {/* ===================== */}

      <Text style={styles.sectionTitle}>
        7. Account Deletion
      </Text>

      <Text style={styles.paragraph}>
        You may permanently delete your
        account and associated data at
        any time from the app's Profile
        settings ("Delete my account &
        data") or by contacting us. When
        you delete your account, we
        remove your profile, logs,
        uploaded images, and other
        personal data from our active
        systems.
      </Text>

      <Text style={styles.paragraph}>
        Some information may remain in
        secure backups for a limited
        period, or where retention is
        required by law.
      </Text>

      {/* ===================== */}
      {/* 8 */}
      {/* ===================== */}

      <Text style={styles.sectionTitle}>
        8. Data Retention
      </Text>

      <Text style={styles.paragraph}>
        We retain your personal
        information for as long as your
        account is active or as needed
        to provide the Service. When you
        delete your account, we delete
        or anonymize your data within a
        reasonable period, except where
        retention is necessary to comply
        with legal obligations, resolve
        disputes, or enforce our
        agreements.
      </Text>
            {/* ===================== */}
      {/* 9 */}
      {/* ===================== */}

      <Text style={styles.sectionTitle}>
        9. Children's Privacy
      </Text>

      <Text style={styles.paragraph}>
        The Service is not intended for
        children under 13 (or the
        minimum age required in your
        country). We do not knowingly
        collect personal information
        from children under this age. If
        we learn that we have collected
        such information, we will delete
        it promptly. Parents or
        guardians who believe their
        child has provided us with
        personal information should
        contact us.
      </Text>

      {/* ===================== */}
      {/* 10 */}
      {/* ===================== */}

      <Text style={styles.sectionTitle}>
        10. International Users
      </Text>

      <Text style={styles.paragraph}>
        Your information may be stored
        and processed in countries other
        than the one in which you
        reside. These countries may have
        data protection laws different
        from those of your country. By
        using the Service, you consent
        to the transfer of your
        information to these locations,
        subject to appropriate
        safeguards.
      </Text>

      {/* ===================== */}
      {/* 11 */}
      {/* ===================== */}

      <Text style={styles.sectionTitle}>
        11. Changes to This Privacy
        Policy
      </Text>

      <Text style={styles.paragraph}>
        We may update this Privacy
        Policy from time to time to
        reflect changes in our
        practices, technology, or legal
        requirements. When we do, we
        will update the Effective Date
        above and, where appropriate,
        notify you within the Service.
        Your continued use of the
        Service after changes take
        effect constitutes your
        acceptance of the revised
        policy.
      </Text>

      {/* ===================== */}
      {/* 12 */}
      {/* ===================== */}

      <Text style={styles.sectionTitle}>
        12. Contact Information
      </Text>

      <Text style={styles.paragraph}>
        If you have questions,
        concerns, or requests regarding
        this Privacy Policy or your
        personal data, please contact
        us at:
      </Text>

      <Text style={styles.email}>
        Email: support@tackai.in
      </Text>

      <Text style={styles.footer}>
        © 2026 Tack AI. All rights
        reserved.
      </Text>
    </ScrollView>
    </View>
  );
}

const createStyles = (colors:any) =>
StyleSheet.create({

container:{
  flex:1,
  backgroundColor:colors.background,
},


content:{
  paddingHorizontal:20,
  paddingTop:5,
  paddingBottom:40,
},


header:{

  marginTop:15,

  flexDirection:"row",

  alignItems:"center",

  justifyContent:"space-between",

  marginBottom:25,

},


headerTitle:{

  fontSize:22,

  fontWeight:"700",

  color:colors.text,

},


title:{

  fontSize:30,

  fontWeight:"700",

  color:colors.text,

},


date:{

  fontSize:15,

  color:colors.secondaryText,

  marginTop:6,

  marginBottom:22,

},



sectionTitle:{

  fontSize:22,

  fontWeight:"700",

  color:colors.text,

  marginTop:30,

  marginBottom:12,

},



subTitle:{

  fontSize:17,

  fontWeight:"600",

  color:colors.text,

  marginTop:14,

  marginBottom:6,

},



paragraph:{

  fontSize:15,

  lineHeight:26,

  color:colors.secondaryText,

  marginBottom:12,

},



bullet:{

  fontSize:15,

  lineHeight:26,

  color:colors.secondaryText,

  marginBottom:8,

  marginLeft:8,

},



email:{

  fontSize:16,

  fontWeight:"600",

  color:colors.primary,

  marginTop:10,

},



footer:{

  textAlign:"center",

  fontSize:14,

  color:colors.secondaryText,

  marginTop:40,

},


});