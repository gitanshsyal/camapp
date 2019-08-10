/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,Image,Button,
  StatusBar,TextInput,Dimensions,TouchableHighlight,TouchableOpacity,Alert
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';


export default class App extends Component{

  constructor() {
    super();
    this.state = {
      image: null,
      images: null
    };
  }
  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
    
      includeExif: true,
      forceJpg: true,
    }).then(images => {
      this.setState({
        image: null,
        images: images.map(i => {
        
          return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
        })
      });
    }).catch();
  }
  pickSingleWithCamera(cropping, mediaType='photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    }).then(image => {
    
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch();
  }
 

  cropLast() {
    if (!this.state.image) {
      return Alert.alert('No image', 'Before open cropping only, please select image');
    }

    ImagePicker.openCropper({
      path: this.state.image.uri,
      width: 200,
      height: 200
    }).then(image => {
      console.log('received cropped image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch(e => {
     
    });
  }
  
  
  pickSingle(cropit, circular=false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      freeStyleCropEnabled:true,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
    
      includeExif: true,
    }).then(image => {
     
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch(e => {
      
    });
  }
  
 
  
  renderImage(image) {
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
  }
  
  render () {
    

    return (
      <ScrollView>
      <View style={styles.container}>
     {this.state.image ? this.renderImage(this.state.image) : null}
     {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderImage(i)}</View>) : null}
      <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.button}>
        <Text style={styles.text}>Select Single Image With Camera</Text>
      </TouchableOpacity>
     
      <TouchableOpacity onPress={() => this.pickSingle(true,true)} style={styles.button}>
        <Text style={styles.text}>Select Single</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
        <Text style={styles.text}>Select Multiple</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.cropLast()} style={styles.button}>
        <Text style={styles.text}>Crop Last Selected Image</Text>
      </TouchableOpacity>
     
 </View>
 
 </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
     alignItems:"center"
  },
  textStyle: {
     fontWeight:"bold",
     fontSize:30,
     textAlign:"center",
     color:"red",
     marginTop:10
  },
  placeholder: {
     borderWidth: 1,
     borderColor: "black",
     backgroundColor: "#eee",
     width: "70%",
     height: 280,
     marginTop:50,
  },
  button: {
    width: "80%",
    marginTop:20,
    flexDirection:"row",
    justifyContent: "space-around"
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});
