import Colors from '../../utils/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    paddingTop: Platform.OS == 'ios' ? hp('10%') : null,
    backgroundColor: Colors.black,
  },

  title: {
    color: Colors.orange,
    fontWeight: 'bold',
    fontSize: 20,
  },
  desc: {
    color: Colors.white,
    fontSize: 16,
    margin: 10,
    lineHeight: 25,
  },
  btn: {
    backgroundColor: Colors.orange,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('60%'),
    height: hp('6%'),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: hp('10%'),
  },
  txtBtn: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: 'bold',
  },
  cancel: {
    fontSize: 16,
    color: Colors.red,
    fontWeight: 'bold',
  },
  img: {
    width: wp('100%'),
    height: hp('25%'),
    borderRadius: 5,
    marginTop: hp('5%'),
  },
  editImg: {
    width: wp('90%'),
    height: hp('40%'),
    borderRadius: 5,
    marginTop: hp('5%'),
  },
});

export default styles;
