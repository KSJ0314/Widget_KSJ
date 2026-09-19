import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import { widgets, type WidgetMeta } from './widgetRegistry';
import { themes, type ThemeName } from '@/theme/theme';
import { fontNames, fontPreview, type FontName } from '@/theme/fonts';
import { getCurrentPosition } from '@weather/useWeather';
import { findNearestCity } from '@/data/cityMap';
import { useAuthStore } from '@/store/authStore';
import { useContainerSize } from '@/hooks/useContainerSize';
import { LockableThemeRow } from './LockableThemeRow';
import { LocalMigrateButton } from './LocalMigrateButton';
import {
  CalendarIcon,
  CheckIcon,
  ClipboardIcon,
  ClockIcon,
  PinIcon,
  SchedulerIcon,
  TypeIcon,
  UserIcon,
  WeatherIcon,
  WidgetIcon,
} from './HomeIcons';
import {
  HomeContainer,
  Sidebar,
  SidebarInner,
  SidebarSection,
  SidebarBody,
  AccountSection,
  LogoRow,
  Title,
  IconButton,
  RailIcon,
  GroupLabel,
  ChipList,
  FontChip,
  FontChipLabel,
  ThemeChip,
  ThemeDot,
  CategoryGroup,
  CategoryTitle,
  WidgetItem,
  WidgetDescription,
  AccountRow,
  AccountEmail,
  MigrateSlot,
  LoginButton,
  ProfileButton,
  ModalOverlay,
  ModalBox,
  ModalText,
  ModalActions,
  ModalButton,
  Stage,
  StageToolbar,
  CopyUrlButton,
  FitBox,
  PreviewFrame,
  PreviewLoading,
  PreviewShield,
  WidgetWarning,
  LANDSCAPE_RATIO,
  PORTRAIT_RATIO,
} from './Home.styled';

const categoryIcons: Record<string, ComponentType> = {
  Clock: ClockIcon,
  Calendar: CalendarIcon,
  Scheduler: SchedulerIcon,
  Weather: WeatherIcon,
};

const groupByCategory = () => {
  const map = new Map<string, WidgetMeta[]>();
  for (const widget of widgets) {
    if (!map.has(widget.category)) map.set(widget.category, []);
    map.get(widget.category)!.push(widget);
  }
  return map;
};

const grouped = groupByCategory();

/** 남은 공간 안에 비율을 지키며 가장 크게 들어가는 크기 */
const fitSize = (boxWidth: number, boxHeight: number, ratio: number) => {
  const width = Math.min(boxWidth, boxHeight * ratio);
  return { width: Math.floor(width), height: Math.floor(width / ratio) };
};

