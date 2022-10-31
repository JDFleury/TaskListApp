import React, { useContext } from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import styled from 'styled-components';
import { SafeArea } from '../../components/safeArea/safeArea.component';
import { UserContext } from '../../services/userContext/user.context';

const TestText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.h2};
`;

// eslint-disable-next-line react/prop-types
export const LoginScreen = ({ setIsLoggedIn }) => {
  const { userUid, setUserUid } = useContext(UserContext);

  return (
    <SafeArea>
      <TestText>Hello World! Login Here</TestText>
      <Button mode="contained" onPress={() => setIsLoggedIn(true)}>
        Test
      </Button>
    </SafeArea>
  );
};
