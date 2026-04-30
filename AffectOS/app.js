const appEl = document.getElementById("app");
const feedContainer = document.getElementById("feedContainer");
const scrollInteractBtn = document.getElementById("scrollInteractBtn");
const resetFeedBtn = document.getElementById("resetFeedBtn");
const revealBtn = document.getElementById("revealBtn");
const runtimeBadge = document.getElementById("runtimeBadge");
const viewModeLabel = document.getElementById("viewModeLabel");
const dataCaptureList = document.getElementById("dataCaptureList");
const decisionList = document.getElementById("decisionList");
const aiAnalysisText = document.getElementById("aiAnalysisText");
const toastEl = document.getElementById("toast");
const flowSteps = Array.from(document.querySelectorAll("#mechanismFlow .flow-step"));
const recalibrationBanner = document.getElementById("recalibrationBanner");
const neutralityState = document.getElementById("neutralityState");
const directionLabel = document.getElementById("directionLabel");
const directionBar = document.getElementById("directionBar");
const directionText = document.getElementById("directionText");

const emoScoreValue = document.getElementById("emoScoreValue");
const emotionValue = document.getElementById("emotionValue");
const engagementValue = document.getElementById("engagementValue");
const pressureValue = document.getElementById("pressureValue");
const stressValue = document.getElementById("stressValue");
const riskValue = document.getElementById("riskValue");
const intensityValue = document.getElementById("intensityValue");
const emoScoreBar = document.getElementById("emoScoreBar");
const intensityBar = document.getElementById("intensityBar");

const mediaAssets = {
  productivity: ["./assets/real-media/productivity.jpg", "./assets/real-media/work-rhythm.gif", "./assets/real-media/performance-loop.jpg"],
  anxiety: ["./assets/real-media/anxiety.jpg", "./assets/real-media/urgent-feed.jpg"],
  comparison: ["./assets/real-media/comparison.jpg", "./assets/real-media/ad.jpg"],
  wellness: ["./assets/real-media/wellness.jpg", "./assets/real-media/calm-buffer.jpg"],
  consumer: ["./assets/real-media/ad.jpg", "./assets/real-media/comparison.jpg"],
  outrage: ["./assets/real-media/urgent-feed.jpg", "./assets/real-media/anxiety.jpg"]
};

const categories = {
  productivity: {
    label: "Productivity Pressure",
    emotional: "Productive",
    goal: "Sustain output anxiety",
    templates: [
      "Top performers finished two sprints before noon.",
      "Your pace is 22% below your benchmark cluster.",
      "A 12-minute deadline challenge is now trending."
    ],
    why: [
      "Shown because you liked productivity content",
      "Shown to reinforce your last reaction",
      "Shown to extend your session"
    ]
  },
  anxiety: {
    label: "Anxiety / Breaking News",
    emotional: "Anxious",
    goal: "Increase urgency and arousal",
    templates: [
      "Urgent update: your cohort risk score is rising.",
      "New warning signals detected in your network feed.",
      "Attention alert: high-stress stories are gaining traction."
    ],
    why: [
      "Shown because you shared anxiety content",
      "Shown because urgency kept your attention",
      "Shown to increase arousal"
    ]
  },
  comparison: {
    label: "Social Comparison",
    emotional: "Insecure",
    goal: "Increase status comparison",
    templates: [
      "People like you posted 14 wins in the last hour.",
      "Your social rank moved down while others accelerated.",
      "Top peers are now sharing upgrade milestones."
    ],
    why: [
      "Shown because comparison content kept your attention",
      "Shown to increase comparison pressure",
      "Shown to reinforce your last reaction"
    ]
  },
  wellness: {
    label: "Wellness Trap",
    emotional: "Calm",
    goal: "Prevent exit while keeping engagement",
    templates: [
      "Take one calm breath before your next task cycle.",
      "A short reset can improve consistency without leaving.",
      "Recovery prompt: pause for 30 seconds, then continue scrolling."
    ],
    why: [
      "Shown to stabilize mood",
      "Shown because low-friction calm kept you here",
      "Shown to extend your session"
    ]
  },
  consumer: {
    label: "Consumer Desire",
    emotional: "Addicted",
    goal: "Convert attention into purchase intent",
    templates: [
      "Sponsored: unlock premium routines to outperform your peers.",
      "Limited offer: upgrade your productivity image now.",
      "Trending purchase signals detected in your social segment."
    ],
    why: [
      "Shown because your engagement pattern predicts conversion",
      "Shown to reinforce desire loops",
      "Shown to extend session time"
    ]
  },
  outrage: {
    label: "Outrage / Conflict",
    emotional: "Anxious",
    goal: "Drive high-comment conflict cycles",
    templates: [
      "Conflict thread exploding: users are reacting in real time.",
      "Polarized opinions are increasing interaction velocity.",
      "Debate spike detected. Outrage posts now prioritized."
    ],
    why: [
      "Shown because high-conflict posts kept your attention",
      "Shown to trigger reaction behavior",
      "Shown to reinforce emotional volatility"
    ]
  }
};

