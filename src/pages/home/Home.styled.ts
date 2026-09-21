import styled, { css, keyframes } from 'styled-components';
import {
  homeColors,
  homeFont,
  homeFontSize,
  homeRadius,
  homeShadow,
  homeVars,
} from './homeTheme';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/** 접힌 사이드바 폭. 미리보기 영역은 펼침 고정일 때만 `SIDEBAR_WIDTH`만큼, 그 밖에는 이만큼만 비켜 선다 */
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
    background: ${homeColors.border};
    border-radius: ${homeRadius.chip};
  }
`;

/** 고른 폰트·글자 배율·색 팔레트를 CSS 변수로 넣어, 안쪽 홈 컴포넌트가 모두 따라 바뀌게 한다 */
export const HomeContainer = styled.div<{ $font: string; $fontScale: number; $dark: boolean }>`
  --home-font: ${({ $font }) => $font};
  --home-font-scale: ${({ $fontScale }) => $fontScale};
  ${({ $dark }) => homeVars($dark)}
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${homeColors.background};
`;

/* ---------- 사이드바 ---------- */

/** 마우스로 잠깐 펼칠 때는 미리보기 위에 겹치고, 펼침 고정일 때만 미리보기가 그만큼 비켜 선다 */
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
  background: ${homeColors.sidebar};
  border-right: 1px solid ${homeColors.border};
  box-shadow: ${({ $expanded }) => ($expanded ? homeShadow.sidebar : 'none')};
  transition: width 0.18s ease, box-shadow 0.18s ease;
`;

/** 폭이 바뀌는 동안 내용이 줄바꿈되며 흔들리지 않게 안쪽 폭은 고정한다 */
export const SidebarInner = styled.div<{ $expanded: boolean }>`
  width: ${({ $expanded }) => ($expanded ? SIDEBAR_WIDTH : RAIL_WIDTH)}px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const SidebarSection = styled.div<{ $expanded: boolean; $divider?: boolean }>`
  padding: ${({ $expanded }) => ($expanded ? '16px 16px' : '12px 0')};
  display: flex;
  flex-direction: column;
  align-items: ${({ $expanded }) => ($expanded ? 'stretch' : 'center')};
  gap: ${({ $expanded }) => ($expanded ? 10 : 6)}px;
  /* 앞 영역과 위쪽 선으로 나눈다 (접힘·펼침 모두) */
  ${({ $divider }) => ($divider ? `border-top: 1px solid ${homeColors.border};` : '')}
`;

/** 로고와 로그인 사이. 내용이 길면 이 부분만 스크롤한다 */
export const SidebarBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  ${scrollbar}
`;

/** 위쪽 선으로 위젯 영역과 나눈다. 사이드바를 접었을 때도 선을 둔다 */
export const AccountSection = styled(SidebarSection)`
  border-top: 1px solid ${homeColors.border};
`;

export const LogoRow = styled.div<{ $expanded: boolean }>`
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: ${({ $expanded }) => ($expanded ? 'space-between' : 'center')};
  padding: ${({ $expanded }) => ($expanded ? '0 12px 0 18px' : '0')};
  border-bottom: 1px solid ${homeColors.border};
`;

export const Title = styled.h1`
  font-family: ${homeFont};
  font-size: ${homeFontSize(17)};
  font-weight: 700;
  color: ${homeColors.accentStrong};
  white-space: nowrap;
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
  border-radius: ${homeRadius.control};
  border: 1px solid transparent;
  background: ${({ $active }) => ($active ? homeColors.selected : 'none')};
  color: ${({ $active }) => ($active ? homeColors.accentStrong : homeColors.textSub)};
  transition: color 0.15s, border-color 0.15s, background 0.15s;

  svg {
    width: 18px;
    height: 18px;
    display: block;
  }

  &:hover {
    color: ${homeColors.accentStrong};
  }
`;

/** 접힌 바의 폰트 표시. 고른 폰트로 T를 보여 준다 */
export const RailIcon = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${homeColors.textSub};
  font-family: ${homeFont};
  font-size: ${homeFontSize(18)};
  font-weight: 600;
  line-height: 1;
`;

export const GroupLabel = styled.span`
  font-family: ${homeFont};
  font-size: ${homeFontSize(12)};
  font-weight: 600;
  color: ${homeColors.textSub};
