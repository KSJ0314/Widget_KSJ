import { Badge } from './LocalBadge.styled';

interface Props {
  fs: number;
}

/** 고유키 없이 이 브라우저에만 저장되는 상태임을 알린다 */
export const LocalBadge = ({ fs }: Props) => (
  <Badge
    $fs={fs}
    data-tooltip="여기에만 저장됩니다. 로그인하면 어디서나 같은 일정을 볼 수 있습니다"
  >
    LOCAL
  </Badge>
);
