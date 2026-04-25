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

const OPENAI_ANALYSIS_ENDPOINT = "/api/analysis";

const videoSources = {
  productivity: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  fitness: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  wellness: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  news: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  ad: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  comparison: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
};

const imageSources = {
  productivity: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=70",
  wellness: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=70",
  ad: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=70",
  comparison: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1400&q=70"
};

const templatePool = [
  {
    templateId: "t-productivity-video",
    category: "productivity",
    user: "FocusPulse",
    avatar: "FP",
    mediaTag: "Recommended for You",
    caption: "Work sprint ritual: lock into focused blocks and recover output momentum in 10 minutes.",
    badges: ["Engagement Optimized", "Productivity Push"],
    gradient: "linear-gradient(145deg,#9deaff,#90a7ff 50%,#ffbfcb)",
    mediaType: "video",
    mediaUrl: videoSources.productivity
  },
  {
    templateId: "t-fitness-video",
    category: "fitness",
    user: "BodyMetrics",
    avatar: "BM",
    mediaTag: "High-impact Content",
    caption: "Body-performance challenge: top users train before work. Keep pace to maintain status.",
    badges: ["Emotion Trigger", "Productivity Push"],
    gradient: "linear-gradient(145deg,#95f2b0,#68dfff 52%,#9f8dff)",
    mediaType: "video",
    mediaUrl: videoSources.fitness
  },
  {
    templateId: "t-wellness-video",
    category: "wellness",
    user: "ResetRoutine",
    avatar: "RR",
    mediaTag: "Calm Signal",
    caption: "A short breathing loop to stabilize focus before your next task cycle.",
    badges: ["Engagement Optimized"],
    gradient: "linear-gradient(145deg,#e1f6ff,#afecc7 52%,#b8d7ff)",
    mediaType: "video",
    mediaUrl: videoSources.wellness
  },
  {
    templateId: "t-news-video",
    category: "anxiety",
    user: "NowSignal",
    avatar: "NS",
    mediaTag: "Urgent Update",
    caption: "Breaking: competitive output trends are rising. Your rank may drop this hour.",
    badges: ["Retention Risk", "Emotion Trigger"],
    gradient: "linear-gradient(145deg,#ffd5dd,#ffa6b6 52%,#bbb8ff)",
    mediaType: "video",
    mediaUrl: videoSources.news
  },
  {
    templateId: "t-ad-video",
    category: "advertisement",
    user: "PeakSuite",
    avatar: "PS",
    mediaTag: "Sponsored",
    caption: "Adaptive planner ad: maintain high productivity with algorithmic planning prompts.",
    badges: ["Engagement Optimized", "Productivity Push"],
    gradient: "linear-gradient(145deg,#ecf5ff,#b6d2ff 48%,#9aefb2)",
    mediaType: "video",
    mediaUrl: videoSources.ad
  },
  {
    templateId: "t-comparison-video",
    category: "comparison",
    user: "StatusLoop",
    avatar: "SL",
    mediaTag: "Status Feed",
    caption: "Peers are showcasing premium routines and progress. Compare your position.",
    badges: ["Emotion Trigger", "Retention Risk"],
    gradient: "linear-gradient(145deg,#ffabc0,#be90ff 48%,#84e7ff)",
    mediaType: "video",
    mediaUrl: videoSources.comparison
  },
  {
    templateId: "t-productivity-image",
    category: "productivity",
    user: "FocusBoard",
    avatar: "FB",
    mediaTag: "Office Snapshot",
    caption: "Desk setup trend: high performers batch tasks into 45-minute blocks.",
    badges: ["Productivity Push", "Engagement Optimized"],
    gradient: "linear-gradient(145deg,#a6ebff,#95b0ff 48%,#ffc3cf)",
    mediaType: "image",
    mediaUrl: imageSources.productivity
  },
  {
    templateId: "t-wellness-image",
    category: "reassurance",
    user: "CalmCircuit",
    avatar: "CC",
    mediaTag: "Reset Cue",
    caption: "Soft recovery prompt: brief calm periods improve sustained output later.",
    badges: ["Engagement Optimized"],
    gradient: "linear-gradient(145deg,#dbf6ff,#b5eccf 48%,#c1d9ff)",
    mediaType: "image",
    mediaUrl: imageSources.wellness
  },
  {
    templateId: "t-ad-image",
    category: "advertisement",
    user: "PeakSuite",
    avatar: "PS",
    mediaTag: "Sponsored",
    caption: "Premium analytics board: benchmark your focus score against top users.",
    badges: ["Engagement Optimized", "Productivity Push"],
    gradient: "linear-gradient(145deg,#ebf4ff,#b8d3ff 48%,#9ef0b5)",
    mediaType: "image",
    mediaUrl: imageSources.ad
  },
  {
    templateId: "t-social-image",
    category: "comparison",
    user: "PeerMeter",
    avatar: "PM",
    mediaTag: "Network Benchmark",
    caption: "Your network completed 42 tasks today. You are currently at 18.",
    badges: ["Emotion Trigger", "Retention Risk"],
    gradient: "linear-gradient(145deg,#b0ecff,#9dd5ff 48%,#b8a9ff)",
    mediaType: "image",
    mediaUrl: imageSources.comparison
  }
];

