import { StyleSheet } from "react-native";


export default StyleSheet.create({

container:{
 flex:1,
 backgroundColor:"#FAF7F1",
 paddingHorizontal:20
},


card:{
 backgroundColor:"#fff",
 borderRadius:20,
 padding:20,
 marginBottom:12,
 borderWidth:1,
 borderColor:"#ECE6D8"
},


input:{
 height:55,
 backgroundColor:"#fff",
 borderRadius:18,
 paddingHorizontal:18,
 borderWidth:1,
 borderColor:"#ECE6D8",
 marginBottom:12
},


button:{
 height:55,
 borderRadius:18,
 justifyContent:"center",
 alignItems:"center",
 backgroundColor:"#C9A24B"
},


buttonText:{
 color:"#fff",
 fontSize:16,
 fontWeight:"600"
},


title:{
 fontSize:30,
 color:"#1A1A1A"
},


sub:{
 color:"#8A8579",
 marginTop:10
},
choiceCard: {
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#ECE6D8",
  borderRadius: 18,
  padding: 18,
  marginBottom: 14,
  flexDirection: "row",
  alignItems: "center",
},

choiceCardSelected: {
  borderColor: "#C9A24B",
  borderWidth: 2,
  backgroundColor: "#FFF9EC",
},

choiceTitle: {
  fontSize: 16,
  fontWeight: "600",
  color: "#1A1A1A",
},

choiceDescription: {
  marginTop: 4,
  fontSize: 13,
  color: "#8A8579",
},

choiceCircle: {
  width: 26,
  height: 26,
  borderRadius: 13,
  borderWidth: 2,
  borderColor: "#ECE6D8",
  justifyContent: "center",
  alignItems: "center",
},

choiceCircleSelected: {
  backgroundColor: "#C9A24B",
  borderColor: "#C9A24B",
},

choiceCheck: {
  color: "#FFFFFF",
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
  backgroundColor: "#ECE6D8",
  borderRadius: 10,
  overflow: "hidden",
},

progressFill: {
  height: 4,
  borderRadius: 10,
},
heading: {
  fontSize: 30,
  fontWeight: "700",
  color: "#1A1A1A",
  marginBottom: 8,
},

subHeading: {
  fontSize: 15,
  color: "#8A8579",
  marginBottom: 24,
},

sectionTitle: {
  fontSize: 16,
  fontWeight: "600",
  color: "#1A1A1A",
  marginTop: 10,
  marginBottom: 10,
},
summaryTitle:{
  fontSize:18,
  fontWeight:"700",
  marginBottom:15,
  color:"#1A1A1A"
},

summaryRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginBottom:12
},

summaryLabel:{
  fontSize:15,
  color:"#8A8579"
},

summaryValue:{
  fontSize:15,
  fontWeight:"700",
  color:"#1A1A1A"
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
  backgroundColor:"#FFFFFF",
  borderWidth:1,
  borderColor:"#ECE6D8",
  justifyContent:"center",
  alignItems:"center",
},



backText:{
  fontSize:24,
  color:"#1A1A1A",
},


stepText:{
  color:"#8A8579",
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
  borderColor: "#ddd",
  borderRadius: 10,
  marginRight: 10,
},

selectedUnit: {
  backgroundColor: "#cebc4716",
  borderColor: "#afa24c",
},
});