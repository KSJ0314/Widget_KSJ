import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { widgets } from './widgetRegistry';
import { themes } from '../../theme/theme';
import { getCurrentPosition, reverseGeocode } from '../weather/useWeather';
import {
  HomeContainer,
  Header,
  Title,
  Subtitle,
  CategorySection,
  CategoryHeader,
  WidgetSection,
  SectionHeader,
  SectionName,
  SectionCategory,
  ThemeRow,
  ThemeCard,
  PreviewArea,
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
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyUrl = async (e: React.MouseEvent, path: string, themeName: string, requiresLocation?: boolean) => {
    e.stopPropagation();
    let extra = '';
    if (requiresLocation) {
      try {
        const pos = await getCurrentPosition();
        const { latitude: lat, longitude: lon } = pos.coords;
        const city = await reverseGeocode(lat, lon);
        extra = `&lat=${lat}&lon=${lon}&city=${encodeURIComponent(city)}`;
      } catch {}
    }
    const url = `${window.location.origin}${import.meta.env.BASE_URL}#${path}?theme=${themeName}${extra}`;
    navigator.clipboard.writeText(url);
    const key = `${path}-${themeName}`;
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <HomeContainer>
      <Header>
        <Title>WIDGET KSJ</Title>
        <Subtitle>Personal widget collection</Subtitle>
      </Header>

      {[...grouped.entries()].map(([category, categoryWidgets]) => (
        <CategorySection key={category}>
          <CategoryHeader>{category}</CategoryHeader>

          {categoryWidgets.map(({ id, name, category: cat, path, themes: widgetThemes, component: Widget, requiresLocation }) => (
            <WidgetSection key={id}>
              <SectionHeader>
                <SectionName>{name}</SectionName>
                <SectionCategory>{cat}</SectionCategory>
              </SectionHeader>
              <ThemeRow>
                {widgetThemes.map(themeName => (
                  <ThemeCard
                    key={themeName}
                    onClick={() => navigate(`${path}?theme=${themeName}`)}
                  >
                    <PreviewArea>
                      <StyledThemeProvider theme={themes[themeName]}>
                        <Widget />
                      </StyledThemeProvider>
                    </PreviewArea>
                    <ThemeBadge $color={themes[themeName].colors.primary}>
                      {themeName}
                      <CopyButton
                        $copied={copiedKey === `${path}-${themeName}`}
                        onClick={(e) => copyUrl(e, path, themeName, requiresLocation)}
                        title="URL 복사"
                      >
                        {copiedKey === `${path}-${themeName}` ? <CheckIcon /> : <ClipboardIcon />}
                      </CopyButton>
                    </ThemeBadge>
                  </ThemeCard>
                ))}
              </ThemeRow>
            </WidgetSection>
          ))}
        </CategorySection>
      ))}
    </HomeContainer>
  );
};