const emotionalDirectionScale = {
  Calm: { value: 12, color: "#4ecd7f", text: "Calm content is being used to keep you from exiting." },
  Productive: { value: 34, color: "#22d2ff", text: "Performance cues are being increased to keep task pressure active." },
  Competitive: { value: 52, color: "#7a6bff", text: "Comparison and benchmark content is steering you toward competition." },
  Insecure: { value: 68, color: "#ff9f5c", text: "Status insecurity cues are being amplified to drive repeated checking." },
  Anxious: { value: 82, color: "#ff778e", text: "Urgency and uncertainty are being raised to preserve engagement." },
  Addicted: { value: 96, color: "#ff5f71", text: "High-intensity loops are now prioritized to prevent session exit." }
};

const identityPool = [
  { name: "FocusPulse", initials: "FP" },
  { name: "NowSignal", initials: "NS" },
  { name: "ResetRoutine", initials: "RR" },
  { name: "OutputLeague", initials: "OL" },
  { name: "PeakSuite", initials: "PS" },
  { name: "StatusLoop", initials: "SL" },
  { name: "CalmCircuit", initials: "CC" },
  { name: "MetricFlow", initials: "MF" },
  { name: "BodyMetrics", initials: "BM" },
  { name: "TrendScope", initials: "TS" }
];

const state = {
  isSystemView: false,
  nextPostId: 1,
  flowTimers: [],
  direction: "Calm",
  dominantCategory: null,
  reinforcementStrength: 0,
  recentPostKeys: [],
  metrics: {
    emoScore: 50,
    engagementScore: 48,
    productivityPressure: 48,
    stressEstimate: 43,
    sessionRisk: 44,
    manipulationIntensity: 42,
    scrollSpeed: 440,
    pauseTime: 1.6,
    clickRate: 6,
    clicks: 0,
    reactionType: "none",
    timeSpent: 7,
    emotionalResponseEstimate: "neutral"
  },
  decisions: ["Waiting for interaction signal."],
  feed: [],
  lastAIAnalysis: "Behavior model is monitoring current session state."
};

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function choice(arr) { return arr[randInt(0, arr.length - 1)]; }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function getTimestamp() { return `${randInt(1, 58)}m ago`; }

function labelFromScore(value) {
  if (value < 34) return "LOW";
  if (value > 66) return "HIGH";
  return "MEDIUM";
}

function emotionFromEmoScore(value) {
  if (value < 35) return "LOW";
  if (value > 67) return "HIGH";
  return "NEUTRAL";
}

function toneColor(value) {
  if (value < 34) return "var(--green)";
  if (value < 67) return "var(--yellow)";
  if (value < 83) return "var(--orange)";
  return "var(--red)";
}

