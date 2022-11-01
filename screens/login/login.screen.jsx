import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styled from 'styled-components';
import { SafeArea } from '../../components/safeArea/safeArea.component';
import { UserContext } from '../../services/userContext/user.context';
import { colors } from '../../theme/colors';

const LoginContainer = styled(View)`
  flex: 1;
  justify-content: center;
  padding: ${(props) => props.theme.size[3]};
`;

const LoginEmailInput = styled(TextInput)``;

// eslint-disable-next-line react/prop-types
export const LoginScreen = ({ setIsLoggedIn }) => {
  const { userUid, setUserUid } = useContext(UserContext);
  const [loginEmail, setLoginEmail] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [loingPassword, setLoginPassword] = useState('');

  const onLoginEmailChange = (email) => {
    if (
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailInvalid(false);
    } else {
      setEmailInvalid(true);
    }
    setLoginEmail(email);
  };

  return (
    <SafeArea>
      <LoginContainer>
        <LoginEmailInput
          label={'Email'}
          mode={'outlined'}
          value={loginEmail}
          onChangeText={(text) => onLoginEmailChange(text)}
          outlineColor={colors.primaryBlue}
          activeOutlineColor={colors.primaryBlue}
          error={emailInvalid}
        />
      </LoginContainer>
    </SafeArea>
  );
};
