/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import AsyncStorage from '@react-native-community/async-storage';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Title, Description, TxtBtn, TxtBtnEdit} from '../../utils/constance';
import {PESDK} from 'react-native-photoeditorsdk';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      img: [],
      editedImg: '',
      path: '',
      check: false,
      selectedImg: [],
    };
  }

  async componentDidMount() {
    let images = await AsyncStorage.getItem('IMG');
    if (images != null) {
      this.setState({
        selectedImg: images,
        check: true,
      });
    }
  }

  _on_selectImg = async image => {
    this.state.img.push(image.path);
    AsyncStorage.setItem('IMG', image.path);
    this.setState({
      selectedImg: image.path,
    });
  };

  _editPhoto = imageUri => {
    PESDK.openEditor({uri: imageUri}).then(res => {
      console.log(res);
      AsyncStorage.setItem('IMG', res.image);
      this.setState({
        selectedImg: res.image,
        editedImg: res.image,
      });
    });
  };

  _take_img_camera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.7,
      includeBase64: true,
      cropping: true,
    }).then(image => {
      this._on_selectImg(image);
    });
  };

  _take_img_gallery = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.7,
      includeBase64: true,
      cropping: true,
    }).then(image => {
      this._on_selectImg(image);
    });
  };

  _On_addImg = () => {
    this.ActionSheet.show();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{Title}</Text>
          <Text style={styles.desc}>{Description}</Text>

          <Image
            source={require('../../assets/images/home.jpg')}
            style={styles.img}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={() => this._On_addImg()}>
            <Text style={styles.txtBtn}>{TxtBtn}</Text>
          </TouchableOpacity>

          {this.state.selectedImg != '' ? (
            <TouchableOpacity
              style={[styles.btn, {marginBottom: hp('2%')}]}
              onPress={() => this._editPhoto(this.state.selectedImg)}>
              <Text style={styles.txtBtn}>{TxtBtnEdit}</Text>
            </TouchableOpacity>
          ) : null}

          <Image
            resizeMode="center"
            source={
              this.state.selectedImg == ''
                ? {uri: ''}
                : {uri: this.state.selectedImg.toString()}
            }
            style={{
              height: this.state.selectedImg == '' ? 0 : 300,
              width: this.state.selectedImg == '' ? 0 : '100%',
            }}
          />

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
