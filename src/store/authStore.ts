import { create } from 'zustand';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';

const keyCacheName = (uid: string) => `widget-ksj:widgetKey:${uid}`;

/** 128비트 무작위. 위젯 URL에 실려 사실상 비밀번호 역할을 하므로 추측 불가능해야 한다 */
const generateWidgetKey = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/** 계정에 묶인 고유키를 가져온다. 없으면 새로 발급해 저장한다 */
const fetchWidgetKey = async (uid: string) => {
  try {
    const cached = localStorage.getItem(keyCacheName(uid));
    if (cached) return cached;
  } catch {
    // 저장소가 막혀 있어도 아래에서 Firestore로 조회한다
  }

  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);

  let key: string;
  if (snap.exists()) {
    key = snap.data().widgetKey as string;
  } else {
    key = generateWidgetKey();
    await setDoc(ref, { widgetKey: key, createdAt: new Date().toISOString() });
  }

  try {
    localStorage.setItem(keyCacheName(uid), key);
  } catch {
    // 캐시는 없어도 동작에 지장이 없다
  }
  return key;
};

/** 대부분의 실패는 일시적인 네트워크 문제라 짧게 재시도한다 */
const ensureWidgetKey = async (uid: string) => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await fetchWidgetKey(uid);
    } catch (err) {
      lastError = err;
      if (attempt < 3) await wait(1000);
    }
  }

  console.warn('[scheduler] 고유키 조회 실패', lastError);
  throw lastError;
};

interface AuthState {
  user: User | null;
  widgetKey: string | null;
  /** 로그인은 됐지만 고유키를 못 가져온 상태. 잘못된 URL 복사를 막는 데 쓴다 */
  keyError: boolean;
  /** 최초 로그인 상태 확인이 끝나기 전까지 true */
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(() => ({
  user: null,
  widgetKey: null,
  keyError: false,
  loading: true,

  signIn: async () => {
    await signInWithPopup(auth, googleProvider);
    // 이후 상태 반영은 onAuthStateChanged가 맡는다
  },

  signOut: async () => {
    await firebaseSignOut(auth);
  },
}));

// Firebase Auth가 로그인 상태를 자체적으로 유지하므로, 재방문 시 여기서 복원된다
onAuthStateChanged(auth, async user => {
  if (!user) {
    useAuthStore.setState({ user: null, widgetKey: null, keyError: false, loading: false });
    return;
  }

  useAuthStore.setState({ user, keyError: false, loading: false });

  try {
    const key = await ensureWidgetKey(user.uid);
    useAuthStore.setState({ widgetKey: key, keyError: false });
  } catch {
    // 조용히 넘어가면 키 없는 URL이 복사되므로 화면에 알린다
    useAuthStore.setState({ widgetKey: null, keyError: true });
  }
});
