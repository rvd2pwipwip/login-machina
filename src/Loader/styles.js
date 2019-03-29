import styled, { keyframes } from "styled-components";

const flash = keyframes`
  0%   { opacity: 0.2; }
  20%  { opacity: 1;   }
  100% { opacity: 0.2; }
`;

export const Span = styled.span`
  display: inline-block;
  width: 0;

  & > span {
    animation: ${flash} 1.4s linear infinite;
    animation-fill-mode: both;
  }

  & > :nth-child(2) {
    animation-delay: 0.2s;
  }

  & > :nth-child(3) {
    animation-delay: 0.4s;
  }
`;

export default Span;
