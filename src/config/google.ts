import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const configureGoogle = () => {
  GoogleSignin.configure({
    webClientId:
      "726131849401-ccea66ko3nkdguchke8in2hkq60jtrqb.apps.googleusercontent.com",

    offlineAccess: true,

    forceCodeForRefreshToken: true,
  });
};
