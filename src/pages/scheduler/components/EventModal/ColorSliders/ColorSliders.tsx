import { useState } from 'react';
import {
  hexToHsl,
  hslToHex,
  withAlpha,
  MIN_EVENT_ALPHA,
  MAX_EVENT_ALPHA,
} from '@/theme/colorUtils';
import { ToggleBtn, Panel, Row, Label, Slider } from './ColorSliders.styled';

interface Props {
  /** 현재 고른 색. 기본을 고른 상태면 테마 포인트 색이 들어온다 */
  color: string;
  alpha: number;
  onChange: (color: string, alpha: number) => void;
}

const STEPS = 12;

/** 채도·밝기 트랙은 실제로 만들어지는 색을 여러 점 찍어 그린다 */
const gradient = (make: (t: number) => string) => {
  const stops = Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS;
    return `${make(t)} ${Math.round(t * 100)}%`;
  });
  return `linear-gradient(to right, ${stops.join(', ')})`;
};

const HUE_TRACK = gradient(t => `hsl(${Math.round(t * 360)}, 100%, 50%)`);

export const ColorSliders = ({ color, alpha, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const { h, s, l } = hexToHsl(color);

  const setHsl = (next: { h?: number; s?: number; l?: number }) =>
    onChange(hslToHex(next.h ?? h, next.s ?? s, next.l ?? l), alpha);

  return (
    <>
      <ToggleBtn type="button" onClick={() => setOpen(v => !v)}>
        {open ? '−' : '+'} 직접 지정
      </ToggleBtn>

      {open && (
        <Panel>
          <Row>
            <Label>색상</Label>
            <Slider
              type="range"
              min={0}
              max={360}
              value={h}
              $track={HUE_TRACK}
              onChange={e => setHsl({ h: Number(e.target.value) })}
            />
          </Row>

          <Row>
            <Label>채도</Label>
            <Slider
              type="range"
              min={0}
              max={100}
              value={s}
              $track={gradient(t => hslToHex(h, t * 100, l))}
              onChange={e => setHsl({ s: Number(e.target.value) })}
            />
          </Row>

          <Row>
            <Label>밝기</Label>
            <Slider
              type="range"
              min={0}
              max={100}
              value={l}
              $track={gradient(t => hslToHex(h, s, t * 100))}
              onChange={e => setHsl({ l: Number(e.target.value) })}
            />
          </Row>

          <Row>
            <Label>농도</Label>
            <Slider
              type="range"
              min={MIN_EVENT_ALPHA * 100}
              max={MAX_EVENT_ALPHA * 100}
              value={Math.round(alpha * 100)}
              $track={gradient(t =>
                withAlpha(color, MIN_EVENT_ALPHA + t * (MAX_EVENT_ALPHA - MIN_EVENT_ALPHA)),
              )}
              onChange={e => onChange(color, Number(e.target.value) / 100)}
            />
          </Row>
        </Panel>
      )}
    </>
  );
};
