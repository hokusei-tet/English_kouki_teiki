// 1. 表示を切り替えるメイン関数
function showContent(partId, mode) {
  // すべてのセクションを一旦隠す
  document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
  
  // 指定されたコンテンツ（例：l8p1-content）を表示
  const container = document.getElementById(partId + "-content");
  if (container) {
    container.classList.add("visible");
  }

  const wordCard = container?.querySelector('.word-card');
  const mainText = container?.querySelector('.main-text');

  // 単語モードか本文モードかでボタンや表示を調整
  if (mode === 'word') {
    if (wordCard) wordCard.classList.add('active');
    if (mainText) mainText.style.display = 'none';
    document.getElementById("toggle-buttons").style.display = "flex";
    document.getElementById("toggleEnglish").style.display = "none";
    document.getElementById("toggleJapanese").style.display = "none";
  } else {
    if (wordCard) wordCard.classList.remove('active');
    if (mainText) mainText.style.display = 'block';
    document.getElementById("toggle-buttons").style.display = "flex";
    document.getElementById("toggleEnglish").style.display = "block";
    document.getElementById("toggleJapanese").style.display = "block";
  }
}

// 2. ★ここが「戻る」の心臓部★
function goBackToParts() {
  // まず、今見えているコンテンツを全部隠す
  document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
  
  // 「lesson-parts」というIDの画面を表示させる
  const partMenu = document.getElementById("lesson-parts");
  if (partMenu) {
    partMenu.classList.add("visible");
  }

  // 上の切り替えボタン（英文・和訳）を隠す
  document.getElementById("toggle-buttons").style.display = "none";
}

// 3. 英文・和訳の切り替えイベント
window.onload = function() {
  const engBtn = document.getElementById("toggleEnglish");
  const jpnBtn = document.getElementById("toggleJapanese");

  if (engBtn) {
    engBtn.onclick = function() {
      const activeContent = document.querySelector(".content-container.visible");
      const isVisible = engBtn.classList.toggle("active");
      activeContent?.querySelectorAll(".english").forEach(el => el.style.display = isVisible ? "block" : "none");
    };
  }

  if (jpnBtn) {
    jpnBtn.onclick = function() {
      const activeContent = document.querySelector(".content-container.visible");
      const isVisible = jpnBtn.classList.toggle("active");
      activeContent?.querySelectorAll(".japanese").forEach(el => el.style.display = isVisible ? "block" : "none");
    };
  }
};
