import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      img: [],
      fileList: [],
      path: '',
      check: false,
    };
  }

  _on_selectImg_camera = image => {
    let newDataImg = this.state.fileList;
    const source = {uri: image.path};
    let item = {
      id: Date.now(),
      url: source,
      content: image.data,
    };

    newDataImg.push(item);
    this.setState({
      fileList: newDataImg,
      path: item.content,
    });

    this.state.img.push(item.url);
    console.log(this.state.img);
  };

  _take_img_camera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.7,
      includeBase64: true,
      cropping: true,
    }).then(image => {
      this._on_selectImg_camera(image);
    });
  };

  _take_img_gallery = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.7,
      includeBase64: true,
      cropping: true,
      multiple: true,
    }).then(image => {
      this._on_selectImg(image);
    });
  };

  _On_addImg = () => {
    this.ActionSheet.show();
  };

  _on_selectImg = image => {
    for (var i = 0; i < image.length; i++) {
      this.state.img.push({uri: image[i].path});
    }

    // console.log(`${JSON.stringify(this.state.img[0].uri)}`);
    // alert( JSON.stringify( this.state.img[0].uri ))
    if (this.state.img) {
      //   AsyncStorage.setItem('IMG', JSON.stringify(this.state.img[0].uri));
      this.setState({
        check: true,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Image Editor : </Text>
          <Text style={styles.desc}>
            You can choose your photos from the gallery or take pictures by
            opening the camera, then you can edit them and create your own
            gallery.{' '}
          </Text>

          <Image
            source={require('../../assets/images/img1.jpg')}
            style={styles.img}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={() => this._On_addImg()}>
            <Text style={styles.txtBtn}>Select your images</Text>
          </TouchableOpacity>

          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            options={['Open Camera', 'Choose from Gallery', 'Cancel']}
            cancelButtonIndex={2}
            destructiveButtonIndex={2}
            onPress={index => {
              if (index == 0) {
                this._take_img_camera();
              }
              if (index == 1) {
                this._take_img_gallery();
              }
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Home;
