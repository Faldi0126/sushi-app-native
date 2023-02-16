import { GET_FOODS } from '../query/queryFood';

import { useQuery, gql } from '@apollo/client';

export const GET_ONE_FOOD = gql`
  query GetOneFood($getOneFoodId: ID) {
    getOneFood(id: $getOneFoodId) {
      id
      name
      description
      price
      userMongoId
      categoryId
      Ingredients {
        name
      }
      Category {
        name
      }
      user {
        email
        username
      }
      imgUrl
    }
  }
`;
