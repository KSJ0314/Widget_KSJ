import styled from 'styled-components';
import { lineColor } from '@/theme/colorUtils';

const S = 1.3;
const px = (n: number) => `${n * S}px`;

export const ToggleBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-top: ${px(8)};
  display: flex;
  align-items: center;
  gap: ${px(4)};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(11)};
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px(8)};
  margin-top: ${px(8)};
  padding-top: ${px(10)};
  border-top: 1px solid ${lineColor};
`;

export const Row = styled.label`
  display: flex;
  align-items: center;
  gap: ${px(8)};
`;

export const Label = styled.span`
  flex-shrink: 0;
  width: ${px(28)};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${px(10)};
  color: ${({ theme }) => theme.colors.textDim};
`;

/**
 * 트랙에 그 슬라이더가 만드는 색을 깔아 눈으로 고르게 한다.
 * 브라우저마다 트랙·손잡이 선택자가 달라 양쪽을 모두 적는다.
 */
export const Slider = styled.input<{ $track: string }>`
  flex: 1;
  min-width: 0;
  height: ${px(12)};
  margin: 0;
  cursor: pointer;
  appearance: none;
  border-radius: 999px;
  border: 1px solid ${lineColor};
  background-image: ${({ $track }) => $track};
  /* 투명한 색이 비쳐 보이도록 격자 대신 배경색을 깐다 */
  background-color: ${({ theme }) => theme.colors.background};

  &::-webkit-slider-thumb {
    appearance: none;
    width: ${px(11)};
    height: ${px(11)};
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.background};
    border: 2px solid ${({ theme }) => theme.colors.text};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  &::-moz-range-thumb {
    width: ${px(11)};
    height: ${px(11)};
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.background};
    border: 2px solid ${({ theme }) => theme.colors.text};
  }
`;
