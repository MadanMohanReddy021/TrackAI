import { StyleSheet } from "react-native";


export const createStyles=(colors:any)=>

StyleSheet.create({

container:{
flex:1,
backgroundColor:colors.background,
paddingHorizontal:20,
},


loader:{
flex:1,
justifyContent:"center",
alignItems:"center",
backgroundColor:colors.background,
},


header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginTop:55,
marginBottom:25,
},


headerTitle:{
fontSize:22,
fontWeight:"700",
color:colors.text,
},


card:{
backgroundColor:colors.card,
borderRadius:18,
padding:20,
elevation:3,
},


cardTitle:{
fontSize:18,
fontWeight:"700",
color:colors.text,
marginBottom:15,
},


input:{
borderWidth:1,
borderColor:colors.border,
borderRadius:12,
padding:14,
fontSize:18,
color:colors.text,
backgroundColor:colors.card,
marginTop:15,
},


button:{
backgroundColor:colors.button,
marginTop:18,
borderRadius:12,
paddingVertical:15,
alignItems:"center",
},


buttonText:{
color:colors.buttonText,
fontSize:16,
fontWeight:"700",
},


note:{
textAlign:"center",
color:colors.secondaryText,
marginTop:15,
fontSize:14,
},


});