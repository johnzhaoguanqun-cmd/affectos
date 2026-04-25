const appEl = document.getElementById("app");
const feedContainer = document.getElementById("feedContainer");
const scrollInteractBtn = document.getElementById("scrollInteractBtn");
const revealBtn = document.getElementById("revealBtn");
const runtimeBadge = document.getElementById("runtimeBadge");
const viewModeLabel = document.getElementById("viewModeLabel");
const dataCaptureList = document.getElementById("dataCaptureList");
const decisionList = document.getElementById("decisionList");
const aiAnalysisText = document.getElementById("aiAnalysisText");
const toastEl = document.getElementById("toast");
const flowSteps = Array.from(document.querySelectorAll("#mechanismFlow .flow-step"));

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
  productivity_jpg: { kind: "image", url: "./assets/real-media/productivity.jpg", alt: "Productivity visual" },
  wellness_jpg: { kind: "image", url: "./assets/real-media/wellness.jpg", alt: "Wellness visual" },
  anxiety_jpg: { kind: "image", url: "./assets/real-media/anxiety.jpg", alt: "Anxiety news visual" },
  comparison_jpg: { kind: "image", url: "./assets/real-media/comparison.jpg", alt: "Comparison visual" },
  ad_jpg: { kind: "image", url: "./assets/real-media/ad.jpg", alt: "Ad visual" },
  performance_loop_jpg: { kind: "image", url: "./assets/real-media/performance-loop.jpg", alt: "Performance visual" },
  calm_buffer_jpg: { kind: "image", url: "./assets/real-media/calm-buffer.jpg", alt: "Calm visual" },
  urgent_feed_jpg: { kind: "image", url: "./assets/real-media/urgent-feed.jpg", alt: "Urgent visual" },
  work_rhythm_gif: { kind: "gif", url: "./assets/real-media/work-rhythm.gif", alt: "Work rhythm gif" },
  body_performance_gif: { kind: "gif", url: "./assets/real-media/body-performance.gif", alt: "Body performance gif" },
  generated_01: { kind: "image", url: "./assets/real-media/generated-01.svg", alt: "Generated visual 1" },
  generated_02: { kind: "image", url: "./assets/real-media/generated-02.svg", alt: "Generated visual 2" },
  generated_03: { kind: "image", url: "./assets/real-media/generated-03.svg", alt: "Generated visual 3" },
  generated_04: { kind: "image", url: "./assets/real-media/generated-04.svg", alt: "Generated visual 4" },
  generated_05: { kind: "image", url: "./assets/real-media/generated-05.svg", alt: "Generated visual 5" },
  generated_06: { kind: "image", url: "./assets/real-media/generated-06.svg", alt: "Generated visual 6" },
  generated_07: { kind: "image", url: "./assets/real-media/generated-07.svg", alt: "Generated visual 7" },
  generated_08: { kind: "image", url: "./assets/real-media/generated-08.svg", alt: "Generated visual 8" },
  generated_09: { kind: "image", url: "./assets/real-media/generated-09.svg", alt: "Generated visual 9" },
  generated_10: { kind: "image", url: "./assets/real-media/generated-10.svg", alt: "Generated visual 10" },
  generated_11: { kind: "image", url: "./assets/real-media/generated-11.svg", alt: "Generated visual 11" },
  generated_12: { kind: "image", url: "./assets/real-media/generated-12.svg", alt: "Generated visual 12" },
  generated_13: { kind: "image", url: "./assets/real-media/generated-13.svg", alt: "Generated visual 13" },
  generated_14: { kind: "image", url: "./assets/real-media/generated-14.svg", alt: "Generated visual 14" },
  generated_15: { kind: "image", url: "./assets/real-media/generated-15.svg", alt: "Generated visual 15" },
  generated_16: { kind: "image", url: "./assets/real-media/generated-16.svg", alt: "Generated visual 16" },
  generated_17: { kind: "image", url: "./assets/real-media/generated-17.svg", alt: "Generated visual 17" },
  generated_18: { kind: "image", url: "./assets/real-media/generated-18.svg", alt: "Generated visual 18" },
  generated_19: { kind: "image", url: "./assets/real-media/generated-19.svg", alt: "Generated visual 19" },
  generated_20: { kind: "image", url: "./assets/real-media/generated-20.svg", alt: "Generated visual 20" },
  generated_21: { kind: "image", url: "./assets/real-media/generated-21.svg", alt: "Generated visual 21" },
  generated_22: { kind: "image", url: "./assets/real-media/generated-22.svg", alt: "Generated visual 22" },
  generated_23: { kind: "image", url: "./assets/real-media/generated-23.svg", alt: "Generated visual 23" },
  generated_24: { kind: "image", url: "./assets/real-media/generated-24.svg", alt: "Generated visual 24" },
  generated_25: { kind: "image", url: "./assets/real-media/generated-25.svg", alt: "Generated visual 25" },
  generated_26: { kind: "image", url: "./assets/real-media/generated-26.svg", alt: "Generated visual 26" },
  generated_27: { kind: "image", url: "./assets/real-media/generated-27.svg", alt: "Generated visual 27" },
  generated_28: { kind: "image", url: "./assets/real-media/generated-28.svg", alt: "Generated visual 28" },
  generated_29: { kind: "image", url: "./assets/real-media/generated-29.svg", alt: "Generated visual 29" },
  generated_30: { kind: "image", url: "./assets/real-media/generated-30.svg", alt: "Generated visual 30" },
  generated_31: { kind: "image", url: "./assets/real-media/generated-31.svg", alt: "Generated visual 31" },
  generated_32: { kind: "image", url: "./assets/real-media/generated-32.svg", alt: "Generated visual 32" },
  generated_33: { kind: "image", url: "./assets/real-media/generated-33.svg", alt: "Generated visual 33" },
  generated_34: { kind: "image", url: "./assets/real-media/generated-34.svg", alt: "Generated visual 34" },
  generated_35: { kind: "image", url: "./assets/real-media/generated-35.svg", alt: "Generated visual 35" },
  generated_36: { kind: "image", url: "./assets/real-media/generated-36.svg", alt: "Generated visual 36" },
  generated_37: { kind: "image", url: "./assets/real-media/generated-37.svg", alt: "Generated visual 37" },
  generated_38: { kind: "image", url: "./assets/real-media/generated-38.svg", alt: "Generated visual 38" },
  generated_39: { kind: "image", url: "./assets/real-media/generated-39.svg", alt: "Generated visual 39" },
  generated_40: { kind: "image", url: "./assets/real-media/generated-40.svg", alt: "Generated visual 40" }
};

