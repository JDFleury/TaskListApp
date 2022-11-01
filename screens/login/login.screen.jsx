import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styled from 'styled-components';
import { SafeArea } from '../../components/safeArea/safeArea.component';
import { UserContext } from '../../services/userContext/user.context';
import { colors } from '../../theme/colors';

const LoginContainer = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.size[3]};
`;

const LoginEmailInput = styled(TextInput)`
  margin-top: ${(props) => props.theme.size[6]};
  margin-bottom: ${(props) => props.theme.size[2]};
`;
const LoginPasswordInput = styled(TextInput)``;

// eslint-disable-next-line react/prop-types
export const LoginScreen = ({ setIsLoggedIn }) => {
  const { userUid, setUserUid } = useContext(UserContext);
  const [loginEmail, setLoginEmail] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
        <LoginPasswordInput
          label={'Password'}
          mode={'outlined'}
          right={
            showPassword ? (
              <TextInput.Icon
                name={'eye'}
                onPress={() => setShowPassword(false)}
              />
            ) : (
              <TextInput.Icon
                name={'eye-off'}
                onPress={() => setShowPassword(true)}
              />
            )
          }
          secureTextEntry={!showPassword}
          value={loginPassword}
          onChangeText={(text) => setLoginPassword(text)}
          outlineColor={colors.primaryBlue}
          activeOutlineColor={colors.primaryBlue}
        />
      </LoginContainer>
    </SafeArea>
  );
};