export const Home = () => {
  const { user, loading, keyError, widgetKey, signIn, signOut } = useAuthStore();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [widget, setWidget] = useState<WidgetMeta>(widgets[0]);
  const [themeName, setThemeName] = useState<ThemeName>('dark');
  const [font, setFont] = useState<FontName>('default');
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  // 미리보기 iframe이 처음 불러오기를 마쳤는지. 이후 전환은 해시만 바뀌어 load가 오지 않는다
  const [frameLoaded, setFrameLoaded] = useState(false);
  // iframe이 사라지면(크기가 0이 되는 등) 다시 만들어질 때 처음부터 불러오므로 로딩 표시를 되살린다
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const frameRef = useCallback((node: HTMLIFrameElement | null) => {
    iframeRef.current = node;
    if (!node) setFrameLoaded(false);
  }, []);
  // iframe의 src 속성은 만들어질 때의 주소로 고정한다. 속성을 바꾸면 방문 기록이 쌓여 뒤로가기가 생긴다
  const [frameSrc, setFrameSrc] = useState<string | null>(null);
  const { ref: fitRef, width: boxWidth, height: boxHeight } = useContainerSize();

  const expanded = hovered || pinned;

  // 글자가 없는 위젯은 폰트를 고를 수 없으므로 URL에도 넣지 않는다
  const activeFont: FontName = widget.hideFont ? 'default' : font;

  // 기본 폰트는 테마가 정의한 값을 쓰므로 URL에 넣지 않는다
  const fontParam = (name: FontName) => (name === 'default' ? '' : `&font=${name}`);

  // 개인 데이터를 다루는 위젯만, 그리고 로그인해 키가 있을 때만 붙인다
  const keyParam = (needsKey?: boolean) =>
    needsKey && widgetKey ? `&u=${widgetKey}` : '';

  const widgetHash = (extra = '') =>
    `#${widget.path}?theme=${themeName}${fontParam(activeFont)}${extra}${keyParam(widget.requiresWidgetKey)}`;

  // 복사할 URL과 같은 페이지를 띄운다. 도시는 복사할 때만 정한다
  const previewSrc = `${import.meta.env.BASE_URL}${widgetHash()}`;

  const selectWidget = (next: WidgetMeta) => {
    setWidget(next);
    // 새 위젯이 지금 테마를 지원하지 않으면 그 위젯의 첫 테마로 바꾼다
    if (!next.themes.includes(themeName)) setThemeName(next.themes[0]);
  };

  const copyUrl = async () => {
    let extra = '';
    if (widget.requiresLocation) {
      try {
        const pos = await getCurrentPosition();
        const { latitude: lat, longitude: lon } = pos.coords;
        const city = findNearestCity(lat, lon);
        extra = `&city=${city.en}`;
      } catch {
        // 위치를 못 얻으면 도시 없이 복사한다
      }
    }
    const url = `${window.location.origin}${import.meta.env.BASE_URL}${widgetHash(extra)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ratio = widget.previewPortrait ? PORTRAIT_RATIO : LANDSCAPE_RATIO;
  const frame = fitSize(boxWidth, boxHeight, ratio);
  const locked = Boolean(widget.requiresLogin) && !loading && !user;
  const showFrame = frame.width > 0 && frame.height > 0;

  // iframe이 새로 만들어질 때는 그 시점의 주소로 고정하고, 사라지면 고정을 푼다
  if (showFrame && frameSrc === null) setFrameSrc(previewSrc);
  if (!showFrame && frameSrc !== null) setFrameSrc(null);

  // 주소가 바뀌면 iframe 안에서 replace로 해시만 옮긴다. 다시 불러오지 않고 방문 기록도 쌓이지 않는다
  // 첫 로드 전에는 건너뛰고, 로드가 끝나면(frameLoaded) 최신 주소와 한 번 맞춘다
  useEffect(() => {
    if (!frameLoaded) return;
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    const target = new URL(previewSrc, window.location.href).href;
    try {
      if (win.location.href !== target) win.location.replace(target);
    } catch {
      // 출처가 달라 접근할 수 없으면 건너뛴다
    }
  }, [previewSrc, frameLoaded]);

  return (
    <HomeContainer>
      <Sidebar
        $expanded={expanded}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <SidebarInner $expanded={expanded}>
          <LogoRow $expanded={expanded}>
            <Title>{expanded ? 'WIDGET KSJ' : 'W'}</Title>
            {expanded && (
              <IconButton
                $active={pinned}
                onClick={() => setPinned(prev => !prev)}
                title={pinned ? '펼침 고정 해제' : '펼침 고정'}
              >
                <PinIcon />
              </IconButton>
            )}
          </LogoRow>

          <SidebarBody>
            <SidebarSection $expanded={expanded}>
              {expanded ? (
                <>
                  {!widget.hideFont && (
                    <>
                      <GroupLabel>폰트</GroupLabel>
                      <ChipList>
                        {fontNames.map(fontName => {
                          const { family, scale, nudge } = fontPreview(fontName);
                          return (
                            <FontChip
                              key={fontName}
                              $active={font === fontName}
                              $family={family}
                              $scale={scale}
                              onClick={() => setFont(fontName)}
                            >
                              <FontChipLabel $offsetY={nudge}>{fontName}</FontChipLabel>
                            </FontChip>
                          );
                        })}
                      </ChipList>
                    </>
                  )}
                  <GroupLabel>색상</GroupLabel>
                  <ChipList>
                    {widget.themes.map(name => (
                      <ThemeChip
                        key={name}
                        $active={themeName === name}
                        onClick={() => setThemeName(name)}
                      >
                        <ThemeDot $color={themes[name].colors.primary} />
                        {name}
                      </ThemeChip>
                    ))}
                  </ChipList>
                </>
              ) : (
                <RailIcon title="폰트·색상">
                  <TypeIcon />
                </RailIcon>
              )}
            </SidebarSection>

            <SidebarSection $expanded={expanded}>
              {expanded ? (
                <>
                  <GroupLabel>위젯</GroupLabel>
                  {[...grouped.entries()].map(([category, categoryWidgets]) => {
                    const Icon = categoryIcons[category] ?? WidgetIcon;
                    return (
                      <CategoryGroup key={category}>
                        <CategoryTitle>
                          <Icon />
                          {category}
                        </CategoryTitle>
                        {categoryWidgets.map(item => (
                          <WidgetItem
                            key={item.id}
                            $active={item.id === widget.id}
                            onClick={() => selectWidget(item)}
                          >
                            {item.name}
                          </WidgetItem>
                        ))}
                      </CategoryGroup>
                    );
                  })}
                  {widget.description && <WidgetDescription>{widget.description}</WidgetDescription>}
                </>
              ) : (
                [...grouped.entries()].map(([category, categoryWidgets]) => {
                  const Icon = categoryIcons[category] ?? WidgetIcon;
                  return (
                    <IconButton
                      key={category}
                      $active={category === widget.category}
                      onClick={() => selectWidget(categoryWidgets[0])}
                      title={category}
                    >
                      <Icon />
                    </IconButton>
                  );
                })
              )}
            </SidebarSection>
          </SidebarBody>

          <AccountSection $expanded={expanded}>
            {!loading && (
              user ? (
                <>
                  <AccountRow>
                    <ProfileButton onClick={() => setLogoutOpen(true)} title={user.email ?? '계정'}>
                      {user.photoURL
                        ? <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
                        : (user.email?.[0]?.toUpperCase() ?? '?')}
                    </ProfileButton>
                    {expanded && user.email && <AccountEmail>{user.email}</AccountEmail>}
                  </AccountRow>
                  {/* 옮기는 도중에 바가 접혀도 확인 창이 사라지지 않게 버튼만 숨긴다 */}
                  <MigrateSlot $hidden={!expanded}>
                    <LocalMigrateButton />
                  </MigrateSlot>
                </>
              ) : expanded ? (
                <LoginButton onClick={() => signIn()}>Google로 로그인</LoginButton>
              ) : (
                <IconButton onClick={() => signIn()} title="Google로 로그인">
                  <UserIcon />
                </IconButton>
              )
            )}
          </AccountSection>
        </SidebarInner>
      </Sidebar>

      <Stage>
        <StageToolbar>
          <CopyUrlButton $copied={copied} onClick={copyUrl}>
            {copied ? <CheckIcon /> : <ClipboardIcon />}
            {copied ? '복사됨' : '노션용 URL 복사'}
          </CopyUrlButton>
        </StageToolbar>

        <FitBox ref={fitRef}>
          {showFrame && (
            <PreviewFrame $width={frame.width} $height={frame.height}>
              {/* 새로 만들지 않고 src 속성도 바꾸지 않는다. 주소 전환은 위 effect가 replace로 한다 */}
              <iframe
                ref={frameRef}
                src={frameSrc ?? previewSrc}
                title={`${widget.name} 미리보기`}
                onLoad={() => setFrameLoaded(true)}
              />
              {!frameLoaded && <PreviewLoading>LOADING</PreviewLoading>}
              <LockableThemeRow locked={locked} />
              {hovered && !pinned && <PreviewShield />}
            </PreviewFrame>
          )}
        </FitBox>

        {widget.requiresWidgetKey && keyError && (
          <WidgetWarning>
            고유키를 불러오지 못했습니다. 지금 URL을 복사하면 일정이 저장되지 않습니다. 새로고침해 주세요.
          </WidgetWarning>
        )}
      </Stage>

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
    </HomeContainer>
  );
};
