import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "AI Closet team";
pptx.subject = "DevFest GDG Japan Hackathon 2026 pitch";
pptx.title = "AI Closet | 3分ピッチ";
pptx.company = "AI Closet";
pptx.lang = "ja-JP";
pptx.theme = {
  headFontFace: "Hiragino Sans",
  bodyFontFace: "Hiragino Sans",
  lang: "ja-JP",
};
pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
pptx.layout = "WIDE";

const C = { purple: "6D4AFF", dark: "221C3D", ink: "24202E", muted: "716B80", pale: "F5F2FF", white: "FFFFFF", line: "E8E3F3", green: "6ABF8D", yellow: "FFD45B" };
const W = 13.333;
const H = 7.5;
const FONT = "Hiragino Sans";

function text(slide, value, x, y, w, h, opt = {}) {
  slide.addText(value, { x, y, w, h, fontFace: FONT, color: C.ink, margin: 0, breakLine: false, fit: "shrink", ...opt });
}
function rect(slide, x, y, w, h, color, radius = 0.12, line = color) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: radius, fill: { color }, line: { color: line, transparency: 100 } });
}
function tag(slide, label, x, y, w = 1.1) {
  rect(slide, x, y, w, 0.33, C.pale);
  text(slide, label, x, y + 0.07, w, 0.16, { fontSize: 8, bold: true, color: C.purple, align: "center" });
}
function header(slide, n, kicker, title) {
  text(slide, String(n).padStart(2, "0"), 0.55, 0.4, 0.44, 0.24, { fontSize: 11, bold: true, color: C.purple });
  text(slide, kicker.toUpperCase(), 1.08, 0.41, 2.3, 0.2, { fontSize: 8.5, charSpacing: 1.6, bold: true, color: C.muted });
  text(slide, title, 0.55, 0.9, 12.1, 0.78, { fontSize: 29, bold: true, color: C.dark, breakLine: false });
  slide.addShape(pptx.ShapeType.line, { x: 0.55, y: 1.83, w: 12.23, h: 0, line: { color: C.line, width: 1 } });
}
function footer(slide) {
  text(slide, "AI CLOSET", 0.55, 7.06, 1.3, 0.15, { fontSize: 7.5, bold: true, color: C.purple, charSpacing: 1.1 });
  text(slide, "DevFest GDG Japan Hackathon 2026", 9.65, 7.06, 3.15, 0.15, { fontSize: 7.5, color: C.muted, align: "right" });
}
function phone(slide, x, y, title, body, accent = C.purple) {
  rect(slide, x, y, 2.18, 3.76, C.dark, 0.25);
  rect(slide, x + 0.1, y + 0.16, 1.98, 3.45, C.white, 0.18);
  rect(slide, x + 0.72, y + 0.06, 0.74, 0.08, "080714", 0.04);
  text(slide, title, x + 0.28, y + 0.48, 1.62, 0.22, { fontSize: 10.5, bold: true, color: C.dark, align: "center" });
  rect(slide, x + 0.27, y + 0.88, 1.64, 1.13, C.pale, 0.14);
  slide.addShape(pptx.ShapeType.arc, { x: x + 0.65, y: y + 1.08, w: 0.9, h: 0.65, adjustPoint: 0.45, line: { color: accent, width: 3 }, rotate: 205 });
  text(slide, body, x + 0.28, y + 2.26, 1.62, 0.62, { fontSize: 8.5, color: C.muted, valign: "mid", align: "center", breakLine: false });
  rect(slide, x + 0.31, y + 3.1, 1.55, 0.27, accent, 0.12);
  text(slide, "確認して記録", x + 0.31, y + 3.18, 1.55, 0.1, { fontSize: 7.5, bold: true, color: C.white, align: "center" });
}

// 1
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  tag(s, "CREATIVE", 0.65, 0.75, 1.12);
  text(s, "AI Closet", 0.65, 1.4, 6.4, 0.66, { fontSize: 35, bold: true, color: C.dark });
  text(s, "持っているのに着ていない服を、\nゼロにする。", 0.65, 2.25, 6.4, 1.25, { fontSize: 27, bold: true, color: C.purple, breakLine: false, breakLine: false });
  text(s, "画像解析で、あなたのクローゼットを\n「着るための資産」に変える。", 0.68, 3.8, 5.2, 0.72, { fontSize: 14.5, color: C.muted, breakLine: false });
  rect(s, 7.6, 0, 5.733, H, C.pale, 0);
  phone(s, 9.25, 1.35, "クローゼット", "登録した服を\nいつでも一覧で確認", C.purple);
  text(s, "IMAGE × AI × YOUR STYLE", 0.67, 6.68, 4.3, 0.18, { fontSize: 8.5, color: C.muted, charSpacing: 1.4, bold: true });
}

// 2
{
  const s = pptx.addSlide();
  header(s, 2, "PROBLEM", "服はある。でも、着る服がない。");
  const cards = [
    ["把握できない", "持っている服や\n最近着た服を思い出せない"],
    ["続かない", "コーデ記録は\n手入力が面倒で続かない"],
    ["活かせない", "同じ服に偏り、\n眠っている服に気づけない"],
  ];
  cards.forEach(([h, b], i) => {
    const x = 0.75 + i * 4.15;
    rect(s, x, 2.55, 3.55, 2.55, C.white, 0.18, C.line);
    text(s, `0${i + 1}`, x + 0.28, 2.87, 0.42, 0.22, { fontSize: 11, bold: true, color: C.purple });
    text(s, h, x + 0.28, 3.34, 2.8, 0.36, { fontSize: 19, bold: true, color: C.dark });
    text(s, b, x + 0.28, 4.08, 2.85, 0.55, { fontSize: 12.5, color: C.muted, breakLine: false });
  });
  text(s, "記録されないクローゼットは、ただの“収納”で終わってしまう。", 0.76, 5.8, 11.8, 0.35, { fontSize: 17, bold: true, color: C.purple, align: "center" });
  footer(s);
}