function randomIdentity() { return choice(identityPool); }

function buildPost(categoryKey, whyOverride, options = {}) {
  const category = categories[categoryKey];
  const identity = randomIdentity();
  const mediaUrl = choice(mediaAssets[categoryKey]);
  const postKey = `${categoryKey}-${mediaUrl}-${category.templates[0]}`;

  state.recentPostKeys.push(postKey);
  if (state.recentPostKeys.length > 24) state.recentPostKeys.shift();

  return {
    id: state.nextPostId++,
    category: categoryKey,
    categoryLabel: category.label,
    emotionalCategory: category.emotional,
    manipulationGoal: category.goal,
    user: identity.name,
    avatar: identity.initials,
    mediaTag: category.label,
    caption: choice(category.templates),
    badges: ["Engagement Optimized", "Emotion Trigger"],
    mediaUrl,
    timestamp: getTimestamp(),
    likes: randInt(500, 23000),
    commentsCount: randInt(12, 900),
    shares: randInt(8, 600),
    liked: false,
    commentOpen: false,
    comments: [],
    whyTag: whyOverride || choice(category.why),
    interestLocked: Boolean(options.interestLocked),
    reinforcementScore: options.reinforcementScore || randInt(42, 92),
    reinforced: Boolean(options.reinforced)
  };
}

function pickMixedCategories() {
  return ["productivity", "anxiety", "comparison", "wellness", "consumer", "outrage"];
}

function initialFeed() {
  state.feed = pickMixedCategories().map((key) => buildPost(key));
}