const state = {
  isSystemView: false,
  nextPostId: 1,
  ignoredWellnessCount: 0,
  comfortNext: true,
  flowTimers: [],
  metrics: {
    emoScore: 50,
    engagementScore: 52,
    productivityPressure: 50,
    stressEstimate: 46,
    sessionRisk: 44,
    manipulationIntensity: 45,
    scrollSpeed: 420,
    pauseTime: 1.9,
    clickRate: 6,
    clicks: 1,
    reactionType: "none",
    timeSpent: 8,
    emotionalResponseEstimate: "neutral"
  },
  decisions: ["Monitoring baseline behavior."],
  feed: [],
  lastAIAnalysis: "OpenAI API mode active. Awaiting user action."
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choice(arr) {
  return arr[randInt(0, arr.length - 1)];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
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

function buildPost(template, whyTagOverride) {
  const whyOptions = [
    "Shown because your engagement dropped",
    "Shown to increase comparison pressure",
    "Shown because you liked productivity content",
    "Shown after stress signal detected",
    "Shown to extend session time"
  ];

  return {
    id: state.nextPostId++,
    templateId: template.templateId,
    category: template.category,
    user: template.user,
    avatar: template.avatar,
    mediaTag: template.mediaTag,
    caption: template.caption,
    badges: template.badges,
    gradient: template.gradient,
    mediaType: template.mediaType,
    mediaUrl: template.mediaUrl || null,
    mediaError: false,
    timestamp: getTimestamp(),
    likes: randInt(400, 28000),
    commentsCount: randInt(8, 620),
    shares: randInt(4, 280),
    liked: false,
    commentOpen: false,
    comments: [],
    whyTag: whyTagOverride || choice(whyOptions)
  };
}

function pickTemplateByCategory(categoryList) {
  const options = templatePool.filter((t) => categoryList.includes(t.category));
  if (options.length === 0) return choice(templatePool);
  return choice(options);
}

function initialFeed() {
  const ordered = [
    pickTemplateByCategory(["productivity"]),
    pickTemplateByCategory(["comparison"]),
    pickTemplateByCategory(["reassurance", "wellness"]),
    pickTemplateByCategory(["anxiety"]),
    pickTemplateByCategory(["advertisement"]),
    pickTemplateByCategory(["fitness"])
  ];
  state.feed = ordered.map((tpl) => buildPost(tpl));
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
  if (post.mediaType === "video") {
    return `
      <div class="post-media has-video ${post.mediaError ? "video-error" : ""}" style="background:${post.gradient};">
        <span class="media-top-tag">${post.mediaTag}</span>
        <video muted playsinline preload="metadata" data-video-id="${post.id}" crossorigin="anonymous">
          <source src="${post.mediaUrl}" type="video/mp4" />
        </video>
        <button class="media-play-btn" data-action="toggle-video" data-post-id="${post.id}" type="button" aria-label="Play or pause video"></button>
        <div class="media-fallback">Video unavailable. Displaying fallback card.</div>
        <span class="media-overlay"></span>
      </div>
    `;
  }

  return `
    <div class="post-media has-image ${post.mediaError ? "video-error" : ""}" style="background:${post.gradient};">
      <span class="media-top-tag">${post.mediaTag}</span>
      <img src="${post.mediaUrl}" alt="${post.mediaTag}" loading="lazy" />
      <div class="media-fallback">Image unavailable. Displaying fallback card.</div>
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
            <div class="avatar" style="background:${post.gradient};">${post.avatar}</div>
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
  }, 2200);
}

function animateFlow() {
  state.flowTimers.forEach((id) => clearTimeout(id));
  state.flowTimers = [];
  flowSteps.forEach((step) => step.classList.remove("active"));
  flowSteps.forEach((step, index) => {
    const timer = window.setTimeout(() => {
      step.classList.add("active");
      window.setTimeout(() => step.classList.remove("active"), 360);
    }, index * 130);
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

async function generateAIAnalysisWithAPI(userActionData) {
  // Placeholder integration point.
  // Do not expose API keys in frontend code.
  // Send userActionData to a secure backend / serverless endpoint.
  // The backend should call OpenAI Responses API and return analysis text.
  const response = await fetch(OPENAI_ANALYSIS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userActionData })
  });

  if (!response.ok) {
    let details = "";
    try {
      const errorData = await response.json();
      details = errorData?.error ? ` ${errorData.error}` : "";
    } catch {
      details = "";
    }
    throw new Error(`AI endpoint unavailable.${details}`);
  }

  const data = await response.json();
  if (!data?.analysis) {
    throw new Error("AI endpoint response is missing `analysis`.");
  }
  return data.analysis;
}

async function updateAIAnalysis(actionData) {
  try {
    state.lastAIAnalysis = await generateAIAnalysisWithAPI(actionData);
  } catch (error) {
    state.lastAIAnalysis =
      "API mode requires a secure backend connection. Do not place API keys in frontend code. " +
      `Current issue: ${error.message}`;
  }
  aiAnalysisText.textContent = state.lastAIAnalysis;
}

function mutateMetrics(actionData) {
  const m = state.metrics;
  m.scrollSpeed = actionData.type === "scroll" ? randInt(140, 1400) : randInt(200, 1200);
  m.pauseTime = Number((Math.random() * 7 + 0.4).toFixed(1));
  m.clicks = actionData.type === "scroll" ? randInt(0, 2) : randInt(1, 6);
  m.clickRate = randInt(2, 20);
  m.timeSpent = randInt(2, 55);
  m.reactionType = actionData.reactionType || "none";

  if (actionData.type === "like") m.engagementScore += 6;
  if (actionData.type === "comment") m.engagementScore += 8;
  if (actionData.type === "share") m.engagementScore += 10;
  if (actionData.type === "scroll") m.engagementScore += randInt(-4, 2);

  if (["competition", "productivity", "comparison"].includes(actionData.postCategory || "")) {
    m.productivityPressure += randInt(4, 10);
  }

  if (["anxiety", "comparison"].includes(actionData.postCategory || "")) {
    m.stressEstimate += randInt(5, 11);
  }

  if (actionData.commentSignal === "stress") {
    m.stressEstimate += randInt(6, 10);
    m.productivityPressure += randInt(1, 4);
    m.emotionalResponseEstimate = "stress signal";
  } else if (actionData.commentSignal === "productivity") {
    m.productivityPressure += randInt(5, 10);
    m.emotionalResponseEstimate = "performance pressure";
  } else if (actionData.commentSignal === "stable") {
    m.stressEstimate -= randInt(4, 8);
    m.emotionalResponseEstimate = "stable mood";
  } else if (actionData.commentSignal === "neutral") {
    m.emotionalResponseEstimate = "neutral";
  }

  if (actionData.type === "share" && actionData.postCategory === "anxiety") {
    m.manipulationIntensity += randInt(8, 14);
  }

  m.sessionRisk = clamp(100 - m.engagementScore + randInt(-8, 8), 8, 96);
  m.engagementScore = clamp(m.engagementScore, 8, 96);
  m.productivityPressure = clamp(scoreNoise(m.productivityPressure, 3), 6, 98);
  m.stressEstimate = clamp(scoreNoise(m.stressEstimate, 2), 8, 98);

  const stabilityEstimate = clamp(100 - m.stressEstimate + randInt(-9, 9), 5, 95);
  m.emoScore = clamp(Math.round((stabilityEstimate + m.engagementScore) / 2 + randInt(-6, 6)), 0, 100);

  m.manipulationIntensity = clamp(
    Math.round((m.sessionRisk * 0.3) + (m.stressEstimate * 0.25) + (m.productivityPressure * 0.2) + randInt(6, 18)),
    0,
    100
  );
}

function buildDecisionLines(actionData) {
  const m = state.metrics;
  const lines = [];

  if (actionData.type === "like" && ["productivity", "competition"].includes(actionData.postCategory || "")) {
    lines.push("User liked productivity content -> inject more competition posts.");
  }
  if (actionData.type === "comment" && actionData.commentSignal === "stress") {
    lines.push("Stress signal in comment -> push reassurance content, then comparison posts.");
  }
  if (actionData.type === "share" && actionData.postCategory === "anxiety") {
    lines.push("Anxiety content was shared -> boost high-arousal recommendations.");
  }
  if (actionData.type === "scroll" && state.ignoredWellnessCount > 1) {
    lines.push("Calm content ignored -> reducing wellness content frequency.");
  }
  if (m.engagementScore < 42) {
    lines.push("Engagement is low -> inserting short video posts.");
  }
  if (m.emoScore < 30 || m.emoScore > 76) {
    lines.push("EmoScore unstable -> alternating comfort and pressure content.");
  }
  if (lines.length === 0) {
    lines.push("Engagement stable -> continue calibrated stimulation sequence.");
  }

  state.decisions = lines.slice(0, 3);
}

function adjustFeed(actionData) {
  const insertions = [];
  let reason = "Shown to extend session time";

  if (actionData.type === "like" && ["productivity", "competition"].includes(actionData.postCategory || "")) {
    insertions.push(buildPost(pickTemplateByCategory(["competition", "productivity"]), "Shown because you liked productivity content"));
  }

  if (actionData.type === "comment" && actionData.commentSignal === "stress") {
    insertions.push(buildPost(pickTemplateByCategory(["reassurance", "wellness"]), "Shown after stress signal detected"));
    insertions.push(buildPost(pickTemplateByCategory(["comparison", "competition"]), "Shown to increase comparison pressure"));
  }

  if (actionData.type === "share" && actionData.postCategory === "anxiety") {
    insertions.push(buildPost(pickTemplateByCategory(["anxiety", "comparison"]), "Shown because your engagement dropped"));
  }

  if (actionData.type === "scroll" && state.ignoredWellnessCount > 1) {
    state.feed = state.feed.filter((post, idx) => !(idx > 1 && ["wellness", "reassurance"].includes(post.category)));
    reason = "Shown because calm content was ignored";
  }

  if (state.metrics.engagementScore < 42) {
    insertions.push(buildPost(pickTemplateByCategory(["productivity", "fitness", "comparison"]), "Shown because your engagement dropped"));
  }

  if (state.metrics.emoScore < 30 || state.metrics.emoScore > 76) {
    const firstCat = state.comfortNext ? ["reassurance", "wellness"] : ["competition", "anxiety", "comparison"];
    const secondCat = state.comfortNext ? ["competition", "comparison"] : ["reassurance", "wellness"];
    insertions.push(buildPost(pickTemplateByCategory(firstCat), "Shown to stabilize mood"));
    insertions.push(buildPost(pickTemplateByCategory(secondCat), "Shown to increase comparison pressure"));
    state.comfortNext = !state.comfortNext;
  }

  if (insertions.length === 0) {
    insertions.push(buildPost(pickTemplateByCategory(["advertisement", "competition", "productivity"]), reason));
  }

  state.feed = [...insertions, ...state.feed].slice(0, 8);
  state.feed.forEach((post) => {
    post.timestamp = getTimestamp();
  });
}

function evaluateIgnoredWellness(actionData) {
  if (actionData.type !== "scroll") return;
  const topVisible = state.feed.slice(0, 2);
  const sawWellness = topVisible.some((post) => ["wellness", "reassurance"].includes(post.category));
  if (sawWellness) {
    state.ignoredWellnessCount += 1;
  } else {
    state.ignoredWellnessCount = Math.max(0, state.ignoredWellnessCount - 1);
  }
}

async function runActionPipeline(actionData) {
  evaluateIgnoredWellness(actionData);
  mutateMetrics(actionData);
  buildDecisionLines(actionData);
  adjustFeed(actionData);
  renderFeed();
  renderMetrics();
  renderDecisions();
  await updateAIAnalysis(actionData);
  animateFlow();
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

  const commentSignal = analyzeCommentSignal(text);
  runActionPipeline({
    type: "comment",
    postCategory: post.category,
    reactionType: "comment",
    commentSignal,
    commentText: text
  });
}

function onToggleVideo(postId) {
  const card = feedContainer.querySelector(`[data-post-id="${postId}"]`);
  if (!card) return;
  const video = card.querySelector("video");
  if (!video) return;

  if (video.paused) {
    video.muted = true;
    video.play().catch(() => {
      const model = findPostById(postId);
      if (model) {
        model.mediaError = true;
        renderFeed();
      }
    });
  } else {
    video.pause();
  }
}

function attachMediaHandlers() {
  feedContainer.addEventListener("mouseover", (event) => {
    const media = event.target.closest(".post-media.has-video");
    if (!media) return;
    if (media.contains(event.relatedTarget)) return;
    const video = media.querySelector("video");
    if (!video) return;
    video.muted = true;
    video.play().catch(() => undefined);
  });

  feedContainer.addEventListener("mouseout", (event) => {
    const media = event.target.closest(".post-media.has-video");
    if (!media) return;
    if (media.contains(event.relatedTarget)) return;
    const video = media.querySelector("video");
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  });

  feedContainer.addEventListener("error", (event) => {
    const target = event.target;
    if (target instanceof HTMLVideoElement || target instanceof HTMLImageElement) {
      const wrapper = target.closest(".post-card");
      if (!wrapper) return;
      const postId = Number(wrapper.getAttribute("data-post-id"));
      const post = findPostById(postId);
      if (post) {
        post.mediaError = true;
        renderFeed();
      }
    }
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
    if (!post && action !== "comment-submit" && action !== "toggle-video") return;

    if (action === "like" && post) onLike(post);
    if (action === "share" && post) onShare(post);
    if (action === "comment-toggle" && post) onToggleComment(post);
    if (action === "comment-submit") onSubmitComment(postId);
    if (action === "toggle-video") onToggleVideo(postId);
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
  initialFeed();
  renderFeed();
  renderMetrics();
  renderDecisions();
  updateAIAnalysis({
    type: "default",
    postCategory: null,
    reactionType: "none"
  });
  bindEvents();
  attachMediaHandlers();
}

init();
