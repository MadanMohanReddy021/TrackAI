import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

import { Ionicons } from "@expo/vector-icons";

import BASE_URL from "@/storage/ipAdress";
export default function VoiceFoodLoggerScreen() {
const finalTranscriptRef = useRef("");
const transcriptRef = useRef("");
  const [isListening, setIsListening] = useState(false);

  const [transcript, setTranscript] = useState("");

  const [loading, setLoading] = useState(false);

    



  useEffect(() => {


    async function setup(){

      const permission =
        await ExpoSpeechRecognitionModule.requestPermissionsAsync();


      console.log(
        "Speech permission",
        permission
      );

    }


    setup();


  }, []);




  /*
    Live speech updates
  */

useSpeechRecognitionEvent(
  "result",
  (event) => {

    const result =
      event.results?.[0];


    if (!result) return;


    const text =
      result.transcript;


    if (text) {

      if (result.isFinal) {

        // Save confirmed speech
        finalTranscriptRef.current =
          `${finalTranscriptRef.current} ${text}`.trim();


        setTranscript(
          finalTranscriptRef.current
        );


      } else {

        // Show live temporary speech
        setTranscript(
          `${finalTranscriptRef.current} ${text}`.trim()
        );

      }

    }

  }
);




  useSpeechRecognitionEvent(
    "end",
    ()=>{

      setIsListening(false);


      if(transcript){

        sendToBackend(transcript);

      }

    }
  );


useSpeechRecognitionEvent(
  "error",
  (event) => {

    console.log(
      "Speech recognition error:",
      event
    );

    setIsListening(false);

  }
);

 const startListening = async()=>{

  finalTranscriptRef.current = "";

  setTranscript("");

  await ExpoSpeechRecognitionModule.start({
    lang:"en-US",
    interimResults:true,
    continuous:true,
  });

  setIsListening(true);

};




  const stopListening = async()=>{


    await ExpoSpeechRecognitionModule.stop();


    setIsListening(false);


  };




  const sendToBackend = async (text: string) => {

  try {

    setLoading(true);


    const userid = await AsyncStorage.getItem("userid");

console.log("User ID:", userid);
    if (!userid) {
      console.log("User ID not found");
      return;
    }


    const response = await axios.post(

      `${BASE_URL}/analyze-food`,

      {
        foodName: text,
        userid: userid,
      },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }

    );


    console.log(
      "Food Analysis Response:",
      response.data
    );


    router.push({
      pathname: "/foodresult",
      params: {
        image: "",
        result: JSON.stringify(response.data),
      },
    });


  }
  catch(error:any){

    console.log(
      "Backend error",
      error.response?.data || error.message
    );

  }
  finally{

    setLoading(false);

  }

};




  return (

    <View style={styles.container}>


      <View style={styles.overlay}>


        {/* Header */}


        <View style={styles.header}>


          <TouchableOpacity
            style={styles.iconButton}
          >

            <Ionicons
              name="volume-mute-outline"
              size={28}
              color="white"
            />

          </TouchableOpacity>



          <Text style={styles.title}>
            Voice Food Logger
          </Text>



          <TouchableOpacity
            style={styles.iconButton}
          >

            <Ionicons
              name="restaurant-outline"
              size={28}
              color="white"
            />

          </TouchableOpacity>


        </View>






        {/* Text Area */}


        <View style={styles.center}>


          <View style={styles.textBox}>


            <Text style={styles.textTitle}>
              Tell me what you ate
            </Text>



            <ScrollView>


              <Text style={styles.transcript}>


                {transcript ||
                "Your speech will appear here..."}


              </Text>


            </ScrollView>


          </View>




          <TouchableOpacity

            style={[
              styles.micButton,
              isListening &&
              styles.activeMic
            ]}


            onPress={
              isListening
              ?
              stopListening
              :
              startListening
            }

          >


            <Ionicons

              name={
                isListening
                ?
                "stop"
                :
                "mic"
              }

              size={50}

              color="black"

            />


          </TouchableOpacity>




          <Text style={styles.status}>


            {
              isListening
              ?
              "Listening..."
              :
              "Tap microphone to speak"
            }


          </Text>



        </View>





      </View>







      {
        loading &&

        <View style={styles.loading}>


          <ActivityIndicator

            size="large"

            color="#FF8C00"

          />


          <Text style={styles.loadingText}>
            Processing food...
          </Text>


        </View>

      }









      {/* Backend Result */}



      






    </View>

  );

}





const styles = StyleSheet.create({


container:{

 flex:1,

 backgroundColor:"#000",

},



overlay:{

 flex:1,

 backgroundColor:"rgba(0,0,0,0.55)"

},




header:{


 marginTop:60,

 paddingHorizontal:20,

 flexDirection:"row",

 justifyContent:"space-between",

 alignItems:"center"

},




title:{


 color:"white",

 fontSize:26,

 fontWeight:"700"


},



iconButton:{


 width:60,

 height:60,

 borderRadius:30,

 backgroundColor:"#333",

 justifyContent:"center",

 alignItems:"center"


},





center:{


 flex:1,

 justifyContent:"center",

 alignItems:"center",

 paddingHorizontal:20


},





textBox:{


 width:"100%",

 height:250,

 borderWidth:2,

 borderColor:"#FF8C00",

 borderRadius:25,

 padding:20,

 backgroundColor:"#111"


},



textTitle:{


 color:"#FF8C00",

 fontSize:22,

 fontWeight:"700",

 marginBottom:20


},



transcript:{


 color:"white",

 fontSize:20,

 lineHeight:30


},




micButton:{


 marginTop:50,

 width:100,

 height:100,

 borderRadius:50,

 backgroundColor:"white",

 justifyContent:"center",

 alignItems:"center"


},



activeMic:{


 backgroundColor:"#FF8C00"


},




status:{


 marginTop:20,

 color:"white",

 fontSize:18


},




loading:{


 ...StyleSheet.absoluteFill,

 backgroundColor:"rgba(0,0,0,0.7)",

 justifyContent:"center",

 alignItems:"center"


},



loadingText:{


 color:"white",

 marginTop:15,

 fontSize:18


},




modal:{


 flex:1,

 padding:25,

 backgroundColor:"white"


},



resultTitle:{


 fontSize:28,

 fontWeight:"bold",

 marginBottom:20


},




resultText:{


 fontSize:16,

 lineHeight:24


},




closeButton:{


 marginTop:30,

 backgroundColor:"#FF8C00",

 padding:15,

 borderRadius:15


},




closeText:{


 color:"white",

 textAlign:"center",

 fontSize:18,

 fontWeight:"700"


}



});