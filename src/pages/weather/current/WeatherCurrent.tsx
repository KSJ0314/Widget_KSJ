import { useTheme } from 'styled-components';
import { useContainerSize } from '../../../hooks/useContainerSize';
import { useWeather } from '../useWeather';
import { getCondition } from '../weatherCode';
import { WeatherIcon } from '../WeatherIcon';
import { DAYS_SHORT } from '../../../utils/date';
import {
  Wrapper, Card,
  CurrentGrid, LeftCol, DateText, CityText,
  CenterCol,
  RightCol, Temperature, StatsLine, StatItem, StatLabel, StatValue,
  ForecastScroll, ForecastItem, ForecastTime, ForecastTemp, ForecastPop, ForecastIconWrap,
  StatusText,
} from './WeatherCurrent.styled';

/** HHmm 문자열을 "오전/오후 H시" 형태로 변환 */
function formatTime(time: string): string {
  const h = parseInt(time.slice(0, 2), 10);
  const ampm = h < 12 ? '오전' : '오후';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${ampm} ${h12}시`;
}

export const WeatherCurrent = () => {
  const { ref, width, height } = useContainerSize();
  const state = useWeather();
  const theme = useTheme();

  const RATIO = 16 / 9;
  const marginY = 8;
  const marginX = 8;
  const cardWidth = Math.min(width - marginX * 2, (height - marginY * 2) * RATIO);
  const cardHeight = cardWidth / RATIO;
  const u = Math.max(Math.min(cardWidth / 22, cardHeight / 20), 8);
  const itemWidth = (cardWidth - u * 0.8 * 2 - u * 3 * 2 - u * 4 * 4) / 5;
  const isMini = u < 14;

  const today = new Date();
  const dateStr = `${DAYS_SHORT[today.getDay()].toUpperCase()} ${today.getMonth() + 1}/${today.getDate()}`;

  return (
    <Wrapper ref={ref}>
      {state.status !== 'ok' ? (
        <StatusText $u={u}>
          {state.status === 'error' ? state.message : state.step}
        </StatusText>
      ) : (() => {
        const { data } = state;
        const condition = getCondition(data.hourly[0]?.sky ?? 1, data.current.pty);

        return (
          <Card $u={u} $w={cardWidth} $h={cardHeight}>
            {/* 현재 날씨: 좌(날짜+지역) / 중(아이콘) / 우(온도+통계) */}
            <CurrentGrid $u={u}>
              <LeftCol $u={u}>
                <DateText $u={u}>{dateStr}</DateText>
                <CityText $u={u}>{data.city}</CityText>
              </LeftCol>

              <CenterCol>
                <WeatherIcon type={condition.icon} size={u * 6} color={theme.colors.primary} />
              </CenterCol>

              <RightCol $u={u}>
                <Temperature $u={u}>{data.current.temp}°</Temperature>
                <StatsLine $u={u} $mini={isMini}>
                  <StatItem $u={u}>
                    <StatValue $u={u}>{data.current.humidity}%</StatValue>
                    <StatLabel $u={u}>습도</StatLabel>
                  </StatItem>
                  <StatItem $u={u}>
                    <StatValue $u={u}>{data.current.windSpeed}m/s</StatValue>
                    <StatLabel $u={u}>풍속</StatLabel>
                  </StatItem>
                  <StatItem $u={u}>
                    <StatValue $u={u}>{data.current.rn1}mm</StatValue>
                    <StatLabel $u={u}>강수</StatLabel>
                  </StatItem>
                </StatsLine>
              </RightCol>
            </CurrentGrid>

            {/* 시간별 예보 (가로 스크롤) */}
            <ForecastScroll $u={u}>
              {data.hourly.map((f, i) => {
                const fc = getCondition(f.sky, f.pty);
                return (
                  <ForecastItem key={i} $u={u} $itemW={itemWidth}>
                    <ForecastTime $u={u} $mini={isMini}>{formatTime(f.time)}</ForecastTime>
                    <ForecastIconWrap $u={u}>
                      <WeatherIcon type={fc.icon} size={u * 2.8} color={theme.colors.primary} />
                    </ForecastIconWrap>
                    <ForecastTemp $u={u} $mini={isMini}>{f.temp}°</ForecastTemp>
                    {f.pop > 0 && <ForecastPop $u={u} $mini={isMini}>💧{f.pop}%</ForecastPop>}
                  </ForecastItem>
                );
              })}
            </ForecastScroll>
          </Card>
        );
      })()}
    </Wrapper>
  );
};
