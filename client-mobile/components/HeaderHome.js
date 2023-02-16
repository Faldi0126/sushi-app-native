import { LinearGradient } from 'expo-linear-gradient';
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
} from 'react-native';

import { styled } from 'nativewind';

function HeaderHome() {
  const StyledText = styled(Text);

  return (
    <LinearGradient
      colors={['rgba(229,212,128,1)', 'rgba(252,163,17,1)']}
      className="flex h-44 rounded-br-[80px] -z-10 shadow-2xl shadow-yellow-500"
    >
      <StyledText className="flex flex-row text-4xl font-bold text-center text-[#FFFFFF] z-10 m-auto ">
        Welcome
      </StyledText>
    </LinearGradient>
  );
}

export default HeaderHome;
