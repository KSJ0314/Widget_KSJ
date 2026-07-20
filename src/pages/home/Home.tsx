import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { widgets } from './widgetRegistry';
import { themes } from '@/theme/theme';
import { fontNames, withFont, type FontName } from '@/theme/fonts';
import { getCurrentPosition } from '../weather/useWeather';
import { findNearestCity } from '@/data/cityMap';
import { useAuthStore } from '@/store/authStore';
import { LockableThemeRow } from './LockableThemeRow';
import {
  HomeContainer,
  Header,
  HeaderInfo,
  Title,
  Subtitle,
  LoginButton,
  ProfileButton,
  ModalOverlay,
  ModalBox,
  ModalText,
  ModalActions,
  ModalButton,
  CategorySection,
  CategoryHeader,
  WidgetSection,
  SectionHeader,
  SectionName,
  SectionCategory,
  FontRow,
  FontLabel,
  FontChip,
  ThemeCard,
  PreviewArea,
  PreviewScaler,
  previewSpec,
  WidgetDescription,
  WidgetWarning,
  ThemeBadge,
  CopyButton,
} from './Home.styled';

const ClipboardIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const groupByCategory = () => {
  const map = new Map<string, typeof widgets>();
  for (const widget of widgets) {
    if (!map.has(widget.category)) map.set(widget.category, []);
    map.get(widget.category)!.push(widget);
  }
  return map;
};

export const Home = () => {
  const navigate = useNavigate();
  const grouped = groupByCategory();
  const { user, loading, keyError, widgetKey, signIn, signOut } = useAuthStore();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [fontByWidget, setFontByWidget] = useState<Record<string, FontName>>({});

  // 기본 폰트는 테마가 정의한 값을 쓰므로 URL에 넣지 않는다
  const fontParam = (font: FontName) => (font === 'default' ? '' : `&font=${font}`);

  // 개인 데이터를 다루는 위젯만, 그리고 로그인해 키가 있을 때만 붙인다
  const keyParam = (needsKey?: boolean) =>
    needsKey && widgetKey ? `&u=${widgetKey}` : '';

  const copyUrl = async (
    e: React.MouseEvent,
    path: string,
    themeName: string,
    font: FontName,
    requiresLocation?: boolean,
    needsKey?: boolean,
  ) => {
    e.stopPropagation();
    let extra = '';
    if (requiresLocation) {
      try {
        const pos = await getCurrentPosition();
        const { latitude: lat, longitude: lon } = pos.coords;
        const city = findNearestCity(lat, lon);
        extra = `&city=${city.en}`;
      } catch {}
    }
    const url = `${window.location.origin}${import.meta.env.BASE_URL}#${path}?theme=${themeName}${fontParam(font)}${extra}${keyParam(needsKey)}`;
    navigator.clipboard.writeText(url);
    const key = `${path}-${themeName}`;
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <HomeContainer>
      <Header>
        <HeaderInfo>
          <Title>WIDGET KSJ</Title>
          <Subtitle>Personal widget collection</Subtitle>
        </HeaderInfo>
        {!loading && (
          user ? (
            <ProfileButton onClick={() => setLogoutOpen(true)} title={user.email ?? '계정'}>
              {user.photoURL
                ? <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
                : (user.email?.[0]?.toUpperCase() ?? '?')}
            </ProfileButton>
          ) : (
            <LoginButton onClick={() => signIn()}>Google로 로그인</LoginButton>
          )
        )}
      </Header>

      {logoutOpen && (
        <ModalOverlay onClick={() => setLogoutOpen(false)}>
          <ModalBox onClick={e => e.stopPropagation()}>
            <ModalText>로그아웃하시겠습니까?</ModalText>
            <ModalActions>
              <ModalButton onClick={() => setLogoutOpen(false)}>취소</ModalButton>
              <ModalButton
                $primary
                onClick={() => {
                  setLogoutOpen(false);
                  signOut();
                }}
              >
                로그아웃
              </ModalButton>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}

      {[...grouped.entries()].map(([category, categoryWidgets]) => (
        <CategorySection key={category}>
          <CategoryHeader>{category}</CategoryHeader>

          {categoryWidgets.map(({ id, name, category: cat, path, themes: widgetThemes, component: Widget, requiresLocation, requiresWidgetKey, requiresLogin, previewPortrait, description }) => {
            const font = fontByWidget[id] ?? 'default';
            const preview = previewSpec(Boolean(previewPortrait));

            return (
              <WidgetSection key={id}>
                <SectionHeader>
                  <SectionName>{name}</SectionName>
                  <SectionCategory>{cat}</SectionCategory>
                </SectionHeader>
                {description && <WidgetDescription>{description}</WidgetDescription>}
                {id === 'calendar-scheduler' && keyError && (
                  <WidgetWarning>
                    고유키를 불러오지 못했습니다. 지금 URL을 복사하면 일정이 저장되지 않습니다. 새로고침해 주세요.
                  </WidgetWarning>
                )}
                <FontRow>
                  <FontLabel>Font</FontLabel>
                  {fontNames.map(fontName => (
                    <FontChip
                      key={fontName}
                      $active={font === fontName}
                      onClick={() => setFontByWidget(prev => ({ ...prev, [id]: fontName }))}
                    >
                      {fontName}
                    </FontChip>
                  ))}
                </FontRow>
                <LockableThemeRow
                  locked={Boolean(requiresLogin) && !loading && !user}
                  cardWidth={preview.cardWidth}
                >
                  {widgetThemes.map(themeName => (
                    <ThemeCard
                      key={themeName}
                      $width={preview.cardWidth}
                      onClick={() => navigate(`${path}?theme=${themeName}${fontParam(font)}${keyParam(requiresWidgetKey)}`)}
                    >
                      <PreviewArea $ratio={preview.ratio}>
                        <PreviewScaler
                          $w={preview.baseWidth}
                          $h={preview.baseHeight}
                          $scale={preview.scale}
                        >
                          <StyledThemeProvider theme={withFont(themes[themeName], font)}>
                            <Widget />
                          </StyledThemeProvider>
                        </PreviewScaler>
                      </PreviewArea>
                      <ThemeBadge $color={themes[themeName].colors.primary}>
                        {themeName}
                        <CopyButton
                          $copied={copiedKey === `${path}-${themeName}`}
                          onClick={(e) => copyUrl(e, path, themeName, font, requiresLocation, requiresWidgetKey)}
                          title="URL 복사"
                        >
                          {copiedKey === `${path}-${themeName}` ? <CheckIcon /> : <ClipboardIcon />}
                        </CopyButton>
                      </ThemeBadge>
                    </ThemeCard>
                  ))}
                </LockableThemeRow>
              </WidgetSection>
            );
          })}
        </CategorySection>
      ))}
    </HomeContainer>
  );
};
