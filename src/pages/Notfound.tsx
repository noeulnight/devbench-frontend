import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Notfound() {
  const navigate = useNavigate();

  return (
    <Layout>
      <h1 className="text-3xl font-bold">아 여기는 어디죠?</h1>
      <p className="text-sm text-gray-400 whitespace-pre-line mt-2">
        길을 잘못 들었다는 사실을 깨닫는 순간, 처음에는 당황스러움과 후회가
        밀려오지만, 이내 그것이 단순한 실수가 아니라 새로운 길을 발견할 기회일
        수도 있다는 생각이 스며들며, 발걸음을 돌릴지 아니면 계속 나아갈지
        고민하는 동안에도 세상은 여전히 움직이고, 지나온 길 위에 남긴 발자국들은
        지워지지 않은 채로 남아 있으며, 때로는 그 길이 예상치 못한 풍경과
        사람들을 만나게 해주어 결국에는 잘못된 길이 아니라 색다른 경험을
        선사하는 여정이 될 수도 있다는 것을 깨닫게 되는 순간, 우리는 비로소 길을
        잃는다는 것이 반드시 나쁜 것만은 아니라는 점을 이해하게 되며, 설령 길을
        잘못 들었다 하더라도 그것이 전혀 무의미한 선택은 아니었으며, 한순간의
        착오가 인생 전체를 뒤흔드는 실수가 아니라 작은 변곡점이 될 수도 있다는
        것을 깨달으며, 결국 우리의 삶은 완벽한 계획 속에서만 이루어지는 것이
        아니라 수많은 우연과 선택 속에서 의미를 찾아가는 과정이라는 점을
        인정하게 되고, 그렇게 길을 잘못 든 경험조차도 언젠가는 소중한 기억으로
        남아 결국에는 후회보다는 배움을 남기게 되며, 모든 길이 반드시 정답을
        향해 있어야 하는 것은 아니고, 때로는 예상과 다른 길이 더 가치 있는
        이야기를 만들어 낼 수도 있기에, 지금 비록 길을 잘못 들었다고 느낀다 해도
        그것이 어쩌면 새로운 시작을 위한 계기가 될 수도 있으며, 그렇게 우리는
        길을 잘못 들었을 때조차도 새로운 가능성을 발견하며 살아가야 한다는 것을
        깨닫게 된다.
      </p>
      <button
        onClick={() => navigate("/")}
        className="text-sm text-white mt-4 hover:underline cursor-pointer"
      >
        집으로 돌아가기
      </button>
    </Layout>
  );
}
