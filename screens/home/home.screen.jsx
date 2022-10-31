import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { SafeArea } from '../../components/safeArea/safeArea.component';

const TestText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: ${(props) => props.theme.fontSizes.h4};
`;

export const HomeScreen = () => {
  return (
    <SafeArea>
      <TestText>Home Screen Here</TestText>
    </SafeArea>
  );
};
