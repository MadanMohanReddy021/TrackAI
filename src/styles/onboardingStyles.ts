import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({

container:{
 flex:1,
 backgroundColor: colors.background,
 paddingHorizontal:20
},


card:{
 backgroundColor: colors.card,
 borderRadius:20,
 padding:20,
 marginBottom:12,
 borderWidth:1,
 borderColor:colors.border
},
heading: {
  color: colors.text,
},

input:{
 height:55,
 backgroundColor:colors.card,
 borderRadius:18,
 paddingHorizontal:18,
 borderWidth:1,
 borderColor:colors.border,
 marginBottom:12,
 color:colors.text
},


button:{
 height:55,
 borderRadius:18,
 justifyContent:"center",
 alignItems:"center",
 backgroundColor:colors.button
},


buttonText:{
 color:colors.buttonText,
 fontSize:16,
 fontWeight:"600"
},


title:{
 fontSize:30,
 color:colors.text
},


sub:{
 color:colors.secondaryText,
 marginTop:10
},


choiceCard: {
  backgroundColor: colors.card,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 18,
  padding: 18,
  marginBottom: 14,
  flexDirection: "row",
  alignItems: "center",
},


choiceCardSelected: {
  borderColor: colors.primary,
  borderWidth: 2,
  backgroundColor: colors.background,
},


choiceTitle: {
  fontSize: 16,
  fontWeight: "600",
  color: colors.text,
},


choiceDescription: {
  marginTop: 4,
  fontSize: 13,
  color: colors.secondaryText,
},


choiceCircle: {
  width: 26,
  height: 26,
  borderRadius: 13,
  borderWidth: 2,
  borderColor: colors.border,
  justifyContent: "center",
  alignItems: "center",
},


choiceCircleSelected: {
  backgroundColor: colors.primary,
  borderColor: colors.primary,
},


choiceCheck: {
  color: colors.buttonText,
  fontSize: 14,
  fontWeight: "700",
},


progressContainer: {
  width: "100%",
  marginBottom: 30,
},


progressBackground: {
  height: 4,
  width: "100%",
  backgroundColor: colors.border,
  borderRadius: 10,
  overflow: "hidden",
},


progressFill: {
  height: 4,
  borderRadius: 10,
  backgroundColor: colors.progress,
},


heading: {
  fontSize: 30,
  fontWeight: "700",
  color: colors.text,
  marginBottom: 8,
},


subHeading: {
  fontSize: 15,
  color: colors.secondaryText,
  marginBottom: 24,
},


sectionTitle: {
  fontSize: 16,
  fontWeight: "600",
  color: colors.text,
  marginTop: 10,
  marginBottom: 10,
},


summaryTitle:{
  fontSize:18,
  fontWeight:"700",
  marginBottom:15,
  color:colors.text
},


summaryRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginBottom:12
},


summaryLabel:{
  fontSize:15,
  color:colors.secondaryText
},


summaryValue:{
  fontSize:15,
  fontWeight:"700",
  color:colors.text
},


header:{
  marginTop:50,
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-between",
  marginBottom:20,
},


backButton:{
  width:40,
  height:40,
  borderRadius:20,
  backgroundColor:colors.card,
  borderWidth:1,
  borderColor:colors.border,
  justifyContent:"center",
  alignItems:"center",
},


backText:{
  fontSize:24,
  color:colors.text,
},


stepText:{
  color:colors.secondaryText,
  fontSize:12,
  letterSpacing:1,
},


content:{
  flex:1,
},


unitContainer: {
  flexDirection: "row",
  marginBottom: 15,
},


unitButton: {
  flex: 1,
  paddingVertical: 12,
  alignItems: "center",
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 10,
  marginRight: 10,
},


selectedUnit: {
  backgroundColor: colors.primary,
  borderColor: colors.primary,
},

});