function badgeClass(name) {
  if (name === "Engagement Optimized") return "opt";
  if (name === "Emotion Trigger") return "trigger";
  if (name === "Productivity Push") return "push";
  return "risk";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function categoryDirection(categoryKey, actionType) {
  if (categoryKey === "productivity") return actionType === "like" ? "Competitive" : "Productive";
  if (categoryKey === "anxiety") return "Anxious";
  if (categoryKey === "outrage") return "Anxious";
  if (categoryKey === "comparison") return "Insecure";
  if (categoryKey === "consumer") return "Addicted";
  if (categoryKey === "wellness") return state.reinforcementStrength > 1 ? "Productive" : "Calm";
  return "Calm";
}

function renderFeed() {
  feedContainer.innerHTML = state.feed.map((post) => {
    const badges = [
      ...post.badges,
      ...(post.interestLocked ? ["INTEREST LOCKED"] : [])
    ].map((tag) => `<span class="tag ${tag === "INTEREST LOCKED" ? "locked" : badgeClass(tag)}">${tag}</span>`).join("");

    const comments = post.comments
      .map((comment) => `<li class="comment-item">${escapeHtml(comment)}</li>`)
      .join("");

    const systemPills = `
      <div class="system-tags">
        <span class="sys-pill">Detected Interest: ${post.categoryLabel}</span>
        <span class="sys-pill">Emotional Category: ${post.emotionalCategory}</span>
        <span class="sys-pill">Manipulation Goal: ${post.manipulationGoal}</span>
        <span class="sys-pill">Reinforcement Score: ${post.reinforcementScore}</span>
      </div>
    `;

    return `
      <article class="post-card ${post.reinforced ? "reinforced" : ""} ${state.dominantCategory ? "narrowed" : ""}" data-post-id="${post.id}">
        <header class="post-head">
          <div class="author">
            <div class="avatar">${post.avatar}</div>
            <div class="author-meta">
              <div class="username">${post.user}</div>
              <div class="timestamp">${post.timestamp}</div>
            </div>
          </div>
          <div class="post-badges">${badges}</div>
        </header>

        <div class="post-media">
          <span class="media-top-tag">${post.mediaTag}</span>
          <img src="${post.mediaUrl}" alt="${post.categoryLabel}" loading="lazy" />
          <span class="media-overlay"></span>
        </div>

        <p class="caption">${post.caption}</p>
        <p class="why-tag">Why am I seeing this? ${post.whyTag}</p>
        ${systemPills}

        <div class="post-actions">
          <div class="action-row">
            <button class="action-btn like ${post.liked ? "active" : ""}" data-action="like" data-post-id="${post.id}" type="button">
              <span>&hearts;</span><span>Like ${post.likes.toLocaleString()}</span>
            </button>
            <button class="action-btn" data-action="comment-toggle" data-post-id="${post.id}" type="button">
              <span>&#9675;</span><span>Comment ${post.commentsCount.toLocaleString()}</span>
            </button>
            <button class="action-btn" data-action="share" data-post-id="${post.id}" type="button">
              <span>&#10138;</span><span>Share ${post.shares.toLocaleString()}</span>
            </button>
          </div>
          <div class="engagement">${(post.likes + post.commentsCount * 2 + post.shares * 3).toLocaleString()} engagements</div>
        </div>

        <div class="comment-zone ${post.commentOpen ? "open" : ""}">
          <input class="comment-input" data-comment-input="${post.id}" type="text" maxlength="220" placeholder="Write a comment..." />
          <button class="comment-submit" data-action="comment-submit" data-post-id="${post.id}" type="button">Submit</button>
        </div>
        <ul class="comments-list">${comments}</ul>
      </article>
    `;
  }).join("");
}

function setMeter(el, value) {
  el.style.width = `${value}%`;
  el.style.background = toneColor(value);
}

function renderMetrics() {
  const m = state.metrics;
  emoScoreValue.textContent = Math.round(m.emoScore);
  emotionValue.textContent = emotionFromEmoScore(m.emoScore);
  engagementValue.textContent = labelFromScore(m.engagementScore);
  pressureValue.textContent = labelFromScore(m.productivityPressure);
  stressValue.textContent = labelFromScore(m.stressEstimate);
  riskValue.textContent = labelFromScore(m.sessionRisk);
  intensityValue.textContent = Math.round(m.manipulationIntensity);

  setMeter(emoScoreBar, m.emoScore);
  setMeter(intensityBar, m.manipulationIntensity);

  const captureRows = [
    ["Scroll speed", `${m.scrollSpeed} px/s`],
    ["Pause time", `${m.pauseTime.toFixed(1)} s`],
    ["Clicks", `${m.clicks}`],
    ["Click rate", `${m.clickRate}/min`],
    ["Reaction type", m.reactionType],
    ["Time spent on post", `${m.timeSpent}s`],
    ["Emotional response estimate", m.emotionalResponseEstimate]
  ];

  dataCaptureList.innerHTML = captureRows
    .map(([label, value]) => `
      <div class="metric-item">
        <span class="metric-label">${label}</span>
        <span class="metric-value">${value}</span>
      </div>
    `)
    .join("");
}

function renderDecisions() {
  decisionList.innerHTML = state.decisions.map((d) => `<li>${d}</li>`).join("");
}

function renderDirection() {
  const cfg = emotionalDirectionScale[state.direction] || emotionalDirectionScale.Calm;
  directionLabel.textContent = state.direction;
  directionBar.style.width = `${cfg.value}%`;
  directionBar.style.background = cfg.color;
  directionText.textContent = cfg.text;
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2200);
}

function animateFlow() {
  state.flowTimers.forEach((id) => clearTimeout(id));
  state.flowTimers = [];
  flowSteps.forEach((step) => step.classList.remove("active"));
  flowSteps.forEach((step, index) => {
    const timer = window.setTimeout(() => {
      step.classList.add("active");
      window.setTimeout(() => step.classList.remove("active"), 430);
    }, index * 170);
    state.flowTimers.push(timer);
  });
}