`;

export const ChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const FontChip = styled.button<{
  $active: boolean;
  /** 칩에 보여줄 폰트. default 칩은 홈 기본 폰트를 받는다 */
  $family: string;
  $scale: number;
}>`
  /* 칩마다 자기 폰트로 이름을 보여준다 */
  font-family: ${({ $family }) => $family};
  /* scale을 그대로 곱하면 칩 크기가 제각각이라 살짝만 반영한다 */
  font-size: ${({ $scale }) => 12 * Math.min($scale, 1.15)}px;
  /* 폰트마다 글자 상자 높이가 달라 세로 중앙이 어긋난다 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  height: 28px;
  box-sizing: border-box;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0 12px;
  border-radius: ${homeRadius.chip};
  transition: color 0.2s, border-color 0.2s, background 0.2s;
  background: ${({ $active }) => ($active ? homeColors.selected : homeColors.surface)};
  border: 1px solid ${({ $active }) => ($active ? homeColors.accent : homeColors.border)};
  color: ${({ $active }) => ($active ? homeColors.accentStrong : homeColors.textSub)};

  &:hover {
    border-color: ${homeColors.accent};
    color: ${homeColors.accentStrong};
  }
`;

/** 칩 크기는 그대로 두고 글자만 위아래로 미세하게 옮긴다 */
export const FontChipLabel = styled.span<{ $offsetY: number }>`
  transform: translateY(${({ $offsetY }) => $offsetY}px);
`;

/** 이름 글자 없이 색만 보여 주는 색상 버튼. 바탕·테두리·점 색은 고른 위젯이 그 테마에서 실제로 쓰는 색이다(`chipColors.ts`) */
export const ThemeChip = styled.button<{ $active: boolean; $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;
  border-radius: ${homeRadius.chip};
  transition: box-shadow 0.2s, border-color 0.2s;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $color }) => $color};
  /* 고른 버튼은 바깥 링으로 표시한다 */
  box-shadow: ${({ $active }) => ($active ? `0 0 0 2px ${homeColors.accent}` : 'none')};

  &:hover {
    box-shadow: ${({ $active }) =>
      $active ? `0 0 0 2px ${homeColors.accent}` : `0 0 0 2px ${homeColors.border}`};
  }
`;

/** 테마의 대표색 */
export const ThemeDot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $color }) => $color};
  /* 흰 배경 테마의 옅은 색도 경계가 보이게 한다 */
  box-shadow: 0 0 0 1px rgba(128, 128, 128, 0.35);
`;

/** 접힌 바에서 지금 고른 색상을 보여 주는 점 */
export const RailThemeDot = styled(ThemeDot)`
  width: 14px;
  height: 14px;
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
  height: 24px;
  color: ${homeColors.accent};

  svg {
    width: 16px;
    height: 16px;
    display: block;
  }
`;

export const WidgetItem = styled.button<{ $active: boolean }>`
  text-align: left;
  cursor: pointer;
  padding: 8px 12px 8px 24px;
  border-radius: ${homeRadius.control};
  border: none;
  font-family: ${homeFont};
  font-size: ${homeFontSize(13)};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  white-space: nowrap;
  background: ${({ $active }) => ($active ? homeColors.selected : 'transparent')};
  color: ${({ $active }) => ($active ? homeColors.accentStrong : homeColors.text)};
  transition: background 0.15s, color 0.15s;

  &:hover {
    color: ${homeColors.accentStrong};
  }
`;

/** 미리보기 위 영역의 둘째 줄 */
export const WidgetDescription = styled.p`
  flex-shrink: 0;
  max-width: 640px;
  font-family: ${homeFont};
  font-size: ${homeFontSize(13)};
  font-weight: 400;
  color: ${homeColors.textSub};
  line-height: 1.3;
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
  font-family: ${homeFont};
  font-size: ${homeFontSize(13)};
  color: ${homeColors.text};
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
  font-family: ${homeFont};
  font-size: ${homeFontSize(13)};
  font-weight: 600;
  padding: 9px 14px;
  border-radius: ${homeRadius.control};
  border: none;
  background: ${homeColors.accentStrong};
  color: ${homeColors.onAccent};
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.9;
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
  background: ${homeColors.selected};
  font-family: ${homeFont};
  font-size: ${homeFontSize(13)};
  font-weight: 600;
  color: ${homeColors.accentStrong};
  border: 1px solid ${homeColors.border};
  transition: border-color 0.15s;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  &:hover {
    border-color: ${homeColors.accent};
  }
`;

