let currentMode = "en-jp"; 

// 1. 本文や単語を表示する関数
function showContent(partId, mode) {
  // すべてのセクションを一旦隠す
  document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
  
  // 指定されたパート（l8p1-contentなど）を表示する
  const container = document.getElementById(partId + "-content");
  if (!container) return; // 指定のIDがファイル内にない場合は何もしない
  
  container.classList.add("visible");

  const wordCard = container.querySelector('.word-card');
  const mainText = container.querySelector('.main-text');

  if (mode === 'word') {
    if (wordCard) wordCard.classList.add('active');
    if (mainText) mainText.style.display = 'none';
    document.getElementById("toggle-buttons").style.display = "flex";
    document.getElementById("toggleEnglish").style.display = "none";
    document.getElementById("toggleJapanese").style.display = "none";
    setWordMode('en-jp'); 
  } else {
    if (wordCard) wordCard.classList.remove('active');
    if (mainText) mainText.style.display = 'block';
    document.getElementById("toggle-buttons").style.display = "flex";
    document.getElementById("toggleEnglish").style.display = "block";
    document.getElementById("toggleJapanese").style.display = "block";
  }
  resetToggles();
}

// 2. 単語モード切り替え
function setWordMode(mode) {
  currentMode = mode;
  const activeContainer = document.querySelector('.content-container.visible');
  if (!activeContainer) return;
  
  const activeCard = activeContainer.querySelector('.word-card');
  if (!activeCard) return;

  const rows = activeCard.querySelectorAll('tr');
  rows.forEach(row => {
    const engSpan = row.querySelector('.word-eng-text');
    const jpnSpan = row.querySelector('.word-jp-text');

    if (mode === 'en-jp') {
        engSpan.classList.remove('mask', 'hidden');
        engSpan.onclick = null;
        jpnSpan.classList.add('mask', 'hidden');
        jpnSpan.onclick = function() { this.classList.toggle('hidden'); };
    } else {
        jpnSpan.classList.remove('mask', 'hidden');
        jpnSpan.onclick = null;
        engSpan.classList.add('mask', 'hidden');
        engSpan.onclick = function() { this.classList.toggle('hidden'); };
    }
  });
}

// 3. 各レッスンのパート選択リストに戻るボタン
function goBackToParts() {
  // コンテンツを隠す
  document.querySelectorAll('.content-container').forEach(s => s.classList.remove('visible'));
  
  // 「○○-part-list」というIDを持つ要素を探して表示する
  const partList = document.querySelector('[id$="-part-list"]');
  if (partList) {
    partList.classList.add("visible");
  }
  
  document.getElementById("toggle-buttons").style.display = "none";
}

// 4. トグルの表示状態をリセット
function resetToggles() {
  const engBtn = document.getElementById("toggleEnglish");
  const jpnBtn = document.getElementById("toggleJapanese");
  if (engBtn) engBtn.classList.remove("active");
  if (jpnBtn) jpnBtn.classList.remove("active");
  document.querySelectorAll(".english, .japanese").forEach(el => el.style.display = "none");
}

// 5. ページ読み込み時のイベント設定
window.onload = function() {
  const engBtn = document.getElementById("toggleEnglish");
  const jpnBtn = document.getElementById("toggleJapanese");

  if (engBtn) {
    engBtn.onclick = function() {
      const activeContent = document.querySelector(".content-container.visible");
      const isVisible = engBtn.classList.toggle("active");
      if (activeContent) {
        activeContent.querySelectorAll(".english").forEach(el => el.style.display = isVisible ? "block" : "none");
      }
    };
  }

  if (jpnBtn) {
    jpnBtn.onclick = function() {
      const activeContent = document.querySelector(".content-container.visible");
      const isVisible = jpnBtn.classList.toggle("active");
      if (activeContent) {
        activeContent.querySelectorAll(".japanese").forEach(el => el.style.display = isVisible ? "block" : "none");
      }
    };
  }
};
