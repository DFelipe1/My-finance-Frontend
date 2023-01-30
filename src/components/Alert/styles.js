import styled, { keyframes } from 'styled-components'

export const Body = styled.div`
    position: fixed;
    top: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const Content = styled.div`
    width: 500px;
    position: relative;
    overflow: hidden;
`;

const timer = keyframes`
  from {
    width: 100%;
  }

  to {
    width: 0;
  }
`;

export const Animation = styled.div`
    height: 2px;
    background-color: rgba(255, 255, 255, 0.5);
    position absolute;
    bottom: 0;
    right: 0;
    animation: ${timer} 3s linear;
`;

