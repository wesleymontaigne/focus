import React, { useCallback } from "react";
import { Dimensions, SafeAreaView} from 'react-native';
import Swal from 'sweetalert2';
import disableBrowserBackButton from 'disable-browser-back-navigation';
import YoutubePlayer from "react-native-youtube-iframe";


function youtube({ navigation,route }) {
 
  disableBrowserBackButton();
  const [youtubeId, setYoutubeID] = React.useState(route.params.id);
  const windowHeight = Dimensions.get('window').height;
  const WindowWidth =Dimensions.get('window').width

  const [playing, setPlaying] = React.useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);


  

 
  return (
  <SafeAreaView style={{flex:1,backgroundColor:'dodgerblue',alignItems:'center'}}>

  <YoutubePlayer
  width={WindowWidth}
  height={windowHeight}
  play={playing}
  videoId={youtubeId}
  onChangeState={onStateChange}
  />
  </SafeAreaView>
);
}

export default youtube;