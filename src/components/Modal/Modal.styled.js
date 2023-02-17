import styled from 'styled-components';

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
  overflow-y: scroll;
`;

export const ModalStyled = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

export const CloseBtn = styled.button`
  padding: 8px 16px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  border-radius: 5px;
  background-color: transparent;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: #a6f7c3;
  border: 2px solid #a6f7c3;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  min-width: 150px;
  :hover,
  :focus {
    scale: 1.02;
  }
`;

export const Image = styled.img`
  max-height: 90vh;
`;
