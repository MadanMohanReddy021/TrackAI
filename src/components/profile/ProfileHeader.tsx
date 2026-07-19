import {
    ArrowLeft,
    Settings,
    UserCog,
} from "lucide-react-native";
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface Props {
  name: string;
  email: string;

  onBack: () => void;

  onSettings: () => void;

  onEditProfile: () => void;
}

const ProfileHeader: React.FC<Props> = ({
  name,
  email,
  onBack,
  onSettings,
  onEditProfile,
}) => {
  const firstName =
    name?.split(" ")[0] ||
    email?.split("@")[0] ||
    "User";

  const initials =
    (name || email || "U")
      .charAt(0)
      .toUpperCase();

  return (
    <View>

      {/* Top Header */}

      <View style={styles.header}>

        <Pressable
          style={styles.iconButton}
          onPress={onBack}
        >
          <ArrowLeft size={22} color="#222" />
        </Pressable>

        <Text style={styles.title}>
          My Profile
        </Text>

        <Pressable
          style={styles.iconButton}
          onPress={onSettings}
        >
          <Settings size={22} color="#222" />
        </Pressable>

      </View>

      {/* User Card */}

      <View style={styles.userContainer}>

        <View style={styles.avatar}>

          <Text style={styles.avatarText}>
            {initials}
          </Text>

        </View>

        <View style={styles.userInfo}>

          <Text style={styles.name}>
            Hi {firstName} 👋
          </Text>

          <Text style={styles.subtitle}>
            Let's keep you healthy and consistent.
          </Text>

        </View>

        <Pressable
          style={styles.editButton}
          onPress={onEditProfile}
        >
          <UserCog
            size={18}
            color="#059669"
          />

          <Text style={styles.editText}>
            Edit
          </Text>

        </Pressable>

      </View>

    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({

  header: {
    height: 60,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingHorizontal: 18,

    backgroundColor: "#F7F7F5",

    borderBottomWidth: 1,

    borderBottomColor: "#ECECEC",
  },

  title: {
    fontSize: 18,

    fontWeight: "700",

    color: "#222",
  },

  iconButton: {
    width: 40,

    height: 40,

    justifyContent: "center",

    alignItems: "center",

    borderRadius: 20,
  },

  userContainer: {
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 20,

    paddingVertical: 20,
  },

  avatar: {
    width: 68,

    height: 68,

    borderRadius: 34,

    backgroundColor: "#10B981",

    justifyContent: "center",

    alignItems: "center",
  },

  avatarText: {
    color: "#FFF",

    fontSize: 28,

    fontWeight: "700",
  },

  userInfo: {
    flex: 1,

    marginLeft: 16,
  },

  name: {
    fontSize: 22,

    fontWeight: "700",

    color: "#111",
  },

  subtitle: {
    marginTop: 5,

    fontSize: 14,

    color: "#777",
  },

  editButton: {
    flexDirection: "row",

    alignItems: "center",

    borderWidth: 1,

    borderColor: "#10B981",

    paddingHorizontal: 14,

    paddingVertical: 8,

    borderRadius: 22,
  },

  editText: {
    marginLeft: 6,

    color: "#059669",

    fontWeight: "600",
  },

});