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

export default function TermsAndConditions() {
  const { colors } = useTheme();

  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Terms & Conditions</Text>

        <View style={{ width: 28 }} />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <Text style={styles.title}>Terms & Conditions</Text>

        <Text style={styles.date}>Effective Date: July 16, 2026</Text>

        <Text style={styles.paragraph}>
          Welcome to Tack AI ("Tack AI", "we", "our", or "us"). These Terms and
          Conditions ("Terms") govern your access to and use of the Tack AI
          mobile application and related services (collectively, the "Service").
          By downloading, installing, accessing, or using the Service, you agree
          to be bound by these Terms. If you do not agree, please do not use the
          Service.
        </Text>

        {/* ===================== */}
        {/* 1 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>

        <Text style={styles.paragraph}>
          By creating an account or otherwise using the Service, you confirm
          that you have read, understood, and agree to these Terms and our
          Privacy Policy. These Terms form a legally binding agreement between
          you and Tack AI.
        </Text>

        {/* ===================== */}
        {/* 2 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>2. Eligibility</Text>

        <Text style={styles.paragraph}>
          You must be at least 13 years old (or the minimum age required in your
          country) to use the Service. If you are under the age of majority in
          your jurisdiction, you may use the Service only with the involvement
          and consent of a parent or legal guardian.
        </Text>

        <Text style={styles.paragraph}>
          By using the Service, you represent and warrant that you meet these
          eligibility requirements.
        </Text>

        {/* ===================== */}
        {/* 3 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>3. User Accounts</Text>

        <Text style={styles.paragraph}>
          To access certain features, you must create an account using an email
          address and password or through Google Sign-In. You agree to provide
          accurate, current, and complete information and to keep it up to date.
        </Text>

        <Text style={styles.paragraph}>
          You are responsible for safeguarding your account credentials and for
          any activity that occurs under your account. Notify us immediately if
          you suspect any unauthorized use of your account.
        </Text>

        {/* ===================== */}
        {/* 4 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>4. User Responsibilities</Text>

        <Text style={styles.paragraph}>
          You are solely responsible for the information you provide to the
          Service, including profile details, health metrics, food images, and
          any content you upload.
        </Text>

        <Text style={styles.paragraph}>
          You agree to use the Service only for lawful, personal, and
          non-commercial purposes.
        </Text>

        {/* ===================== */}
        {/* 5 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>5. Acceptable Use</Text>

        <Text style={styles.paragraph}>You agree not to:</Text>

        <Text style={styles.bullet}>
          • Use the Service in violation of any applicable law or regulation.
        </Text>

        <Text style={styles.bullet}>
          • Upload content that is unlawful, harmful, infringing, obscene, or
          misleading.
        </Text>

        <Text style={styles.bullet}>
          • Attempt to reverse engineer, decompile, or gain unauthorized access
          to the Service or its systems.
        </Text>

        <Text style={styles.bullet}>
          • Interfere with, disrupt, or overload the Service or the servers or
          networks connected to it.
        </Text>

        <Text style={styles.bullet}>
          • Use automated tools (bots or scrapers) to access the Service without
          our written permission.
        </Text>

        <Text style={styles.bullet}>
          • Impersonate any person or misrepresent your affiliation with any
          entity.
        </Text>

        {/* ===================== */}
        {/* 6 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>
          6. AI-Generated Recommendations Disclaimer
        </Text>

        <Text style={styles.paragraph}>
          The Service uses artificial intelligence to estimate nutritional
          information from food images and generate personalized meal and
          workout suggestions.
        </Text>

        <Text style={styles.paragraph}>
          AI outputs are generated automatically and may be inaccurate,
          incomplete, or unsuitable for your circumstances. You should
          independently verify all information before relying on it and use your
          own judgment when following any suggestion.
        </Text>
        {/* ===================== */}
        {/* 7 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>7. Health Disclaimer</Text>

        <Text style={styles.paragraph}>
          Tack AI is a general wellness and fitness tool. It is not a medical
          device and does not provide medical advice, diagnosis, or treatment.
          The Service is not a substitute for professional medical, nutritional,
          or fitness advice.
        </Text>

        <Text style={styles.paragraph}>
          Always consult a qualified healthcare professional before beginning
          any diet, exercise, or weight-management program, particularly if you
          have a medical condition, are pregnant or nursing, are under 18, or
          take medication.
        </Text>

        <Text style={styles.paragraph}>
          If you experience any symptoms or medical emergency, stop using the
          Service and seek immediate medical attention.
        </Text>

        {/* ===================== */}
        {/* 8 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>8. Intellectual Property</Text>

        <Text style={styles.paragraph}>
          The Service, including its software, design, text, graphics, logos,
          and AI models, is owned by Tack AI or its licensors and is protected
          by intellectual property laws.
        </Text>

        <Text style={styles.paragraph}>
          We grant you a limited, non-exclusive, non-transferable, revocable
          license to use the Service for personal, non-commercial purposes in
          accordance with these Terms.
        </Text>

        <Text style={styles.paragraph}>
          You retain ownership of the content you submit. By submitting content
          (including food images and profile data), you grant us a worldwide,
          royalty-free license to store, process, and analyze that content
          solely to operate, improve, and provide the Service to you.
        </Text>

        {/* ===================== */}
        {/* 9 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>9. Subscriptions and Payments</Text>

        <Text style={styles.paragraph}>
          Some features of the Service may now or in the future be offered on a
          paid or subscription basis ("Premium Features"). If you purchase
          Premium Features:
        </Text>

        <Text style={styles.bullet}>
          • Payments are processed through the Apple App Store, Google Play
          Store, or another approved payment processor and are subject to their
          terms.
        </Text>

        <Text style={styles.bullet}>
          • Subscriptions automatically renew unless cancelled at least 24 hours
          before the end of the current billing period.
        </Text>

        <Text style={styles.bullet}>
          • Refunds are handled according to the applicable app store or payment
          processor policy.
        </Text>

        <Text style={styles.bullet}>
          • Prices, features, and billing cycles may change. We will provide
          reasonable notice of any material changes.
        </Text>

        {/* ===================== */}
        {/* 10 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>
          10. Account Suspension or Termination
        </Text>

        <Text style={styles.paragraph}>
          We may suspend, restrict, or terminate your account at any time, with
          or without notice, if we believe you have violated these Terms,
          created legal or security risks, or if we discontinue the Service.
        </Text>

        <Text style={styles.paragraph}>
          You may delete your account at any time from within the app.
        </Text>

        {/* ===================== */}
        {/* 11 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>11. Limitation of Liability</Text>

        <Text style={styles.paragraph}>
          To the maximum extent permitted by law, Tack AI and its officers,
          employees, affiliates, and agents shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or
          any loss of profits, data, goodwill, or other intangible losses
          arising out of or in connection with your use of the Service.
        </Text>

        <Text style={styles.paragraph}>
          Our total liability for any claim relating to the Service shall not
          exceed the greater of:
        </Text>

        <Text style={styles.bullet}>
          • The amount you paid us during the previous twelve (12) months, or
        </Text>

        <Text style={styles.bullet}>• USD $50.</Text>

        {/* ===================== */}
        {/* 12 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>12. Disclaimer of Warranties</Text>

        <Text style={styles.paragraph}>
          The Service is provided on an "as is" and "as available" basis without
          warranties of any kind, whether express or implied, including
          warranties of merchantability, fitness for a particular purpose,
          non-infringement, accuracy, or uninterrupted operation.
        </Text>

        <Text style={styles.paragraph}>
          We do not warrant that the Service will meet your requirements or that
          AI-generated results will be accurate, complete, or reliable.
        </Text>
        {/* ===================== */}
        {/* 13 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>13. Indemnification</Text>

        <Text style={styles.paragraph}>
          You agree to indemnify, defend, and hold harmless Tack AI, its
          affiliates, officers, employees, licensors, and agents from any
          claims, damages, liabilities, losses, costs, and expenses (including
          reasonable legal fees) arising out of or related to:
        </Text>

        <Text style={styles.bullet}>• Your use of the Service.</Text>

        <Text style={styles.bullet}>• Your submitted content.</Text>

        <Text style={styles.bullet}>• Your violation of these Terms.</Text>

        <Text style={styles.bullet}>
          • Your violation of another person's rights.
        </Text>

        {/* ===================== */}
        {/* 14 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>14. Governing Law</Text>

        <Text style={styles.paragraph}>
          These Terms are governed by and construed in accordance with the laws
          of India, without regard to its conflict of law principles.
        </Text>

        <Text style={styles.paragraph}>
          You agree that any disputes arising from these Terms or your use of
          the Service shall be subject to the exclusive jurisdiction of the
          competent courts located in India, unless applicable law requires
          otherwise.
        </Text>

        {/* ===================== */}
        {/* 15 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>15. Changes to the Terms</Text>

        <Text style={styles.paragraph}>
          We may update these Terms from time to time. When changes are made, we
          will revise the Effective Date above and, where appropriate, notify
          you within the Service.
        </Text>

        <Text style={styles.paragraph}>
          Your continued use of the Service after any changes become effective
          constitutes your acceptance of the updated Terms.
        </Text>

        {/* ===================== */}
        {/* 16 */}
        {/* ===================== */}

        <Text style={styles.sectionTitle}>16. Contact Information</Text>

        <Text style={styles.paragraph}>
          If you have any questions about these Terms & Conditions, please
          contact us:
        </Text>

        <Text style={styles.email}>Email: support@tackai.app</Text>

        <Text style={styles.footer}>© 2026 Tack AI. All rights reserved.</Text>
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      marginTop: 35,
    },

    content: {
      paddingHorizontal: 20,
      paddingTop: 25,
      paddingBottom: 40,
    },

    header: {
      paddingTop: 15,

      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      marginBottom: 25,
    },

    headerTitle: {
      fontSize: 22,

      fontWeight: "700",

      color: colors.text,
    },

    title: {
      fontSize: 30,

      fontWeight: "700",

      color: colors.text,
    },

    date: {
      fontSize: 15,

      color: colors.secondaryText,

      marginTop: 6,

      marginBottom: 22,
    },

    sectionTitle: {
      fontSize: 22,

      fontWeight: "700",

      color: colors.text,

      marginTop: 30,

      marginBottom: 12,
    },

    paragraph: {
      fontSize: 15,

      lineHeight: 26,

      color: colors.secondaryText,

      marginBottom: 12,
    },

    bullet: {
      fontSize: 15,

      lineHeight: 26,

      color: colors.secondaryText,

      marginBottom: 8,

      marginLeft: 8,
    },

    email: {
      fontSize: 16,

      fontWeight: "600",

      color: colors.primary,

      marginTop: 10,
    },

    footer: {
      marginTop: 40,

      textAlign: "center",

      fontSize: 14,

      color: colors.secondaryText,
    },
  });