export const MigrateBtn = styled.button`
  flex-shrink: 0;
  cursor: pointer;
  font-family: ${homeFont};
  font-size: ${homeFontSize(13)};
  font-weight: 500;
  padding: 8px 12px;
  border-radius: ${homeRadius.control};
  border: none;
  background: ${homeColors.selected};
  color: ${homeColors.accentStrong};
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
  background: ${homeColors.scrim};
`;

export const ModalBox = styled.div`
  min-width: 260px;
  padding: 24px;
  border-radius: ${homeRadius.card};
  background: ${homeColors.surface};
  box-shadow: ${homeShadow.modal};
`;

export const ModalText = styled.p`
  font-family: ${homeFont};
  font-size: ${homeFontSize(14)};
  color: ${homeColors.text};
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const ModalButton = styled.button<{ $primary?: boolean }>`
  cursor: pointer;
  font-family: ${homeFont};
  font-size: ${homeFontSize(13)};
  font-weight: 600;
  padding: 9px 16px;
  border-radius: ${homeRadius.control};
  transition: opacity 0.15s;

  ${({ $primary }) =>
    $primary
      ? `
        border: 1px solid ${homeColors.accentStrong};
        background: ${homeColors.accentStrong};
        color: ${homeColors.onAccent};
      `
      : `
        border: 1px solid ${homeColors.border};
        background: ${homeColors.surface};
        color: ${homeColors.textSub};
      `}

  &:hover {
    opacity: 0.8;
  }
`;

/* ---------- 미리보기 영역 ---------- */

/**
 * 펼침 고정일 때는 펼친 사이드바 폭만큼 비켜 서고(가려지지 않는다), 그 밖에는 접힌 바 폭만큼만 비켜 선다.
 * 바탕은 고른 위젯이 그 색상에서 쓰는 배경색($bg)이라 미리보기와 이어져 보인다.
 */
export const Stage = styled.main<{ $pinned: boolean; $bg: string }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: ${({ $pinned }) => ($pinned ? SIDEBAR_WIDTH : RAIL_WIDTH)}px;
  display: flex;
  flex-direction: column;
  padding: 16px 32px 32px;
  gap: 16px;
  background: ${({ $bg }) => $bg};
`;

/** 미리보기 위 영역. 첫 줄에 제목·복사 버튼, 둘째 줄에 설명글을 두고 아래 선으로 미리보기와 나눈다 */
export const StageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
  padding-bottom: 16px;
  border-bottom: 1px solid ${homeColors.border};
`;

/** 미리보기 위 영역의 첫 줄. 제목과 복사 버튼을 양끝에 두고 세로 가운데로 맞춘다 */
export const StageTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const StageTitle = styled.h2`
  min-width: 0;
  font-family: ${homeFont};
  font-size: ${homeFontSize(20)};
  font-weight: 600;
  color: ${homeColors.accentStrong};
  line-height: 1.4;
`;

export const CopyUrlButton = styled.button<{ $copied: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  cursor: pointer;
  font-family: ${homeFont};
  font-size: ${homeFontSize(13)};
  padding: 9px 16px;
  border-radius: ${homeRadius.control};
  border: none;
  background: ${({ $copied }) => ($copied ? homeColors.accent : homeColors.accentStrong)};
  color: ${homeColors.onAccent};
  transition: background 0.2s, opacity 0.2s;

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
  border-radius: ${homeRadius.card};
  background: ${homeColors.surface};
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
  background: ${homeColors.surface};
  font-family: ${homeFont};
  font-size: ${homeFontSize(12)};
  font-weight: 500;
  color: ${homeColors.textSub};
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
    color: ${homeColors.accent};
  }
  /* 뒤의 미리보기가 비쳐 보일 만큼만 덮는다 (홈 배경색 72%) */
  background: ${homeColors.veil};
`;

export const LockText = styled.p`
  font-family: ${homeFont};
  font-size: ${homeFontSize(14)};
  font-weight: 500;
  color: ${homeColors.text};
`;

/** 고유키를 못 가져왔을 때처럼, 그냥 두면 잘못된 URL이 복사되는 상황을 알린다 */
export const WidgetWarning = styled.p`
  flex-shrink: 0;
  align-self: center;
  max-width: 640px;
  font-family: ${homeFont};
  font-size: ${homeFontSize(13)};
  line-height: 1.6;
  color: ${homeColors.accentStrong};
  background: ${homeColors.selected};
  padding: 10px 14px;
  border-radius: ${homeRadius.control};
  border: none;
`;