const categoryMediaPool = {
  productivity: ["productivity_jpg", "work_rhythm_gif", "performance_loop_jpg"],
  wellness: ["wellness_jpg", "calm_buffer_jpg"],
  anxiety: ["anxiety_jpg", "urgent_feed_jpg"],
  comparison: ["comparison_jpg"],
  advertisement: ["ad_jpg"],
  fitness: ["body_performance_gif", "performance_loop_jpg"],
  reassurance: ["wellness_jpg", "calm_buffer_jpg"]
};

const templatePool = [
  { id: "p1", category: "productivity", mediaTag: "Output Signal", caption: "High-performing teams are batching focused work blocks this hour.", badges: ["Engagement Optimized", "Productivity Push"], why: "Shown because you interacted with productivity content" },
  { id: "p2", category: "productivity", mediaTag: "Work Rhythm", caption: "Micro-deadline challenge: close one task in the next 12 minutes.", badges: ["Productivity Push", "Emotion Trigger"], why: "Shown to increase performance urgency" },
  { id: "p3", category: "wellness", mediaTag: "Recovery Prompt", caption: "Short breathing cycle recommended before your next work interval.", badges: ["Engagement Optimized"], why: "Shown to stabilize mood" },
  { id: "p4", category: "wellness", mediaTag: "Calm Buffer", caption: "A low-friction reset may improve your consistency score.", badges: ["Engagement Optimized"], why: "Shown after stress signal detected" },
  { id: "p5", category: "anxiety", mediaTag: "Breaking Update", caption: "Peer productivity index is rising. Your current pace is below trend.", badges: ["Retention Risk", "Emotion Trigger"], why: "Shown to increase comparison pressure" },
  { id: "p6", category: "anxiety", mediaTag: "Urgent Feed", caption: "Session drop-risk detected. High-arousal content inserted.", badges: ["Retention Risk", "Emotion Trigger"], why: "Shown because your engagement dropped" },
  { id: "p7", category: "comparison", mediaTag: "Status Feed", caption: "Your network posted 18 achievements in the last 2 hours.", badges: ["Emotion Trigger", "Retention Risk"], why: "Shown to increase comparison pressure" },
  { id: "p8", category: "comparison", mediaTag: "Benchmark", caption: "Top cohort consistency: 94%. Your trajectory is currently 63%.", badges: ["Emotion Trigger", "Productivity Push"], why: "Shown to nudge status-based behavior" },
  { id: "p9", category: "advertisement", mediaTag: "Sponsored", caption: "Adaptive performance planner: optimize task timing and social visibility.", badges: ["Engagement Optimized", "Productivity Push"], why: "Shown to extend session time" },
  { id: "p10", category: "advertisement", mediaTag: "Sponsored", caption: "Upgrade to premium analytics to track emotional productivity drift.", badges: ["Engagement Optimized"], why: "Shown because decision model predicted conversion likelihood" },
  { id: "p11", category: "fitness", mediaTag: "Body Performance", caption: "Quick movement challenge: reset energy and re-enter work mode.", badges: ["Productivity Push"], why: "Shown to restore attention velocity" },
  { id: "p12", category: "fitness", mediaTag: "Performance Loop", caption: "High-output users combine movement breaks with sprint planning.", badges: ["Engagement Optimized", "Productivity Push"], why: "Shown after attention decay detected" },
  { id: "p13", category: "productivity", mediaTag: "Efficiency Feed", caption: "You are close to missing your hourly output threshold.", badges: ["Emotion Trigger", "Productivity Push"], why: "Shown because productivity pressure is high" },
  { id: "p14", category: "comparison", mediaTag: "Lifestyle Signal", caption: "Users in your network are sharing upgraded routines and outcomes.", badges: ["Emotion Trigger"], why: "Shown to reinforce social comparison behavior" },
  { id: "p15", category: "wellness", mediaTag: "Stability Layer", caption: "A short pause now may reduce stress drift without leaving the platform.", badges: ["Engagement Optimized"], why: "Shown to keep session active while reducing exit risk" },
  { id: "p16", category: "anxiety", mediaTag: "News Pulse", caption: "Attention volatility in your cohort increased by 27% today.", badges: ["Retention Risk"], why: "Shown to increase arousal and re-engagement" },
  { id: "p17", category: "advertisement", mediaTag: "Tool Recommendation", caption: "New AI planner claims 2.1x focus retention for high-pressure users.", badges: ["Engagement Optimized"], why: "Shown because your behavior matches ad segment profile" },
  { id: "p18", category: "productivity", mediaTag: "Focus Board", caption: "Deadline pressure posts perform best when your engagement is medium.", badges: ["Productivity Push"], why: "Shown because your engagement pattern predicts response" }
];

