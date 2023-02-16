import { useQuery, gql } from '@apollo/client';

export const GET_FOODS = gql`
  query GetFood {
    getFood {
      id
      name
      description
      price
      imgUrl
      userMongoId
      categoryId
      Ingredients {
        name
      }
      Category {
        name
      }
      user {
        username
        email
      }
    }
  }
`;