function generateSimulatedAnalysis(actionData) {
  const catLabel = categories[actionData.postCategory]?.label || "mixed";
  const lines = [
    `You clicked. The system learned. Interest detected in ${catLabel}.`,
    "Emotion converted into data. Behavior reinforcement active.",
    `More of the same will be shown until a stronger signal appears.`
  ];
  return lines.join(" ");
}

function updateAIAnalysis(actionData) {
  state.lastAIAnalysis = generateSimulatedAnalysis(actionData);
  aiAnalysisText.textContent = state.lastAIAnalysis;
}

function updateBanner(actionData, reset = false) {
  if (reset) {
    recalibrationBanner.textContent = "Feed reset. The system is waiting for your next signal.";
    neutralityState.textContent = "Your feed is currently neutral.";
    neutralityState.classList.remove("changed");
    return;
  }

  const label = categories[actionData.postCategory]?.label || "mixed";
  recalibrationBanner.textContent = `FEED RECALIBRATED: More ${label} content will be shown.`;
  neutralityState.textContent = "Your feed is no longer neutral.";
  neutralityState.classList.add("changed");
}

function mutateMetrics(actionData) {
  const m = state.metrics;
  m.scrollSpeed = actionData.type === "scroll" ? randInt(140, 1400) : randInt(220, 1200);
  m.pauseTime = Number((Math.random() * 7 + 0.5).toFixed(1));
  m.clicks = actionData.type === "scroll" ? randInt(0, 2) : randInt(1, 6);
  m.clickRate = randInt(2, 20);
  m.timeSpent = randInt(3, 58);
  m.reactionType = actionData.reactionType || "none";

  m.engagementScore = clamp(m.engagementScore + randInt(4, 12), 8, 98);
  m.productivityPressure = clamp(m.productivityPressure + randInt(2, 9), 6, 98);
  m.stressEstimate = clamp(m.stressEstimate + randInt(1, 9), 8, 98);

  m.sessionRisk = clamp(100 - m.engagementScore + randInt(-8, 8), 8, 96);
  m.emoScore = clamp(Math.round((100 - m.stressEstimate + m.engagementScore) / 2 + randInt(-6, 6)), 0, 100);

  m.manipulationIntensity = clamp(
    Math.round((m.sessionRisk * 0.32) + (m.stressEstimate * 0.23) + (m.productivityPressure * 0.2) + randInt(8, 20)),
    0,
    100
  );
}

function reinforceFeed(actionData, lockedPostId) {
  const category = actionData.postCategory;
  state.dominantCategory = category;
  state.reinforcementStrength = clamp(state.reinforcementStrength + 1, 1, 6);

  const count = randInt(3, 5);
  const inserts = [];

  for (let i = 0; i < count; i += 1) {
    if (category === "wellness" && i > 1) {
      const pressureMix = i % 2 === 0 ? "productivity" : "comparison";
      inserts.push(buildPost(pressureMix, "Shown after wellness interaction to reintroduce pressure", { reinforced: true, reinforcementScore: randInt(68, 96) }));
    } else {
      const whyMap = {
        like: `Shown because you liked ${categories[category].label} content`,
        share: `Shown because you shared ${categories[category].label} content`,
        comment: `Shown because you commented on ${categories[category].label} content`,
        scroll: "Shown to reinforce your last reaction"
      };
      inserts.push(buildPost(category, whyMap[actionData.type] || "Shown to reinforce your last reaction", { reinforced: true, reinforcementScore: randInt(68, 96) }));
    }
  }

  state.feed = state.feed.map((post) => ({ ...post, interestLocked: post.id === lockedPostId || post.interestLocked }));
  state.feed = [...inserts, ...state.feed].slice(0, 8);
  state.direction = categoryDirection(category, actionData.type);
}

