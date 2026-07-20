/**
 * 6주 42칸. 전달 끝·다음달 앞도 실제 Date로 만들어 일정을 똑같이 조회한다.
 * 월간 위젯과 날짜 선택 달력이 함께 쓴다.
 */
export const buildCells = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(year, month, i - firstDay + 1);
    return { date, isCurrentMonth: date.getMonth() === month };
  });
};
