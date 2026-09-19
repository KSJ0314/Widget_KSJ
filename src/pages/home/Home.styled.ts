import styled, { css, keyframes } from 'styled-components';
import { withAlpha } from '@/theme/colorUtils';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/** 접힌 사이드바 폭. 미리보기 영역은 항상 이만큼만 비켜 선다 */
export const RAIL_WIDTH = 56;
export const SIDEBAR_WIDTH = 272;

/** 미리보기 비율. 기존 카드 미리보기와 같은 값을 쓴다 */
export const LANDSCAPE_RATIO = 16 / 9;
export const PORTRAIT_RATIO = 170 / 215;

const scrollbar = css`
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

export const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
`;

/* ---------- 사이드바 ---------- */

/** 펼쳐져도 미리보기를 밀어내지 않고 그 위로 겹친다 */
export const Sidebar = styled.aside<{ $expanded: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  width: ${({ $expanded }) => ($expanded ? SIDEBAR_WIDTH : RAIL_WIDTH)}px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ $expanded }) => ($expanded ? '8px 0 32px rgba(0, 0, 0, 0.3)' : 'none')};
  transition: width 0.18s ease, box-shadow 0.18s ease;
`;

/** 폭이 바뀌는 동안 내용이 줄바꿈되며 흔들리지 않게 안쪽 폭은 고정한다 */
export const SidebarInner = styled.div<{ $expanded: boolean }>`
  width: ${({ $expanded }) => ($expanded ? SIDEBAR_WIDTH : RAIL_WIDTH)}px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const SidebarSection = styled.div<{ $expanded: boolean }>`
  padding: ${({ $expanded }) => ($expanded ? '16px 18px' : '12px 0')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: ${({ $expanded }) => ($expanded ? 'stretch' : 'center')};
  gap: ${({ $expanded }) => ($expanded ? 12 : 6)}px;
`;

/** 로고와 로그인 사이. 내용이 길면 이 부분만 스크롤한다 */
export const SidebarBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  ${scrollbar}
`;

export const AccountSection = styled(SidebarSection)`
  border-bottom: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const LogoRow = styled.div<{ $expanded: boolean }>`
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: ${({ $expanded }) => ($expanded ? 'space-between' : 'center')};
  padding: ${({ $expanded }) => ($expanded ? '0 12px 0 18px' : '0')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 16px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.1em;
  white-space: nowrap;
  text-shadow:
    0 0 12px ${({ theme }) => theme.colors.primary},
    0 0 24px ${({ theme }) => theme.colors.primaryGlow};
`;

/** 버튼 공통: 아이콘 하나가 들어가는 정사각형 */
export const IconButton = styled.button<{ $active?: boolean }>`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  background: ${({ $active, theme }) => ($active ? withAlpha(theme.colors.primary, 0.18) : 'none')};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textDim)};
  transition: color 0.15s, border-color 0.15s, background 0.15s;

  svg {
    width: 18px;
    height: 18px;
    display: block;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/** 접힌 바의 아이콘 자리. 누를 일이 없는 구역 표시용 */
export const RailIcon = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textDim};

  svg {
    width: 18px;
    height: 18px;
    display: block;
  }
`;

export const GroupLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export const ChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const FontChip = styled.button<{
  $active: boolean;
  /** 없으면 default 칩이라 테마 폰트를 그대로 쓴다 */
  $family?: string;
  $scale: number;
}>`
  /* 칩마다 자기 폰트로 이름을 보여준다 */
  font-family: ${({ theme, $family }) => $family ?? theme.fonts.display};
  /* scale을 그대로 곱하면 칩 크기가 제각각이라 살짝만 반영한다 */
  font-size: ${({ $scale }) => 9 * Math.min($scale, 1.15)}px;
  /* 폰트마다 글자 상자 높이가 달라 세로 중앙이 어긋난다 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  height: 22px;
  box-sizing: border-box;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0 10px;
  border-radius: 20px;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
  /* primaryGlow는 글자색과 밝기가 비슷해 고른 칩의 글자가 묻힌다 */
  background: ${({ $active, theme }) =>
    $active ? withAlpha(theme.colors.primary, 0.18) : 'transparent'};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textDim)};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/** 칩 크기는 그대로 두고 글자만 위아래로 미세하게 옮긴다 */
export const FontChipLabel = styled.span<{ $offsetY: number }>`
  transform: translateY(${({ $offsetY }) => $offsetY}px);
