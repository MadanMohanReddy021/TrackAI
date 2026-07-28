import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    backgroundColor: colors.badgeBackground,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 100,
    alignItems: "center",
    marginBottom: 30,
  },

  badgeText: {
    marginLeft: 8,
    color: colors.primary,
    fontWeight: "600",
    fontSize: 13,
  },

  title: {
    fontSize: 42,
    fontWeight: "800",
    lineHeight: 48,
    color: colors.text,
  },

  subtitle: {
    marginTop: 18,
    fontSize: 16,
    color: colors.secondaryText,
    lineHeight: 25,
    marginBottom: 35,
  },


  tabs: {
    flexDirection: "row",
    backgroundColor: colors.cardSecondary,
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
    backgroundColor: colors.card,
    borderRadius: 10,
  },


  tabText: {
    marginLeft: 8,
    color: colors.secondaryText,
    fontWeight: "600",
  },


  activeText: {
    color: colors.primary,
  },


  label: {
    marginBottom: 10,
    color: colors.text,
    fontWeight: "600",
    fontSize: 15,
  },


  heroCircle:{
    alignSelf:"center",
    width:170,
    height:170,
    borderRadius:100,
    backgroundColor:colors.badgeBackground,
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
    backgroundColor:colors.avatar,
    marginRight:-8,
    borderWidth:2,
    borderColor:colors.background,
  },


  rating:{
    fontSize:15,
    color:colors.primary,
    fontWeight:"700",
  },


  trusted:{
    fontSize:13,
    color:colors.secondaryText,
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
    color:colors.placeholder,
    fontSize:13,
  },


  input:{
    height:58,
    backgroundColor:colors.input,
    borderRadius:14,
    borderWidth:1,
    borderColor:colors.border,
    paddingHorizontal:18,
    marginBottom:22,
    fontSize:15,
    color:colors.text,
  },


  passwordContainer:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:colors.input,
    borderRadius:14,
    borderWidth:1,
    borderColor:colors.border,
    paddingHorizontal:18,
    height:58,
  },


  passwordInput:{
    flex:1,
    fontSize:15,
    color:colors.text,
  },


  button:{
    marginTop:28,
    height:60,
    backgroundColor:colors.button,
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
  },


  buttonText:{
    color:colors.buttonText,
    fontWeight:"700",
    fontSize:16,
    marginRight:10,
  },


  dividerRow:{
    flexDirection:"row",
    alignItems:"center",
    marginVertical:28,
  },


  line:{
    flex:1,
    height:1,
    backgroundColor:colors.border,
  },


  or:{
    marginHorizontal:15,
    color:colors.secondaryText,
    fontWeight:"600",
  },


  googleButton:{
    height:58,
    backgroundColor:colors.card,
    borderRadius:15,
    borderWidth:1,
    borderColor:colors.border,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
  },


  googleText:{
    marginLeft:12,
    fontWeight:"600",
    fontSize:15,
    color:colors.text,
  },


});