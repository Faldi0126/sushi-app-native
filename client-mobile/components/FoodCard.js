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

function FoodCard({ food, navigation }) {
  const StyledText = styled(Text);
  const StyledView = styled(View);
  const StyledImage = styled(Image);
  const StyledTouch = styled(TouchableOpacity);

  return (
    <StyledTouch
      onPress={() => navigation.navigate('Detail', { id: `${food.id}` })}
      className="flex flex-row bg-white rounded-lg shadow-2xl shadow-black/90 mb-4 p-1 w-5/6 self-center"
    >
      <StyledImage
        className="flex w-20 h-20 rounded-full self-center align-middle mx-3"
        source={{
          uri: `${food.imgUrl}`,
        }}
      />
      <StyledView className="flex flex-col rounded-xl text-left m-4 w-3/6">
        <StyledText className="font-semibold text-lg text-[#1D3557] mb-5">
          {food.name}
        </StyledText>
        <StyledText className="font-semibold text-l text-[#1D3557]">
          {food.Category.name}
        </StyledText>
      </StyledView>
    </StyledTouch>
  );
}

export default FoodCard;
