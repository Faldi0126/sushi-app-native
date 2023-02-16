import {
  TextInput,
  Button,
  TouchableOpacity,
  Typography,
  Card,
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';

import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';

function HeaderDetail() {
  const StyledText = styled(Text);
  const StyledView = styled(View);
  const StyledImage = styled(Image);
  const StyledTouch = styled(TouchableOpacity);

  const navigation = useNavigation();

  return (
    <StyledTouch className="flex">
      {/* Headers */}
      <LinearGradient
        colors={['rgba(229,212,128,1)', 'rgba(252,163,17,1)']}
        className="flex p-3 rounded-br-[80px] -z-10 shadow-2xl shadow-yellow-900"
      >
        <StyledText className="flex flex-row text-2xl font-bold text-center text-[#FFFFFF] mt-[50px]">
          Detail Page
        </StyledText>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginHorizontal: 10,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </StyledTouch>
  );
}

export default HeaderDetail;
