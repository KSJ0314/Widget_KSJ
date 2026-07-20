import styled from 'styled-components';
import { lineColor } from '../../utils/styleUtils';

/**
 * 모달은 위젯 크기와 무관하게 고정 px를 쓴다.
 * 위젯을 작게 임베드하면 화면을 거의 덮지만, 그래야 입력이 가능하다.
 * 크기를 조정할 때는 S만 바꾸면 전체 비율이 유지된다.
 */
const S = 1.3;
const px = (n: number) => `${n * S}px`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: rgba(0, 0, 0, 0.4);
`;

export const Box = styled.div`
  width: 100%;
  max-width: ${px(260)};
  box-sizing: border-box;
  padding: ${px(16)};
  border-radius: ${px(6)};
  border: 1px solid ${lineColor};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.25);
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${px(14)};
`;

export const Title = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(13)};
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: ${px(16)};
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.55;

  &:hover {
    opacity: 1;
  }
`;

export const Field = styled.label`
  display: block;
  margin-bottom: ${px(12)};
`;

export const FieldLabel = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(11)};
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textDim};
  margin-bottom: ${px(5)};
`;

export const TextInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(13)};
  padding: ${px(7)} ${px(9)};
  border-radius: ${px(4)};
  border: 1px solid ${lineColor};
  background: none;
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

/** 날짜·시간처럼 눌러서 피커를 여는 자리 */
export const PickerButton = styled.button<{ $disabled?: boolean }>`
  width: 100%;
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(13)};
  padding: ${px(7)} ${px(9)};
  border-radius: ${px(4)};
  border: 1px solid ${lineColor};
  background: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const ErrorText = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(11)};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.accent};
  margin-top: ${px(10)};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${px(6)};
  margin-top: ${px(16)};
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const Button = styled.button<{ $variant?: 'primary' | 'danger' }>`
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(11)};
  letter-spacing: 0.06em;
  padding: ${px(7)} ${px(12)};
  border-radius: ${px(4)};
  transition: opacity 0.15s;

  ${({ theme, $variant }) => {
    if ($variant === 'primary') {
      return `
        border: 1px solid ${theme.colors.primary};
        background: ${theme.colors.primary};
        color: ${theme.colors.background};
      `;
    }
    if ($variant === 'danger') {
      return `
        border: 1px solid ${theme.colors.accent};
        background: none;
        color: ${theme.colors.accent};
      `;
    }
    return `
      border: 1px solid ${lineColor({ theme })};
      background: none;
      color: ${theme.colors.textDim};
    `;
  }}

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: default;
    opacity: 0.35;
  }
`;
