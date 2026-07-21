import { useEffect, useRef, useState } from 'react';
import { GearIcon } from '@scheduler/icons';
import {
  Wrap,
  GearBtn,
  Popover,
  Head,
  Title,
  CloseBtn,
  Row,
  Label,
  Switch,
} from './SettingsPopover.styled';

interface Props {
  fs: number;
  showWeekend: boolean;
  onChangeShowWeekend: (value: boolean) => void;
}

export const SettingsPopover = ({ fs, showWeekend, onChangeShowWeekend }: Props) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭이나 Esc로 닫는다
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <Wrap ref={wrapRef}>
      <GearBtn $fs={fs} $on={open} onClick={() => setOpen(v => !v)} title="설정">
        <GearIcon />
      </GearBtn>

      {open && (
        <Popover $fs={fs}>
          <Head $fs={fs}>
            <Title $fs={fs}>설정</Title>
            <CloseBtn $fs={fs} onClick={() => setOpen(false)} title="닫기">×</CloseBtn>
          </Head>
          <Row $fs={fs}>
            <Label $fs={fs}>주말 표시</Label>
            <Switch $fs={fs} $on={showWeekend} onClick={() => onChangeShowWeekend(!showWeekend)} />
          </Row>
        </Popover>
      )}
    </Wrap>
  );
};
