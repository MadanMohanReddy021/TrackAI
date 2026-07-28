import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

import {
  DarkTheme,
  LightTheme,
} from "@/theme/colors";

import { Appearance } from "react-native";


type ThemeType = "light" | "dark" | "system";


const ThemeContext = createContext<any>(null);


export const ThemeProvider = ({ children }: any) => {

  const [theme, setThemeState] = useState<ThemeType>("system");


  useEffect(() => {
    loadTheme();
  }, []);


  const loadTheme = async () => {

    const saved = await AsyncStorage.getItem("theme");


    if (
      saved === "light" ||
      saved === "dark" ||
      saved === "system"
    ) {
      setThemeState(saved);
    }

  };


  const setTheme = async (value: ThemeType) => {

    setThemeState(value);

    await AsyncStorage.setItem(
      "theme",
      value
    );

  };


  const systemTheme =
    Appearance.getColorScheme();


  const isDark =
    theme === "dark" ||
    (
      theme === "system" &&
      systemTheme === "dark"
    );


  const colors = isDark
    ? DarkTheme
    : LightTheme;



  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        colors,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};



export const useTheme = () => {

  const context = useContext(ThemeContext);


  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }


  return context;

};