// 3
{
  const s = pptx.addSlide();
  header(s, 3, "SOLUTION", "自撮り1枚。記録は、数タップ。");
  const steps = [
    ["登録", "服を撮って\n自分だけのクローゼットへ"],
    ["記録", "AIが属性を読み取り\n自分の服から候補を提示"],
    ["発見", "カレンダー・統計で\n偏りと未着用服を可視化"],
  ];
  steps.forEach(([h, b], i) => {
    const x = 0.9 + i * 4.15;
    rect(s, x, 2.72, 2.55, 2.25, i === 1 ? C.purple : C.pale, 0.18);
    text(s, String(i + 1), x + 0.22, 2.96, 0.35, 0.26, { fontSize: 12, bold: true, color: i === 1 ? C.white : C.purple });
    text(s, h, x + 0.22, 3.43, 1.9, 0.36, { fontSize: 19, bold: true, color: i === 1 ? C.white : C.dark });
    text(s, b, x + 0.22, 4.07, 2.1, 0.48, { fontSize: 10.5, color: i === 1 ? "EEE9FF" : C.muted, breakLine: false });
    if (i < 2) text(s, "→", x + 2.78, 3.64, 0.62, 0.38, { fontSize: 25, color: C.purple, align: "center" });
  });
  rect(s, 2.3, 5.58, 8.7, 0.65, C.dark, 0.14);
  text(s, "AIは自動確定しない。最後に選ぶのはユーザー。", 2.3, 5.79, 8.7, 0.18, { fontSize: 13, bold: true, color: C.white, align: "center" });
  footer(s);
}

// 4
{
  const s = pptx.addSlide();
  header(s, 4, "CORE EXPERIENCE", "AIが“探す”、人が“選ぶ”。");
  phone(s, 1.05, 2.22, "今日の服を撮影", "自撮りを\n1枚アップロード", C.purple);
  phone(s, 5.55, 2.22, "候補を確認", "カテゴリ・色・種類で\n自分の服を提案", C.green);
  phone(s, 10.05, 2.22, "記録を振り返る", "カレンダーと統計で\n着用傾向を発見", C.yellow);
  text(s, "→", 3.55, 3.78, 1.3, 0.3, { fontSize: 26, color: C.purple, align: "center" });
  text(s, "→", 8.05, 3.78, 1.3, 0.3, { fontSize: 26, color: C.purple, align: "center" });
  footer(s);
}

// 5
{
  const s = pptx.addSlide();
  header(s, 5, "GOOGLE TECHNOLOGY", "個人の服と画像を、安全なAI体験へ。");
  const nodes = [
    ["Next.js", "画面"], ["Firebase\nApp Hosting", "公開"], ["Cloud Run", "API・認可"], ["Vertex AI\nGemini", "服の属性抽出"], ["Cloud SQL", "ログ・統計"], ["Cloud Storage", "画像保管"],
  ];
  nodes.forEach(([h, b], i) => {
    const x = 0.65 + i * 2.1;
    rect(s, x, 2.75, 1.73, 1.24, i === 3 ? C.purple : C.pale, 0.15);
    text(s, h, x + 0.13, 3.04, 1.47, 0.38, { fontSize: 12, bold: true, color: i === 3 ? C.white : C.dark, align: "center", breakLine: false });
    text(s, b, x + 0.13, 3.55, 1.47, 0.16, { fontSize: 8.5, color: i === 3 ? "EEE9FF" : C.muted, align: "center" });
    if (i < nodes.length - 1) text(s, "→", x + 1.74, 3.21, 0.34, 0.2, { fontSize: 13, color: C.purple, align: "center" });
  });
  const notes = ["Geminiは構造化出力で服の属性を抽出", "AI出力はサーバー側で検証", "画像・データはユーザー単位で分離"];
  notes.forEach((n, i) => {
    rect(s, 1.35 + i * 3.72, 4.8, 3.1, 0.58, C.white, 0.12, C.line);
    text(s, n, 1.5 + i * 3.72, 5.01, 2.8, 0.15, { fontSize: 9.4, color: C.muted, align: "center" });
  });
  footer(s);
}

// 6
{
  const s = pptx.addSlide();
  s.background = { color: C.dark };
  tag(s, "AI CLOSET", 0.68, 0.7, 1.1);
  text(s, "服を“所有”から\n“活用”へ。", 0.68, 1.55, 7.2, 1.35, { fontSize: 34, bold: true, color: C.white, breakLine: false });
  text(s, "毎朝の「何を着る？」を減らし、\n自分らしい表現を増やす。", 0.7, 3.35, 5.7, 0.7, { fontSize: 15.5, color: "CFC8E8", breakLine: false });
  const bullets = ["毎朝の迷いを減らす", "自分の表現の幅を広げる", "眠っている服を活かす"];
  bullets.forEach((b, i) => {
    rect(s, 7.65, 1.52 + i * 1.08, 4.9, 0.75, "302850", 0.14);
    text(s, "✓", 7.96, 1.75 + i * 1.08, 0.27, 0.18, { fontSize: 13, bold: true, color: C.yellow });
    text(s, b, 8.45, 1.77 + i * 1.08, 3.75, 0.18, { fontSize: 13, bold: true, color: C.white });
  });
  text(s, "Wear what you already love.", 0.7, 6.48, 4.7, 0.2, { fontSize: 11.5, bold: true, color: C.yellow, charSpacing: 0.6 });
}

await pptx.writeFile({ fileName: "docs/AI_Closet_3min_pitch.pptx" });
