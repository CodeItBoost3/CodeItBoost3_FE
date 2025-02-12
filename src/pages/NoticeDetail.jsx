import {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import dayjs from "dayjs";

import Title from "@/components/notice/Title.jsx";
import SearchBars from "@/components/notice/SearchBars.jsx";
import SquareButton from "@/components/common/SearchButton.jsx";

import EyesIcon from '@/assets/icon/notice/eyes.svg';
import CalendarIcon from '@/assets/icon/notice/calendar.svg';

const noticeDetailData = [
  {
    id: 11,
    title: "서비스 긴급 점검 완료 공지",
    createdAt: "2025-01-30",
    view: 56,
    content: "안녕하세요. 서비스 운영팀입니다.\n\n지난 1월 30일 진행된 긴급 점검이 성공적으로 완료되었음을 안내드립니다. 예상치 못한 시스템 장애로 인해 서비스가 일시적으로 중단되는 상황이 발생하였으며, 신속한 조치를 위해 긴급 점검을 진행하였습니다.\n\n점검 과정에서 데이터 안정성과 보안을 더욱 강화하였으며, 서버 최적화를 통해 성능 향상을 이루었습니다. 앞으로도 안정적인 서비스 제공을 최우선으로 고려하여 지속적인 모니터링과 개선 작업을 진행하겠습니다.\n\n이용에 불편을 드려 죄송하며, 앞으로도 많은 관심과 이용 부탁드립니다. 감사합니다."
  },
  {
    id: 12,
    title: "출석 체크 이벤트 안내",
    createdAt: "2025-01-29",
    view: 64,
    content: "안녕하세요! 많은 분들이 기다려온 출석 체크 이벤트가 시작됩니다.\n\n매일 로그인하고 출석을 체크하면 푸짐한 보상을 받을 수 있는 기회가 제공됩니다. 이번 이벤트에서는 기존보다 더욱 다양한 혜택을 준비하였으며, 출석 일수에 따라 차등 지급되는 특별 보너스도 마련되었습니다.\n\n예를 들어, 7일 연속 출석 시 추가 포인트가 지급되며, 14일과 30일 출석을 완료하면 특별한 경품 추첨권을 받을 수 있습니다. 출석 체크 방법은 간단합니다. 앱 내 ‘출석 체크’ 페이지에서 버튼을 눌러 출석을 기록하면 자동으로 참여됩니다.\n\n많은 관심과 참여 부탁드립니다!"
  },
  {
    id: 13,
    title: "커뮤니티 가이드라인 업데이트",
    createdAt: "2025-01-28",
    view: 15,
    content: "안녕하세요, 운영팀입니다.\n\n원활한 커뮤니티 운영과 건전한 소통을 위해 커뮤니티 가이드라인이 새롭게 업데이트되었습니다. 이번 업데이트에서는 불건전한 게시물에 대한 신고 기준을 강화하고, 허위 정보 및 광고성 게시물에 대한 제재를 보다 명확하게 조정하였습니다.\n\n보다 안전하고 쾌적한 커뮤니티 환경을 만들기 위해 최선을 다하겠습니다. 업데이트된 가이드라인에 대한 자세한 내용은 공지사항에서 확인해 주세요. 감사합니다."
  },
  {
    id: 14,
    title: "고객센터 운영 시간 변경",
    createdAt: "2025-01-27",
    view: 29,
    content: "안녕하세요. 고객센터 운영 시간 변경에 대한 안내드립니다.\n\n보다 나은 상담 서비스를 제공하기 위해 기존 오전 9시~오후 6시 운영에서 오전 10시~오후 7시로 변경됩니다. 이번 조정은 고객 응대의 질을 높이고 상담 효율성을 극대화하기 위한 결정이며, 점심시간(오후 12시~1시)은 그대로 유지됩니다.\n\n변경된 운영 시간을 참고하시어 서비스 이용에 불편이 없으시길 바라며, 앞으로도 더욱 원활한 고객 지원을 제공할 수 있도록 노력하겠습니다. 감사합니다."
  },
  {
    id: 15,
    title: "보안 강화 업데이트 안내",
    createdAt: "2025-01-26",
    view: 77,
    content: "안녕하세요, 보안팀입니다.\n\n사용자 여러분의 계정과 개인정보를 더욱 안전하게 보호하기 위해 보안 강화 업데이트를 실시하였습니다. 이번 업데이트에서는 로그인 보안 강화를 위해 2단계 인증 기능을 추가하고, 자동 로그인 시 추가적인 보안 절차를 도입하였습니다.\n\n앞으로도 더욱 강력한 보안 시스템을 구축하여 안전한 서비스 환경을 제공할 수 있도록 노력하겠습니다. 감사합니다."
  },
  {
    id: 16,
    title: "설 연휴 배송 일정 안내",
    createdAt: "2025-01-25",
    view: 85,
    content: "안녕하세요, 고객 여러분.\n\n설 연휴를 맞이하여 배송 일정에 대한 안내드립니다. 연휴 기간에는 물류센터와 배송업체의 운영이 제한됨에 따라 일부 지역에서는 배송이 지연될 수 있습니다. 이에 따라 원활한 배송을 위해 미리 주문해 주실 것을 권장드립니다.\n\n정확한 배송 일정은 주문 페이지에서 확인 가능하며, 연휴 이후에도 빠른 배송을 위해 최선을 다하겠습니다. 감사합니다."
  },
  {
    id: 17,
    title: "이용자 만족도 조사 참여 안내",
    createdAt: "2025-01-24",
    view: 34,
    content: "안녕하세요, 서비스 운영팀입니다.\n\n더 나은 서비스를 제공하기 위해 이용자 만족도 조사를 실시합니다. 본 조사는 서비스 이용 경험과 개선점을 파악하여 향후 서비스 품질 향상에 반영하기 위한 목적으로 진행됩니다.\n\n설문에 참여하신 분들께는 소정의 리워드를 제공해 드릴 예정이니 많은 참여 부탁드립니다. 감사합니다."
  },
  {
    id: 18,
    title: "추천 친구 이벤트 시작",
    createdAt: "2025-01-23",
    view: 21,
    content: "안녕하세요!\n\n친구를 초대하고 함께 혜택을 누리는 추천 친구 이벤트가 시작됩니다. 추천을 받은 친구가 처음 가입하고 이벤트 참여 조건을 충족하면 추천인과 신규 가입자 모두에게 특별한 보상을 드립니다.\n\n이벤트 기간 동안 추천할 수 있는 친구의 수에는 제한이 없으며, 추천 횟수가 많을수록 더욱 다양한 혜택을 받을 수 있습니다. 자세한 내용은 이벤트 페이지에서 확인해 주세요!"
  },
  {
    id: 19,
    title: "앱 다운로드 10만 돌파 이벤트",
    createdAt: "2025-01-22",
    view: 100,
    content: "여러분의 성원 덕분에 앱 다운로드 10만 돌파를 달성했습니다!\n\n이를 기념하여 특별한 이벤트를 준비했습니다. 참여자들에게 다양한 경품을 제공하며, 기간 한정으로 특별 혜택도 제공될 예정입니다.\n\n자세한 내용과 참여 방법은 이벤트 페이지를 통해 확인해 주세요. 많은 관심과 참여 부탁드립니다!"
  },
  {
    id: 20,
    title: "이용 후기 작성 이벤트 안내",
    createdAt: "2025-01-21",
    view: 45,
    content: "안녕하세요, 서비스 운영팀입니다.\n\n더 나은 서비스를 제공하기 위해 이용 후기 작성 이벤트를 진행합니다. 이벤트 기간 동안 후기 작성 시 추첨을 통해 특별한 보상을 드리며, 성실한 후기를 작성하신 분들에게는 추가 혜택도 제공됩니다.\n\n자세한 참여 방법은 이벤트 페이지에서 확인해 주세요. 많은 관심과 참여 부탁드립니다!"
  }
];


export default function NoticeDetail() {
  const navigate = useNavigate();
  const id = Number(useParams().noticeId);
  const data = noticeDetailData.find(item => item.id === id);

  const [search, setSearch] = useState("");

  const handleSearch = () => {
  }

  const handleGotoList = () => {
    navigate('/notice');
  }

  const convertDateData = (data) => {
    return dayjs(data).format("YY.MM.DD");
  }

  return (
      <div className="w-[95%] h-full pt-3 pb-7 overflow-auto">
        <Title
            title={"조각집"}
            subtitle={"공지사항"}
        />
        <SearchBars
            value={search}
            onChange={e => setSearch(e.target.value)}
            handleSearch={handleSearch}
        />
        <div className="text-black text-xl font-bold mb-6">{data.title}</div>
        <div className="flex items-center gap-5 mb-4">
          <div className="flex items-center gap-1">
            <img src={EyesIcon}/>
            <p className="text-black text-xs font-bold ">{data.view}</p>
          </div>
          <div className="flex items-center gap-1">
            <img src={CalendarIcon}/>
            <p className="text-black text-xs font-bold ">{convertDateData(data.createdAt)}</p>
          </div>
        </div>
        <div className="mb-8 pt-16 pb-16">
          <p className="text-black text-base font-normal whitespace-pre-line">{data.content}</p>
        </div>
        <SquareButton
            name="목록으로"
            onClick={handleGotoList}
        />
      </div>
  )
}