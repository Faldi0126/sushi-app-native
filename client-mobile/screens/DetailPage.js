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
import { useState, useEffect } from 'react';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { GET_ONE_FOOD } from '../query/queryDetail';

import { useQuery, gql } from '@apollo/client';

import HeaderDetail from '../components/HeaderDetail';

function DetailPage({ navigation, route }) {
  const { id } = route.params;
  const StyledText = styled(Text);
  const StyledView = styled(View);
  const StyledImage = styled(Image);
  const StyledTouch = styled(TouchableOpacity);

  const { data, loading, error } = useQuery(GET_ONE_FOOD, {
    variables: {
      getOneFoodId: id,
    },
  });

  if (loading) {
    return (
      <StyledView className="flex flex-col justify-center items-center h-full">
        <ActivityIndicator
          size="large"
          color="#FCA311"
          className="text-2xl font-bold text-center text-[#525252] p-5"
        />
      </StyledView>
    );
  }

  return (
    <ScrollView>
      <HeaderDetail />

      <StyledView className="flex h-48 p-4">
        <StyledImage
          className="flex rounded-xl  mx-2 h-full bg-transparent shadow-2xl shadow-black/70"
          source={{
            uri: `${data.getOneFood.imgUrl}`,
          }}
        />
      </StyledView>

      {/* Detail goes here */}

      <StyledText className="font-bold text-[#2A2828] text-2xl py-2 px-8 text-left mb-4">
        {data.getOneFood.name}
      </StyledText>

      <StyledView className="flex flex-row w-full px-8 justify-between">
        <StyledText className="text-end font-semibold text-[#343232]	">
          Uploaded By
        </StyledText>
        <StyledText className=" text-[#676665]">
          {data.getOneFood.user.username}
        </StyledText>
      </StyledView>
      <Text className="w-full text-center text-slate-300 mb-[5px]">
        ───────────────────────────────
      </Text>

      <StyledView className="flex flex-row w-full px-8 justify-between">
        <StyledText className="text-end font-semibold	 text-[#343232]">
          Category
        </StyledText>
        {/* Test */}
        <StyledText className=" text-[#676665]">
          {data.getOneFood.Category.name}
        </StyledText>
      </StyledView>
      <Text className="w-full text-center text-slate-300 mb-[5px]">
        ───────────────────────────────
      </Text>

      <StyledView className="flex flex-row w-full px-8 justify-between">
        <StyledText className="text-end font-semibold	 text-[#343232]">
          Price
        </StyledText>
        {/* Test */}
        <StyledText className=" text-[#676665]">
          {data.getOneFood.price.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })}
        </StyledText>
      </StyledView>
      <Text className="w-full text-center text-slate-300 mb-1">
        ───────────────────────────────
      </Text>

      {/* Description */}
      <StyledView className="flex flex-row w-full my-2 px-8 justify-between">
        <StyledText className="text-justify text-[#676665]">
          {data.getOneFood.description}
        </StyledText>
      </StyledView>

      <StyledView className="flex flex-row w-full my-2 px-8 justify-between">
        <StyledText className="text-justify text-[#676665]">
          <StyledText className="text-end font-semibold	 text-[#343232]">
            Ingredients:{' '}
          </StyledText>
          {data.getOneFood.Ingredients.map(ing => ing.name).join(', ')}
        </StyledText>
      </StyledView>

      {/* Bottom button */}
      <StyledTouch
        className="flex static bottom-6 self-center w-1/2 my-10"
        onPress={() => navigation.navigate('Home')}
      >
        <StyledText className="font-bold text-[#ffff]  bg-[#FCA311] rounded-xl p-4 text-center shadow-2xl shadow-yellow-600">
          Go Back
        </StyledText>
      </StyledTouch>
    </ScrollView>
  );
}

export default DetailPage;
