import { StyleSheet } from "react-native";


export default StyleSheet.create({



container:{

flex:1,

backgroundColor:"#FAF7F1",

paddingHorizontal:20,

},





loader:{

flex:1,

justifyContent:"center",

alignItems:"center",

backgroundColor:"#FAF7F1",

},



loadingText:{

marginTop:10,

color:"#8A8579",

},





header:{

marginTop:50,

marginBottom:25,

},



dayText:{

fontSize:14,

color:"#8A8579",

marginBottom:5,

},



title:{

fontSize:30,

fontWeight:"500",

color:"#1A1A1A",

},



goldText:{

color:"#C9A24B",

},







card:{

backgroundColor:"#FFFFFF",

borderRadius:20,

padding:20,

marginBottom:15,

borderWidth:1,

borderColor:"#ECE6D8",

},





cardTitle:{

fontSize:16,

fontWeight:"600",

color:"#1A1A1A",

marginBottom:10,

},



bigNumber:{

fontSize:28,

fontWeight:"700",

color:"#1A1A1A",

},



smallText:{

fontSize:14,

fontWeight:"400",

color:"#8A8579",

},



leftText:{

marginTop:8,

fontSize:13,

color:"#8A8579",

},





progressBackground:{

height:8,

backgroundColor:"#ECE6D8",

borderRadius:20,

overflow:"hidden",

marginTop:15,

},



progressFill:{

height:"100%",

backgroundColor:"#C9A24B",

borderRadius:20,

},





macroContainer:{

flexDirection:"row",

justifyContent:"space-between",

gap:10,

marginBottom:15,

},





macroCard:{

flex:1,

backgroundColor:"#FFFFFF",

borderRadius:18,

padding:15,

borderWidth:1,

borderColor:"#ECE6D8",

},



macroTitle:{

fontSize:13,

color:"#8A8579",

marginBottom:8,

},



macroValue:{

fontSize:18,

fontWeight:"700",

color:"#1A1A1A",

},






smallButton:{

marginTop:15,

backgroundColor:"#C9A24B",

height:40,

borderRadius:15,

alignItems:"center",

justifyContent:"center",

},



buttonText:{

color:"#FFFFFF",

fontWeight:"600",

},





sectionHeader:{

marginTop:10,

marginBottom:10,

},



sectionTitle:{

fontSize:22,

fontWeight:"600",

color:"#1A1A1A",

},





emptyCard:{

backgroundColor:"#FFFFFF",

padding:30,

borderRadius:20,

alignItems:"center",

borderWidth:1,

borderColor:"#ECE6D8",

},



emptyText:{

color:"#8A8579",

},





foodCard:{

backgroundColor:"#FFFFFF",

borderRadius:18,

padding:12,

marginBottom:10,

flexDirection:"row",

alignItems:"center",

borderWidth:1,

borderColor:"#ECE6D8",

},




foodImage:{

width:55,

height:55,

borderRadius:15,

backgroundColor:"#FAF7F1",

alignItems:"center",

justifyContent:"center",

marginRight:12,

},




foodInfo:{

flex:1,

},



foodName:{

fontSize:15,

fontWeight:"600",

color:"#1A1A1A",

},



foodSub:{

fontSize:12,

color:"#8A8579",

marginTop:3,

},



foodCalories:{

fontSize:16,

fontWeight:"700",

color:"#1A1A1A",

},






addButton:{

position:"absolute",

right:25,

bottom:30,

width:65,

height:65,

borderRadius:35,

backgroundColor:"#1A1A1A",

justifyContent:"center",

alignItems:"center",

elevation:8,

},



addText:{

fontSize:35,

color:"#FFFFFF",

fontWeight:"300",

},
fabContainer: {
  position: "absolute",
  right: 20,
  bottom: 2, // Adjust based on your bottom navigation
  alignItems: "center",
},

fabButton: {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: "#C9A24B",
  justifyContent: "center",
  alignItems: "center",
  elevation: 6,

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
},


});