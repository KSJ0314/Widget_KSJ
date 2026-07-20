import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background};
  padding: 48px 40px 64px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`;

export const Header = styled.header`
  margin-bottom: 48px;
  animation: ${fadeIn} 0.5s ease;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
`;

/** 로고 + 소개글 묶음 */
export const HeaderInfo = styled.div``;

export const LoginButton = styled.button`
  flex-shrink: 0;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 11px;
  letter-spacing: 0.1em;
  padding: 8px 14px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: none;
  color: ${({ theme }) => theme.colors.primary};
  transition: border-color 0.15s, color 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ProfileButton = styled.button`
  flex-shrink: 0;
  cursor: pointer;
  padding: 0;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: border-color 0.15s;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
`;

export const ModalBox = styled.div`
  min-width: 260px;
  padding: 24px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

export const ModalText = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const ModalButton = styled.button<{ $primary?: boolean }>`
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 11px;
  letter-spacing: 0.08em;
  padding: 8px 14px;
  border-radius: 4px;
  transition: opacity 0.15s;

  ${({ theme, $primary }) =>
    $primary
      ? `
        border: 1px solid ${theme.colors.primary};
        background: ${theme.colors.primary};
        color: ${theme.colors.background};
      `
      : `
        border: 1px solid ${theme.colors.border};
        background: none;
        color: ${theme.colors.textDim};
      `}

  &:hover {
    opacity: 0.8;
  }
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 28px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.1em;
  text-shadow:
    0 0 12px ${({ theme }) => theme.colors.primary},
    0 0 24px ${({ theme }) => theme.colors.primaryGlow};
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 11px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textDim};
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export const CategorySection = styled.section`
  margin-bottom: 64px;
  animation: ${fadeIn} 0.5s ease;
`;

export const CategoryHeader = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.25em;
  text-transform: uppercase;
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.primaryGlow};
  margin-bottom: 28px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const WidgetSection = styled.div`
  margin-bottom: 36px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 16px;
`;

export const SectionName = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const SectionCategory = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 9px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.secondary};
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: 2px 8px;
  border-radius: 20px;
  opacity: 0.8;
`;

export const WidgetDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textDim};
  letter-spacing: 0.05em;
  line-height: 1.6;
  margin-bottom: 14px;
  /* 설명에 넣은 줄바꿈(\n)을 그대로 살린다 */
  white-space: pre-line;
`;

/** 고유키를 못 가져왔을 때처럼, 그냥 두면 잘못된 URL이 복사되는 상황을 알린다 */
export const WidgetWarning = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 12px;
  line-height: 1.6;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.accent};
  padding: 8px 12px;
  margin-bottom: 14px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
`;

export const FontRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
`;

export const FontLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 9px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textDim};
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;

export const FontChip = styled.button<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 20px;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
  background: ${({ $active, theme }) => ($active ? theme.colors.primaryGlow : 'transparent')};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textDim)};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ThemeRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const ThemeCard = styled.div`
  width: 220px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.primaryGlow};
  }
`;

export const PreviewArea = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
`;

export const PreviewScaler = styled.div`
  width: 400px;
  height: 225px;
  transform: scale(0.55);
  transform-origin: top left;
  pointer-events: none;
`;

export const ThemeBadge = styled.div<{ $color: string }>`
  padding: 8px 12px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ $color }) => $color};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CopyButton = styled.button<{ $copied: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  color: ${({ $copied, theme }) => $copied ? theme.colors.secondary : theme.colors.text};
  opacity: ${({ $copied }) => $copied ? 1 : 0.6};
  transition: opacity 0.2s, color 0.2s;
  flex-shrink: 0;

  &:hover {
    opacity: 1;
  }
`;