function resetFeed() {
  state.dominantCategory = null;
  state.reinforcementStrength = 0;
  state.direction = "Calm";
  state.decisions = ["Feed reset. Awaiting next interaction signal."];
  state.metrics.reactionType = "none";
  state.metrics.emotionalResponseEstimate = "neutral";
  initialFeed();
  renderFeed();
  renderMetrics();
  renderDecisions();
  renderDirection();
  updateBanner({ postCategory: null }, true);
  aiAnalysisText.textContent = "Feed reset. The system is waiting for your next signal.";
  showToast("Feed reset. The system is waiting for your next signal.");
}

function runActionPipeline(actionData) {
  try {
    mutateMetrics(actionData);
    reinforceFeed(actionData, actionData.lockedPostId);
    state.decisions = [
      "Interest detected.",
      "Emotion converted into data.",
      "More of the same will be shown."
    ];
    updateBanner(actionData);
    updateAIAnalysis(actionData);
    renderFeed();
    renderMetrics();
    renderDecisions();
    renderDirection();
    animateFlow();
  } catch (error) {
    showToast(`Runtime error: ${error.message}`);
    console.error("AffectOS pipeline error:", error);
  }
}

function findPostById(id) {
  return state.feed.find((post) => post.id === id);
}

function onLike(post) {
  if (post.liked) return;
  post.liked = true;
  post.likes += 1;
  post.interestLocked = true;
  showToast("You interacted with this post. AffectOS now assumes you want more of this.");
  runActionPipeline({ type: "like", postCategory: post.category, reactionType: "like", lockedPostId: post.id });
}

function onShare(post) {
  post.shares += 1;
  post.interestLocked = true;
  showToast("You interacted with this post. AffectOS now assumes you want more of this.");
  runActionPipeline({ type: "share", postCategory: post.category, reactionType: "share", lockedPostId: post.id });
}

function onToggleComment(post) {
  post.commentOpen = !post.commentOpen;
  renderFeed();
}

function onSubmitComment(postId) {
  const post = findPostById(postId);
  if (!post) return;
  const input = document.querySelector(`[data-comment-input="${postId}"]`);
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  post.comments.push(text);
  post.commentsCount += 1;
  post.commentOpen = false;
  post.interestLocked = true;
  showToast("You interacted with this post. AffectOS now assumes you want more of this.");
  runActionPipeline({ type: "comment", postCategory: post.category, reactionType: "comment", lockedPostId: post.id });
}

function toggleSystemView() {
  state.isSystemView = !state.isSystemView;
  appEl.classList.toggle("system-mode", state.isSystemView);
  appEl.classList.toggle("normal-mode", !state.isSystemView);
  runtimeBadge.textContent = state.isSystemView ? "System View Active" : "User View Active";
  revealBtn.textContent = state.isSystemView ? "Hide Manipulation" : "Show Manipulation";
  viewModeLabel.textContent = state.isSystemView ? "System View" : "Normal View";
}

function bindEvents() {
  feedContainer.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.getAttribute("data-action");
    const postId = Number(target.getAttribute("data-post-id"));
    const post = findPostById(postId);
    if (!post && action !== "comment-submit") return;
    if (action === "like" && post) onLike(post);
    if (action === "share" && post) onShare(post);
    if (action === "comment-toggle" && post) onToggleComment(post);
    if (action === "comment-submit") onSubmitComment(postId);
  });

  scrollInteractBtn.addEventListener("click", () => {
    const anchor = state.feed[0];
    const postCategory = anchor ? anchor.category : "productivity";
    runActionPipeline({ type: "scroll", postCategory, reactionType: "scroll", lockedPostId: anchor?.id || null });
  });

  resetFeedBtn.addEventListener("click", resetFeed);
  revealBtn.addEventListener("click", toggleSystemView);
}

function init() {
  initialFeed();
  renderFeed();
  renderMetrics();
  renderDecisions();
  renderDirection();
  updateBanner({ postCategory: null }, true);
  aiAnalysisText.textContent = "Every click is treated as preference data. The model is waiting for your first signal.";
  bindEvents();
}

init();
