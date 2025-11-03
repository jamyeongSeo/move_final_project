import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const loginIdState = atom({
  key: "loginIdState",
  default: "",
  effects_UNSTABLE: [persistAtom], //새로고침해도 기본 정보 저장
});

const memberLevelState = atom({
  key: "memberLevelState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

//refresh 초기화 확인용 데이터
const authReadyState = atom({
  key: "authReadyState",
  default: false,
});

const isLoginState = selector({
  key: "isLoginState",
  get: (state) => {
    //state는 recoil에 저장된 데이터를 불러오기위한 객체
    const loginId = state.get(loginIdState);
    const memberLevel = state.get(memberLevelState);
    return loginId !== "" && memberLevel !== 0;
  },
});

//신고된 회원의 정지일 수를 저장하는 저장소
const suspendDaysState = atom({
  key : "suspendDays",
  default: "",
  effects_UNSTABLE:[persistAtom],
});

//회원이 정지되어있는지 확인
const isSuspended = selector({
  key:"isSuspended",
  default: false,
  get:(state) => {
    const loginId = state.get(loginIdState);
    const suspendDays = state.get(suspendDaysState);
    return loginId !== "" && suspendDays !== "";
  },
});

export { loginIdState, memberLevelState, isLoginState, authReadyState, isSuspended };
