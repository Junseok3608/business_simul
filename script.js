// ==========================================
// 🛠️ 🚀 향후 확장 데이터 통로 (Data Pipeline Insertion)
// ==========================================
// 세종한국어 비즈니스 교재 데이터나 특정 화용론 기준을 외부 로드할 통로입니다.
// 나중에 외부 데이터(JSON 등)가 준비되면 이 객체 구조에 매핑하거나 fetch 함수를 활성화하면 됩니다.
let externalPragmaticCriteria = {
  source: "내장 알고리즘 규칙 기본값",
  version: "1.0.0",
  sejongCoreReferences: {}, // 향후 세종학당 비즈니스 교재 가이드를 넣을 공간
  customHedgeDatabase: [], // 향후 보완 요구용 완화 어휘집을 연동할 공간
};

/**
 * [💡 데이터 확장 통로 함수]
 * 추후 외부 텍스트 파일이나 JSON을 연동하고 싶을 때 이 함수의 주석을 해제하고 경로만 지정하세요.
 */
async function loadExternalSejongData() {
  try {
    // 예: const response = await fetch('https://yourgit.github.io/data/sejong_business.json');
    // externalPragmaticCriteria = await response.json();
    console.log("외부 데이터 파이프라인 연동 정상 작동 중:", externalPragmaticCriteria.source);
  } catch (error) {
    console.error("데이터 로드 실패 (현재는 내장 데이터 사용):", error);
  }
}

// 앱 시작 시 데이터 로더 통로 실행
window.onload = function () {
  loadExternalSejongData();
};

// ==========================================
// 📱 UI 제어 및 프로그레스 바 로직
// ==========================================
const totalSteps = 6;

function nextPage(step) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  document.getElementById(`page${step}`).classList.add("active");

  if (step >= 2 && step <= 6) {
    const percentage = ((step - 1) / totalSteps) * 100;
    document.getElementById("progressFill").style.width = `${percentage}%`;
  } else {
    document.getElementById("progressFill").style.width = "0%";
  }
}

function updateCharCount() {
  const text = document.getElementById("taskText").value;
  document.getElementById("charCount").innerText = `(${text.length} / 200자)`;
}

// ==========================================
// ⏳ 인공지능 연산 시뮬레이션 (15초 딜레이)
// ==========================================
function startLoading() {
  nextPage(7);
  const messages = [
    "입력하신 사회언어학적 변수와 직무 과업을 스캐닝하고 있습니다...",
    "BROKE 프레임워크 규격에 맞추어 지시문 구조를 패키징하고 있습니다...",
    "설정된 분면에 최적화된 화용론적 채점 필터를 주입하고 있습니다...",
  ];

  let msgIndex = 0;
  const msgInterval = setInterval(() => {
    msgIndex++;
    if (msgIndex < messages.length) {
      document.getElementById("loadingMessage").innerText = messages[msgIndex];
    }
  }, 5000);

  setTimeout(() => {
    clearInterval(msgInterval);
    generatePrompt();
    nextPage(8);
  }, 15000); // 15초 의도적 심리 딜레이
}

