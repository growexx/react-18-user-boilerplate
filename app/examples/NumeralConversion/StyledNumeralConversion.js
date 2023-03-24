import styled from 'styled-components';

export const StyledHeader = styled.p`
  text-align: center;
  font-weight: @font-weight-bold;
  color: @primary-color;
`;

export const StyledInput = styled.div`
  margin: 31px 18px;
  @media screen and (max-width: 400px) {
    margin: 31px -15px;
  }
`;

export const StyledTableContainer = styled.div`
  margin: 31px 18px;
  display: flex;
  flex-direction: column;
  padding: @padding-xs;
  border: 1px solid @border-color-base;
  p:first-child {
    font-weight: @font-weight-bold;
    margin-top: @margin-xs;
    font-size: 22px;
  }
  p:nth-child(2) {
    font-weight: @font-weight-medium;
    color: @heading-color;
  }
  @media screen and (max-width: 400px) {
    margin: 31px -15px;
  }
`;

export const StyledFormatHeader = styled.div`
  margin: 31px 18px;
  display: flex;
  flex-direction: column;
  padding: @padding-xs;
  p:first-child {
    font-weight: @font-weight-bold;
    margin-top: @margin-xs;
    font-size: 22px;
  }
  p:nth-child(2) {
    margin-top: 0px;
    font-weight: @font-weight-medium;
    color: @heading-color;
  }
  @media screen and (max-width: 400px) {
    margin: 31px -15px;
  }
`;