`;

export const ThemeChip = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 22px;
  padding: 0 10px 0 7px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 20px;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
  background: ${({ $active, theme }) =>
    $active ? withAlpha(theme.colors.primary, 0.18) : 'transparent'};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textDim)};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/** 테마의 대표색 */
export const ThemeDot = styled.span<{ $color: string }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $color }) => $color};
  /* 흰 배경 테마의 옅은 색도 경계가 보이게 한다 */
  box-shadow: 0 0 0 1px rgba(128, 128, 128, 0.35);
`;

export const CategoryGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.primaryGlow};

  svg {
    width: 16px;
    height: 16px;
    display: block;
  }
`;

export const WidgetItem = styled.button<{ $active: boolean }>`
  text-align: left;
  cursor: pointer;
  padding: 7px 10px 7px 24px;
  border-radius: 4px;
  border: none;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 11px;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  letter-spacing: 0.08em;
  white-space: nowrap;
  background: ${({ $active, theme }) =>
    $active ? withAlpha(theme.colors.primary, 0.18) : 'transparent'};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  transition: background 0.15s, color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const WidgetDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textDim};
  letter-spacing: 0.03em;
  line-height: 1.6;
  /* 설명에 넣은 줄바꿈(\n)을 그대로 살린다 */
  white-space: pre-line;
`;

export const AccountRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

export const AccountEmail = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/** 접힌 바에서는 옮기기 버튼만 숨기고, 열려 있는 확인 창은 그대로 둔다 */
export const MigrateSlot = styled.div<{ $hidden: boolean }>`
  /* 자리를 차지하지 않고 버튼이 구역에 바로 놓이게 한다 */
  display: contents;

  & > button {
    display: ${({ $hidden }) => ($hidden ? 'none' : 'block')};
  }
`;

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
  font-family: ${({ theme }) => theme.fonts.display};
  color: ${({ theme }) => theme.colors.primary};
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

export const MigrateBtn = styled.button`
  flex-shrink: 0;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 11px;
  letter-spacing: 0.04em;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: none;
  color: ${({ theme }) => theme.colors.primary};
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.75;
  }

  &:disabled {
    cursor: default;
    opacity: 0.4;
  }
`;

/* ---------- 모달 ---------- */

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

/* ---------- 미리보기 영역 ---------- */

/** 사이드바 상태와 상관없이 접힌 바 폭만큼만 비켜 서므로 위치·크기가 바뀌지 않는다 */
export const Stage = styled.main`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: ${RAIL_WIDTH}px;
  display: flex;
  flex-direction: column;
  padding: 16px 32px 32px;
  gap: 16px;
`;

export const StageToolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
`;

export const CopyUrlButton = styled.button<{ $copied: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 11px;
  letter-spacing: 0.08em;
  padding: 8px 14px;
  border-radius: 4px;
  background: none;
  border: 1px solid ${({ $copied, theme }) => ($copied ? theme.colors.secondary : theme.colors.primary)};
  color: ${({ $copied, theme }) => ($copied ? theme.colors.secondary : theme.colors.primary)};
  transition: color 0.2s, border-color 0.2s, opacity 0.2s;

  svg {
    width: 13px;
    height: 13px;
    display: block;
  }

  &:hover {
    opacity: 0.8;
  }
`;

/** 미리보기가 들어갈 수 있는 남은 공간. 이 크기를 재서 미리보기 크기를 정한다 */
export const FitBox = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PreviewFrame = styled.div<{ $width: number; $height: number }>`
  position: relative;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
`;

/** 다시 불러오는 동안 깜빡임을 가린다 */
export const PreviewLoading = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 11px;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.textDim};
`;

/**
 * iframe 위로 마우스가 들어가면 홈 페이지는 이벤트를 받지 못한다.
 * 사이드바가 펼쳐진 동안 투명한 막을 덮어, 바 밖으로 나간 것을 알아챈다.
 */
export const PreviewShield = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
`;

/** 로그인해야 쓸 수 있는 위젯의 미리보기를 가린다 */
export const LockOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  svg {
    width: 26px;
    height: 26px;
    display: block;
    color: ${({ theme }) => theme.colors.textDim};
  }
  /* 뒤의 미리보기가 비쳐 보일 만큼만 덮는다 */
  background: ${({ theme }) => withAlpha(theme.colors.background, 0.72)};
`;

export const LockText = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 13px;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.text};
`;

/** 고유키를 못 가져왔을 때처럼, 그냥 두면 잘못된 URL이 복사되는 상황을 알린다 */
export const WidgetWarning = styled.p`
  flex-shrink: 0;
  align-self: center;
  max-width: 640px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 12px;
  line-height: 1.6;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.accent};
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
`;