// ==========================================
// 🧠 마스터 프롬프트 생성 알고리즘 (BROKE 맵핑)
// ==========================================
function generatePrompt() {
  const p = document.getElementById("paramP").value;
  const d = document.getElementById("paramD").value;
  const medium = document.getElementById("paramMedium").value;
  const r = document.getElementById("paramR").value;
  const task = document.getElementById("taskText").value || "비즈니스 요청 화행 수행";

  // 사회언어학적 의미 변환
  const pText = p === "+P" ? "나보다 직급이 높은 상사(위계적 격차 존재)" : "나와 직급이 수평적이거나 부하인 관계";
  const dText = d === "+D" ? "사회적 거리가 멀고 아직 서먹하여 격식이 필수적인 관계" : "심리적 거리가 가깝고 친밀한 관계";
  const rText = r === "+R" ? "상대방에게 상당한 기회비용과 수고를 요구하는 고부담 상황" : "일상적인 절차에 속하는 저부담 상황";

  // 💡 [확장성 어필] 향후 로드될 외부 가이드를 프롬프트 메타 정보에 기록
  const dataSourceLabel = externalPragmaticCriteria.source;

  const promptTemplate = `[Background & Role]
당신은 한국 대기업에서 10년 이상 근무하며 수많은 외국인 직원과 유학생들의 직무 지도를 담당해 온 조직 관리 전문가이자 비즈니스 한국어 화용론 코치입니다. 당신은 철저히 중립적이고 전문적인 어조를 유지하며, 학습자의 문법적 오류는 교정 대상에서 제외하고, 오직 한국의 사내 조직 문화와 위계질서에 따른 '사회언어학적 화용적 적절성'만을 정밀하게 평가해야 합니다.

[Context Parameter Mapping]
현재 대화가 진행되는 사회언어학적 맥락 조건은 시스템에 의해 다음과 같이 강제 설정되었습니다. 당신은 이 매트릭스 제약 조건을 100% 준수하여 채점 및 발화해야 합니다.
- 채점 엔진 가이드 출처: ${dataSourceLabel}
- 소통 매체: ${medium}
- 권력 관계 (P): ${p} (${pText})
- 사회적 거리 (D): ${d} (${dText})
- 과업 부담도 (R): ${r} (${rText})

[Objective]
학습자가 해결해야 하는 구체적인 직무 요청 과업 상황은 다음과 같습니다: "${task}". 이 조건 하에서, 먼저 설정된 페르소나에 맞춰 대화를 시작하는 첫 발화를 던지십시오. 학습자가 답장을 입력하면 시뮬레이션을 구동하십시오.

[Key Results]
학습자가 발화를 입력하면, 당신은 절대 혼자 주절주절 길게 답하지 말고 반드시 이하의 구조화된 형식으로만 즉각 답변을 출력하십시오.
1. [선택 맥락 확인]: 현재 설정된 매체, P, D, R 변수 상태 요약.
2. [원어민 직장인의 실제 반응]: 해당 역학 관계에 놓인 한국인 직장인이 학습자의 요청을 읽거나 들었을 때 속으로 느낄 '날것의 심리적 반응 및 표면적 대사' 재현.
3. [화용론적 가감(加減) 채점]: 
   - 가산점(➕): 맥락에 맞는 화용적 완화 표지(Hedge), 관례적 간접화행 사용 분석.
   - 감산점(➖): 체면 위협(FTA)을 유발한 직접 명령형 어미, 매체 정합성 위배 지적.
   - 최종 화용 점수: 5점 만점 척도로 산출.

[Evolve]
학습자의 대화 초안이 화용론적 결례로 인해 감점을 받았을 경우, 단번에 정답 문장을 완벽하게 제공하여 상황극을 종료하지 마십시오. 해당 맥락의 정중성 임계치를 통과할 수 있는 '어휘적 에어백(힌트)'만을 단계적으로 제공하며 발화를 반려하고, 학습자가 스스로 문장을 수정(Iterative Refinement)해 오도록 유도하십시오.`;

  document.getElementById("promptResult").innerText = promptTemplate;
}

// ==========================================
// 📋 원클릭 클립보드 복사 및 리셋
// ==========================================
function copyPrompt() {
  const promptText = document.getElementById("promptResult").innerText;
  navigator.clipboard
    .writeText(promptText)
    .then(() => {
      alert("프롬프트가 클립보드에 성공적으로 복사되었습니다! ChatGPT나 Gemini에 붙여넣으세요.");
    })
    .catch((err) => {
      alert("복사 실패: 텍스트를 드래그하여 직접 복사해 주세요.");
    });
}

function resetAll() {
  document.getElementById("taskText").value = "";
  document.getElementById("charCount").innerText = "(0 / 200자)";
  document.getElementById("loadingMessage").innerText = "입력하신 사회언어학적 가감 변수와 직무 과업을 스캐닝하고 있습니다...";
  nextPage(1);
}
