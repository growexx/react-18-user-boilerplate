import { Button } from 'antd';
import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ActionButton = styled(Button)`
  width: 200px;
`;
