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

import FoodCard from '../components/FoodCard';
import { useState, useEffect } from 'react';
import { styled } from 'nativewind';

import HeaderHome from '../components/HeaderHome';

import { GET_FOODS } from '../query/queryFood';

import { useQuery, gql } from '@apollo/client';

export const HomePage = ({ navigation }) => {
  const StyledText = styled(Text);
  const StyledView = styled(View);
  const StyledImage = styled(Image);
  const StyledTouch = styled(TouchableOpacity);

  const { loading, error, data } = useQuery(GET_FOODS);

  const [search, setSearch] = useState('');

  if (loading) {
    return (
      <StyledView className="flex flex-col bg-[#F5F5F5] min-h-full justify-content-center content-center">
        <StyledText className="flex flex-row text-4xl font-bold text-center text-[#FFFFFF] z-10 m-auto ">
          Loading...
        </StyledText>
      </StyledView>
    );
  }

  return (
    <ScrollView className="flex flex-col bg-[#F5F5F5] min-h-full justify-content-center content-center">
      {/* <LinearGradient
        // Button Linear Gradient
        colors={['rgba(229,212,128,1)', 'rgba(252,163,17,1)']}
        className="flex h-44 rounded-br-[80px] -z-10 shadow-2xl shadow-yellow-500"
      >
        <StyledText className="flex flex-row text-4xl font-bold text-center text-[#FFFFFF] z-10 m-auto ">
          Welcome
        </StyledText>
      </LinearGradient> */}

      <HeaderHome />

      <StyledView className="flex flex-col justify-center items-center my-5">
        <TextInput
          className="flex bg-white rounded-xl w-72 text-center shadow-2xl shadow-yellow-500 p-3 my-4"
          onEndEditing={
            (onChangeNumber = e => setSearch(e.nativeEvent.text.toLowerCase()))
          }
          defaultValue={search}
          placeholder="Search a Food"
        />
      </StyledView>

      {data.getFood
        .filter(name => {
          return name.name.toLowerCase() === ''
            ? name
            : name.name.toLowerCase().includes(search.toLowerCase());
        })
        .map(food => {
          return (
            <FoodCard
              key={food.id}
              food={food}
              navigation={navigation}
              className="flex flex-row justify-center content-center gap-y-5 w-full h-auto"
            />
          );
        })}
    </ScrollView>
  );
};
