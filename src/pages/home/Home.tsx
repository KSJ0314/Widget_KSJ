import { useNavigate } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { widgets } from './widgetRegistry';
import { themes } from '../../theme/theme';
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
} from './Home.styled';

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

  return (
    <HomeContainer>
      <Header>
        <Title>WIDGET KSJ</Title>
        <Subtitle>Personal widget collection</Subtitle>
      </Header>

      {[...grouped.entries()].map(([category, categoryWidgets]) => (
        <CategorySection key={category}>
          <CategoryHeader>{category}</CategoryHeader>

          {categoryWidgets.map(({ id, name, category: cat, path, themes: widgetThemes, component: Widget }) => (
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
                    <ThemeBadge $color={themes[themeName].colors.primary}>{themeName}</ThemeBadge>
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
