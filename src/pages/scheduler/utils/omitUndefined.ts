/**
 * Firestore는 undefined 값을 거부한다(Unsupported field value: undefined).
 * 종료일·시간처럼 선택 항목이 비어 있으면 키 자체를 빼서 보낸다.
 */
export const omitUndefined = <T extends object>(value: T): T =>
  Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined)) as T;
