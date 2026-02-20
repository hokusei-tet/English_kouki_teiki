<script>
    let currentLesson = "";
    let currentMode = "en-jp"; // デフォルトは英→日

    function openLesson(lessonId) {
      currentLesson = lessonId;
      document.getElementById("lesson-list").classList.remove("visible");
      document.getElementById(lessonId + "-part-list").classList.add("visible");
    }

    function showContent(partId, mode) {
      document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
      const container = document.getElementById(partId + "-content");
      container.classList.add("visible");

      const wordCard = container.querySelector('.word-card');
      const mainText = container.querySelector('.main-text');

      if (mode === 'word') {
        wordCard.classList.add('active');
        mainText.style.display = 'none';
        document.getElementById("toggle-buttons").style.display = "flex";
        document.getElementById("toggleEnglish").style.display = "none";
        document.getElementById("toggleJapanese").style.display = "none";
        setWordMode('en-jp'); // 単語を開くときは英→日にリセット
      } else {
        wordCard.classList.remove('active');
        mainText.style.display = 'block';
        document.getElementById("toggle-buttons").style.display = "flex";
        document.getElementById("toggleEnglish").style.display = "block";
        document.getElementById("toggleJapanese").style.display = "block";
      }
      resetToggles();
    }

    // 単語モード切り替え（修正版）
function setWordMode(mode) {
  currentMode = mode;
  
  // ボタンの見た目を切り替え
  const btns = document.querySelectorAll('.mode-btn');
  btns.forEach(btn => {
    btn.classList.toggle('active', btn.innerText.includes(mode === 'en-jp' ? '英 → 日' : '日 → 英'));
  });

  // 【重要】現在表示されている(visible)コンテンツ内の単語カードだけを探す
  const activeContainer = document.querySelector('.content-container.visible');
  if (!activeContainer) return;
  
  const activeCard = activeContainer.querySelector('.word-card');
  if (!activeCard) return;

  const rows = activeCard.querySelectorAll('tr');
  rows.forEach(row => {
    const engSpan = row.querySelector('.word-eng-text');
    const jpnSpan = row.querySelector('.word-jp-text');

    if (mode === 'en-jp') {
        // 英→日：英語は見せる、日本語は隠す
        engSpan.classList.remove('mask', 'hidden');
        engSpan.onclick = null;
        jpnSpan.classList.add('mask', 'hidden');
        jpnSpan.onclick = function() { this.classList.toggle('hidden'); };
    } else {
        // 日→英：日本語は見せる、英語は隠す
        jpnSpan.classList.remove('mask', 'hidden');
        jpnSpan.onclick = null;
        engSpan.classList.add('mask', 'hidden');
        engSpan.onclick = function() { this.classList.toggle('hidden'); };
    }
  });
}

    function goBackToParts() {
      document.querySelectorAll('.content-container').forEach(s => s.classList.remove('visible'));
      document.getElementById(currentLesson + "-part-list").classList.add("visible");
      document.getElementById("toggle-buttons").style.display = "none";
    }

    function goBackToLessons() {
      document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
      document.getElementById("lesson-list").classList.add("visible");
    }

    const engBtn = document.getElementById("toggleEnglish");
    const jpnBtn = document.getElementById("toggleJapanese");

    function resetToggles() {
      engBtn.classList.remove("active");
      jpnBtn.classList.remove("active");
      document.querySelectorAll(".english, .japanese").forEach(el => el.style.display = "none");
    }

    engBtn.onclick = function() {
      const activeContent = document.querySelector(".content-container.visible");
      const isVisible = engBtn.classList.toggle("active");
      activeContent.querySelectorAll(".english").forEach(el => el.style.display = isVisible ? "block" : "none");
    };

    jpnBtn.onclick = function() {
      const activeContent = document.querySelector(".content-container.visible");
      const isVisible = jpnBtn.classList.toggle("active");
      activeContent.querySelectorAll(".japanese").forEach(el => el.style.display = isVisible ? "block" : "none");
    };
  </script>