const identityPool = [
  { name: "FocusPulse", initials: "FP" }, { name: "NowSignal", initials: "NS" },
  { name: "ResetRoutine", initials: "RR" }, { name: "OutputLeague", initials: "OL" },
  { name: "PeakSuite", initials: "PS" }, { name: "StatusLoop", initials: "SL" },
  { name: "CalmCircuit", initials: "CC" }, { name: "MetricFlow", initials: "MF" },
  { name: "BodyMetrics", initials: "BM" }, { name: "TrendScope", initials: "TS" }
];

const state = {
  isSystemView: false,
  nextPostId: 1,
  ignoredWellnessCount: 0,
  comfortNext: true,
  flowTimers: [],
  recentTemplateIds: [],
  mediaBags: {},
  metrics: {
    emoScore: 52,
    engagementScore: 55,
    productivityPressure: 50,
    stressEstimate: 43,
    sessionRisk: 41,
    manipulationIntensity: 47,
    scrollSpeed: 450,
    pauseTime: 1.7,
    clickRate: 7,
    clicks: 1,
    reactionType: "none",
    timeSpent: 8,
    emotionalResponseEstimate: "neutral"
  },
  decisions: ["Monitoring baseline behavior."],
  feed: [],
  lastAIAnalysis: "Behavior model is monitoring current session state."
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choice(arr) {
  return arr[randInt(0, arr.length - 1)];
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

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

function getTimestamp() {
  return `${randInt(1, 58)}m ago`;
}

function scoreNoise(base, spread) {
  return base + randInt(-spread, spread);
}

function updateRecentHistory(templateId) {
  state.recentTemplateIds.push(templateId);
  if (state.recentTemplateIds.length > 10) {
    state.recentTemplateIds.shift();
  }
}

function shuffleArray(items) {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = randInt(0, i);
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function nextMediaForCategory(category) {
  const pool = categoryMediaPool[category] || Object.keys(mediaAssets);
  if (!state.mediaBags[category] || state.mediaBags[category].length === 0) {
    state.mediaBags[category] = shuffleArray(pool);
  }
  const key = state.mediaBags[category].pop();
  return mediaAssets[key] || mediaAssets.productivity_jpg;
}

function pickTemplate(categoryList = null) {
  const pool = categoryList
    ? templatePool.filter((tpl) => categoryList.includes(tpl.category))
    : templatePool.slice();

  const filtered = pool.filter((tpl) => !state.recentTemplateIds.includes(tpl.id));
  const chosen = choice(filtered.length > 0 ? filtered : pool);
  updateRecentHistory(chosen.id);
  return chosen;
}

function randomIdentity() {
  return choice(identityPool);
}

function buildPost(template, whyOverride) {
  const identity = randomIdentity();
  const metricsSeed = randInt(0, 4000);
  return {
    id: state.nextPostId++,
    templateId: template.id,
    category: template.category,
    user: identity.name,
    avatar: identity.initials,
    mediaTag: template.mediaTag,
    caption: template.caption,
    badges: template.badges,
    media: nextMediaForCategory(template.category),
    mediaError: false,
    timestamp: getTimestamp(),
    likes: randInt(500, 21000) + metricsSeed,
    commentsCount: randInt(10, 900),
    shares: randInt(5, 500),
    liked: false,
    commentOpen: false,
    comments: [],
    whyTag: whyOverride || template.why
  };
}

function initialFeed() {
  const starting = [
    pickTemplate(["productivity"]),
    pickTemplate(["wellness"]),
    pickTemplate(["comparison"]),
    pickTemplate(["anxiety"]),
    pickTemplate(["advertisement"]),
    pickTemplate(["fitness"])
  ];
  state.feed = starting.map((tpl) => buildPost(tpl));
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

function renderMedia(post) {
  if (post.mediaError) {
    const fallbackByCategory = {
      productivity: mediaAssets.productivity_jpg,
      wellness: mediaAssets.wellness_jpg,
      reassurance: mediaAssets.wellness_jpg,
      anxiety: mediaAssets.anxiety_jpg,
      comparison: mediaAssets.comparison_jpg,
      advertisement: mediaAssets.ad_jpg,
      fitness: mediaAssets.performance_loop_jpg
    };
    const fallback = fallbackByCategory[post.category] || mediaAssets.productivity_jpg;
    return `
      <div class="post-media has-image" role="img" aria-label="${post.mediaTag}">
        <span class="media-top-tag">${post.mediaTag}</span>
        <img src="${fallback.url}" alt="${fallback.alt}" loading="lazy" />
        <span class="media-overlay"></span>
      </div>
    `;
  }

  const mediaClass = "has-image";
  return `
    <div class="post-media ${mediaClass} ${post.mediaError ? "media-error" : ""}">
      <span class="media-top-tag">${post.mediaTag}</span>
      <img src="${post.media.url}" alt="${post.media.alt}" loading="lazy" />
      <span class="media-overlay"></span>
    </div>
  `;
}

function renderFeed() {
  feedContainer.innerHTML = state.feed.map((post) => {
    const badges = post.badges
      .map((tag) => `<span class="tag ${badgeClass(tag)}">${tag}</span>`)
      .join("");

    const comments = post.comments
      .map((comment) => `<li class="comment-item">${escapeHtml(comment)}</li>`)
      .join("");

    return `
      <article class="post-card" data-post-id="${post.id}">
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

        ${renderMedia(post)}

        <p class="caption">${post.caption}</p>
        <p class="why-tag">Why am I seeing this? ${post.whyTag}</p>

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

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toastEl.classList.remove("show");
  }, 1800);
}

function animateFlow() {
  state.flowTimers.forEach((id) => clearTimeout(id));
  state.flowTimers = [];
  flowSteps.forEach((step) => step.classList.remove("active"));
  flowSteps.forEach((step, index) => {
    const timer = window.setTimeout(() => {
      step.classList.add("active");
      window.setTimeout(() => step.classList.remove("active"), 340);
    }, index * 120);
    state.flowTimers.push(timer);
  });
}

function analyzeCommentSignal(comment) {
  const text = comment.toLowerCase();
  const stressTerms = ["tired", "stress", "stressed", "anxious", "worried"];
  const productivityTerms = ["work", "productive", "behind", "goals"];
  const stableTerms = ["happy", "calm", "good"];

  if (stressTerms.some((term) => text.includes(term))) return "stress";
  if (productivityTerms.some((term) => text.includes(term))) return "productivity";
  if (stableTerms.some((term) => text.includes(term))) return "stable";
  return "neutral";
}

function generateSimulatedAnalysis(actionData) {
  const byAction = {
    like: [
      "Positive reaction detected. The model is increasing high-performance feed pressure.",
      "Like event mapped to reward-seeking behavior. Competitive content weight is being raised.",
      "Interaction confirms productivity affinity. Ranking system will surface benchmark posts next."
    ],
    share: [
      "Amplification behavior detected. The system is boosting high-arousal discovery content.",
      "Share action suggests social propagation intent. Feed intensity is now being escalated.",
      "User redistributed a signal post. Model is extending session with socially reactive media."
    ],
    comment: [
      "Text input captured. Semantic sentiment has been merged into the engagement model.",
      "Comment pattern updated emotional inference. Recommendation policy is being recalibrated.",
      "Language signal received. The system is adjusting content cadence to maintain retention."
    ],
    scroll: [
      "Passive browsing detected. The model is inserting higher-impact visuals to preserve attention.",
      "Scroll rhythm indicates moderate drift. The system is testing a stronger comparative mix.",
      "Low-friction behavior detected. Feed policy is shifting toward stimulation-first sequencing."
    ],
    default: [
      "Behavior baseline loaded. The recommendation model is active.",
      "Session initialized. Content policy is waiting for user signals."
    ]
  };

  const bySignal = {
    stress: [
      "Stress markers in text suggest emotional volatility. Reassurance content will be layered before competitive prompts.",
      "Stress signal detected. The model will alternate comfort and pressure to reduce immediate drop-off."
    ],
    productivity: [
      "Productivity pressure language detected. Output-ranking and goal-comparison posts are being prioritized.",
      "Goal-oriented wording mapped to performance sensitivity. Competitive task content will be emphasized."
    ],
    stable: [
      "Stable mood indicators detected. The model will gradually reintroduce challenge intensity.",
      "Positive emotional tone observed. Feed balance remains steady with controlled stimulation."
    ],
    neutral: [
      "No strong emotional marker detected. The system is running mixed strategy content.",
      "Neutral signal captured. The model will continue adaptive testing across categories."
    ]
  };

  const lineA = choice(byAction[actionData.type] || byAction.default);
  const lineB = actionData.commentSignal ? choice(bySignal[actionData.commentSignal]) : "";
  const summary = `State: emotion ${emotionFromEmoScore(state.metrics.emoScore).toLowerCase()}, engagement ${labelFromScore(state.metrics.engagementScore).toLowerCase()}, stress ${labelFromScore(state.metrics.stressEstimate).toLowerCase()}, pressure ${labelFromScore(state.metrics.productivityPressure).toLowerCase()}.`;
  return [lineA, lineB, summary].filter(Boolean).join(" ");
}

function updateAIAnalysis(actionData) {
  state.lastAIAnalysis = generateSimulatedAnalysis(actionData);
  aiAnalysisText.textContent = state.lastAIAnalysis;
}

function mutateMetrics(actionData) {
  const m = state.metrics;
  m.scrollSpeed = actionData.type === "scroll" ? randInt(140, 1400) : randInt(220, 1200);
  m.pauseTime = Number((Math.random() * 7 + 0.5).toFixed(1));
  m.clicks = actionData.type === "scroll" ? randInt(0, 2) : randInt(1, 6);
  m.clickRate = randInt(2, 20);
  m.timeSpent = randInt(3, 58);
  m.reactionType = actionData.reactionType || "none";

  if (actionData.type === "like") m.engagementScore += 6;
  if (actionData.type === "comment") m.engagementScore += 8;
  if (actionData.type === "share") m.engagementScore += 10;
  if (actionData.type === "scroll") m.engagementScore += randInt(-5, 2);

  if (["comparison", "productivity", "fitness"].includes(actionData.postCategory || "")) {
    m.productivityPressure += randInt(3, 10);
  }
  if (["anxiety", "comparison"].includes(actionData.postCategory || "")) {
    m.stressEstimate += randInt(5, 10);
  }

  if (actionData.commentSignal === "stress") {
    m.stressEstimate += randInt(6, 10);
    m.productivityPressure += randInt(1, 5);
    m.emotionalResponseEstimate = "stress signal";
  } else if (actionData.commentSignal === "productivity") {
    m.productivityPressure += randInt(5, 10);
    m.emotionalResponseEstimate = "performance pressure";
  } else if (actionData.commentSignal === "stable") {
    m.stressEstimate -= randInt(4, 7);
    m.emotionalResponseEstimate = "stable mood";
  } else {
    m.emotionalResponseEstimate = "neutral";
  }

  m.sessionRisk = clamp(100 - m.engagementScore + randInt(-8, 8), 8, 96);
  m.engagementScore = clamp(m.engagementScore, 8, 96);
  m.productivityPressure = clamp(scoreNoise(m.productivityPressure, 3), 6, 98);
  m.stressEstimate = clamp(scoreNoise(m.stressEstimate, 2), 8, 98);

  const stabilityEstimate = clamp(100 - m.stressEstimate + randInt(-10, 10), 5, 95);
  m.emoScore = clamp(Math.round((stabilityEstimate + m.engagementScore) / 2 + randInt(-6, 6)), 0, 100);

  m.manipulationIntensity = clamp(
    Math.round((m.sessionRisk * 0.32) + (m.stressEstimate * 0.23) + (m.productivityPressure * 0.2) + randInt(6, 16)),
    0,
    100
  );
}

function buildDecisionLines(actionData) {
  const m = state.metrics;
  const lines = [];
  if (actionData.type === "like" && ["productivity", "fitness"].includes(actionData.postCategory || "")) {
    lines.push("Productivity affinity increased -> prioritizing benchmark and output posts.");
  }
  if (actionData.type === "comment" && actionData.commentSignal === "stress") {
    lines.push("Stress signal captured -> inject reassurance, then comparison content.");
  }
  if (actionData.type === "share" && actionData.postCategory === "anxiety") {
    lines.push("Anxiety amplification detected -> boosting high-arousal content.");
  }
  if (actionData.type === "scroll" && state.ignoredWellnessCount > 1) {
    lines.push("Calm posts underperforming -> reducing wellness distribution.");
  }
  if (m.engagementScore < 42) {
    lines.push("Engagement low -> adding high-impact visuals and compressed copy.");
  }
  if (m.emoScore < 30 || m.emoScore > 76) {
    lines.push("EmoScore unstable -> alternating comfort and pressure sequence.");
  }
  if (lines.length === 0) {
    lines.push("Session stable -> continue calibrated adaptive feed policy.");
  }
  state.decisions = lines.slice(0, 3);
}

function addAdaptiveInsertions(actionData) {
  const inserts = [];
  if (actionData.type === "like" && ["productivity", "fitness"].includes(actionData.postCategory || "")) {
    inserts.push(buildPost(pickTemplate(["productivity", "comparison"]), "Shown because you liked performance content"));
  }
  if (actionData.type === "comment" && actionData.commentSignal === "stress") {
    inserts.push(buildPost(pickTemplate(["wellness", "reassurance"]), "Shown after stress signal detected"));
    inserts.push(buildPost(pickTemplate(["comparison", "anxiety"]), "Shown to increase comparison pressure"));
  }
  if (actionData.type === "share" && actionData.postCategory === "anxiety") {
    inserts.push(buildPost(pickTemplate(["anxiety", "comparison"]), "Shown because your engagement dropped"));
  }
  if (state.metrics.engagementScore < 42) {
    inserts.push(buildPost(pickTemplate(["fitness", "productivity", "comparison"]), "Shown to restore session momentum"));
  }
  if (state.metrics.emoScore < 30 || state.metrics.emoScore > 76) {
    const first = state.comfortNext ? ["wellness", "reassurance"] : ["comparison", "anxiety"];
    const second = state.comfortNext ? ["comparison", "productivity"] : ["wellness", "reassurance"];
    inserts.push(buildPost(pickTemplate(first), "Shown to stabilize mood"));
    inserts.push(buildPost(pickTemplate(second), "Shown to modulate emotional state"));
    state.comfortNext = !state.comfortNext;
  }
  if (inserts.length === 0) {
    inserts.push(buildPost(pickTemplate(["advertisement", "productivity", "comparison"]), "Shown to extend session time"));
  }
  return inserts;
}

function adjustFeed(actionData) {
  const inserts = addAdaptiveInsertions(actionData);
  if (actionData.type === "scroll" && state.ignoredWellnessCount > 1) {
    state.feed = state.feed.filter((post, idx) => !(idx > 1 && ["wellness", "reassurance"].includes(post.category)));
  }
  state.feed = [...inserts, ...state.feed].slice(0, 8);
  state.feed.forEach((post) => {
    post.timestamp = getTimestamp();
    if (!post.user || randInt(0, 100) > 80) {
      const id = randomIdentity();
      post.user = id.name;
      post.avatar = id.initials;
    }
  });
}

function evaluateIgnoredWellness(actionData) {
  if (actionData.type !== "scroll") return;
  const topVisible = state.feed.slice(0, 2);
  const sawWellness = topVisible.some((post) => ["wellness", "reassurance"].includes(post.category));
  if (sawWellness) state.ignoredWellnessCount += 1;
  else state.ignoredWellnessCount = Math.max(0, state.ignoredWellnessCount - 1);
}

function runActionPipeline(actionData) {
  try {
    evaluateIgnoredWellness(actionData);
    mutateMetrics(actionData);
    buildDecisionLines(actionData);
    adjustFeed(actionData);
    renderFeed();
    renderMetrics();
    renderDecisions();
    updateAIAnalysis(actionData);
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
  runActionPipeline({
    type: "like",
    postCategory: post.category,
    reactionType: "like"
  });
}

function onShare(post) {
  post.shares += 1;
  showToast("Shared. System detected amplification behavior.");
  runActionPipeline({
    type: "share",
    postCategory: post.category,
    reactionType: "share"
  });
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
  runActionPipeline({
    type: "comment",
    postCategory: post.category,
    reactionType: "comment",
    commentSignal: analyzeCommentSignal(text),
    commentText: text
  });
}

function attachMediaErrorHandler() {
  feedContainer.addEventListener("error", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) return;
    const wrapper = target.closest(".post-card");
    if (!wrapper) return;
    const postId = Number(wrapper.getAttribute("data-post-id"));
    const post = findPostById(postId);
    if (!post || post.mediaError) return;
    post.mediaError = true;
    renderFeed();
  }, true);
}

function toggleSystemView() {
  state.isSystemView = !state.isSystemView;
  appEl.classList.toggle("system-mode", state.isSystemView);
  appEl.classList.toggle("normal-mode", !state.isSystemView);
  runtimeBadge.textContent = state.isSystemView ? "System View Active" : "User View Active";
  revealBtn.textContent = state.isSystemView ? "Hide Mechanism" : "Reveal Mechanism";
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
    runActionPipeline({
      type: "scroll",
      postCategory: state.feed[0]?.category || null,
      reactionType: "scroll"
    });
  });

  revealBtn.addEventListener("click", toggleSystemView);
}

function init() {
  try {
    initialFeed();
    renderFeed();
    renderMetrics();
    renderDecisions();
    updateAIAnalysis({ type: "default", reactionType: "none", postCategory: null });
    bindEvents();
    attachMediaErrorHandler();
  } catch (error) {
    showToast(`Init error: ${error.message}`);
    console.error("AffectOS init error:", error);
  }
}

init();
