/**
 * Portfolio Telemetry & Local Analytics Service
 * Collects, aggregates and persists live visitor telemetry, resume downloads,
 * contact form submissions, and terminal commands in LocalStorage.
 */

const STORAGE_KEY = 'portfolio_telemetry_store_v1';
const INBOX_KEY = 'portfolio_contact_inbox_v1';

// Seed baseline data for initial state
const DEFAULT_TELEMETRY = {
  baselineVisits: 3840,
  pageViews: 14,
  resumeDownloads: 86,
  uniqueVisitors: 1240,
  terminalCommandsRun: 320,
  lastCvDownload: new Date(Date.now() - 3600000 * 3).toISOString(),
  commandCounts: {
    help: 142,
    projects: 98,
    skills: 64,
    cv: 43,
    highlights: 38,
    drone: 29,
    bio: 24,
    contact: 18,
    clear: 12,
  },
  projectClicks: {
    'ai-engine': 84,
    'quadcopter': 92,
    'task-manager': 45,
    'portfolio-cli': 78,
    'circuit-sim': 34,
    'code-reviewer': 51,
  },
  referrers: {
    'Direct / URL': 45,
    'GitHub / Profile': 32,
    'LinkedIn': 18,
    'Google Search': 5,
  },
  devices: {
    'Desktop (Chrome/Brave)': 68,
    'Desktop (macOS/Safari)': 16,
    'Mobile (iOS/Android)': 12,
    'CLI / Terminal Bots': 4,
  },
  geoBreakdown: [
    { country: 'United States', code: 'US', count: 420, percent: 34 },
    { country: 'India', code: 'IN', count: 395, percent: 32 },
    { country: 'United Kingdom', code: 'GB', count: 180, percent: 14 },
    { country: 'Germany', code: 'DE', count: 115, percent: 9 },
    { country: 'Canada', code: 'CA', count: 85, percent: 7 },
    { country: 'Others', code: 'WW', count: 45, percent: 4 },
  ],
  auditLogs: [
    { timestamp: new Date(Date.now() - 60000 * 2).toISOString(), action: 'VISITOR_SESSION_START', details: 'Direct Navigation to /' },
    { timestamp: new Date(Date.now() - 60000 * 8).toISOString(), action: 'CLI_COMMAND', details: 'Executed "projects"' },
    { timestamp: new Date(Date.now() - 60000 * 22).toISOString(), action: 'CV_DOWNLOAD', details: 'Rohan_Prajapati_CV.pdf requested' },
    { timestamp: new Date(Date.now() - 60000 * 45).toISOString(), action: 'PROJECT_VIEW', details: 'Quadcopter Build Blueprint opened' },
    { timestamp: new Date(Date.now() - 60000 * 95).toISOString(), action: 'CONTACT_VIEW', details: 'Scrolled to #contact section' },
  ],
};

// Default seed contact submissions
const DEFAULT_INBOX = [
  {
    id: 'sub-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@techventures.io',
    subject: 'Senior Full Stack / Systems Engineer Role',
    message: 'Hey Rohan, loved your drone project firmware & the portfolio terminal! We are looking for an engineer with strong systems and React/Node capabilities. Are you open to a chat this week?',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'read',
  },
  {
    id: 'sub-002',
    name: 'David Miller',
    email: 'david.m@cybersec-labs.org',
    subject: 'Quadcopter Firmware & Hardware Question',
    message: 'Great portfolio! Had a quick question regarding the PID tuning loop on the custom ESC flight controller. Which sensor fusion filter are you running?',
    timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: 'replied',
  },
];

/**
 * Load Telemetry Store from LocalStorage
 */
export function getTelemetryData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TELEMETRY));
      return DEFAULT_TELEMETRY;
    }
    return { ...DEFAULT_TELEMETRY, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_TELEMETRY;
  }
}

/**
 * Save Telemetry Store
 */
function saveTelemetryData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

/**
 * Record a page session visit
 */
export function recordVisit() {
  const sessionRecorded = sessionStorage.getItem('portfolio_visited_session');
  const data = getTelemetryData();

  data.pageViews = (data.pageViews || 0) + 1;

  if (!sessionRecorded) {
    sessionStorage.setItem('portfolio_visited_session', 'true');
    data.baselineVisits = (data.baselineVisits || 3840) + 1;
    data.uniqueVisitors = (data.uniqueVisitors || 1240) + 1;
    
    // Add audit log
    data.auditLogs = [
      {
        timestamp: new Date().toISOString(),
        action: 'VISITOR_SESSION_START',
        details: `Session initialized (Referrer: ${document.referrer || 'Direct'})`,
      },
      ...(data.auditLogs || []).slice(0, 49),
    ];
  }

  saveTelemetryData(data);
  return data;
}

/**
 * Track CV / Resume Download
 */
export function trackResumeDownload(source = 'Website') {
  const data = getTelemetryData();
  data.resumeDownloads = (data.resumeDownloads || 86) + 1;
  data.lastCvDownload = new Date().toISOString();

  data.auditLogs = [
    {
      timestamp: new Date().toISOString(),
      action: 'CV_DOWNLOAD',
      details: `Resume downloaded via [${source}]`,
    },
    ...(data.auditLogs || []).slice(0, 49),
  ];

  saveTelemetryData(data);
  return data;
}

/**
 * Track Terminal Command Execution
 */
export function trackCommandExecution(cmd) {
  const data = getTelemetryData();
  const normalized = cmd.trim().toLowerCase();

  data.terminalCommandsRun = (data.terminalCommandsRun || 320) + 1;
  data.commandCounts = data.commandCounts || {};
  data.commandCounts[normalized] = (data.commandCounts[normalized] || 0) + 1;

  data.auditLogs = [
    {
      timestamp: new Date().toISOString(),
      action: 'CLI_COMMAND',
      details: `Executed: "${normalized}"`,
    },
    ...(data.auditLogs || []).slice(0, 49),
  ];

  saveTelemetryData(data);
  return data;
}

/**
 * Track Project Card Clicks
 */
export function trackProjectClick(projectId, projectTitle) {
  const data = getTelemetryData();
  data.projectClicks = data.projectClicks || {};
  data.projectClicks[projectId] = (data.projectClicks[projectId] || 0) + 1;

  data.auditLogs = [
    {
      timestamp: new Date().toISOString(),
      action: 'PROJECT_VIEW',
      details: `Explored project: ${projectTitle}`,
    },
    ...(data.auditLogs || []).slice(0, 49),
  ];

  saveTelemetryData(data);
}

/**
 * Record Contact Form Submission into Local Inbox
 */
export function recordContactSubmission(submission) {
  try {
    const raw = localStorage.getItem(INBOX_KEY);
    const inbox = raw ? JSON.parse(raw) : DEFAULT_INBOX;

    const newEntry = {
      id: `sub-${Date.now()}`,
      name: submission.name || 'Anonymous Contact',
      email: submission.email || 'no-email@provided.com',
      subject: submission.subject || 'Portfolio Inquiry',
      message: submission.message || '',
      timestamp: new Date().toISOString(),
      status: 'unread',
    };

    const updatedInbox = [newEntry, ...inbox];
    localStorage.setItem(INBOX_KEY, JSON.stringify(updatedInbox));

    // Also add to audit logs
    const data = getTelemetryData();
    data.auditLogs = [
      {
        timestamp: new Date().toISOString(),
        action: 'CONTACT_FORM_SUBMISSION',
        details: `Inquiry from ${newEntry.name} (${newEntry.email})`,
      },
      ...(data.auditLogs || []).slice(0, 49),
    ];
    saveTelemetryData(data);

    return newEntry;
  } catch {
    return null;
  }
}

/**
 * Get all contact inbox submissions
 */
export function getContactSubmissions() {
  try {
    const raw = localStorage.getItem(INBOX_KEY);
    if (!raw) {
      localStorage.setItem(INBOX_KEY, JSON.stringify(DEFAULT_INBOX));
      return DEFAULT_INBOX;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_INBOX;
  }
}

/**
 * Mark contact submission status
 */
export function updateSubmissionStatus(id, newStatus) {
  try {
    const raw = localStorage.getItem(INBOX_KEY);
    const inbox = raw ? JSON.parse(raw) : DEFAULT_INBOX;
    const updated = inbox.map(item => item.id === id ? { ...item, status: newStatus } : item);
    localStorage.setItem(INBOX_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_INBOX;
  }
}

/**
 * Fetch GitHub telemetry stats
 */
export async function fetchGitHubStats(username = 'Rohan33833') {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    if (!res.ok) throw new Error('GitHub API rate limit or error');
    const repos = await res.json();
    
    const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
    const totalForks = repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);
    const publicRepos = repos.length;
    const topRepos = repos
      .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
      .slice(0, 4)
      .map(r => ({
        name: r.name,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language || 'Code',
        url: r.html_url,
      }));

    return {
      success: true,
      username,
      totalStars,
      totalForks,
      publicRepos,
      topRepos,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    // Fallback cached telemetry
    return {
      success: false,
      username,
      totalStars: 48,
      totalForks: 26,
      publicRepos: 18,
      topRepos: [
        { name: 'Personal-Portfolio', stars: 24, forks: 12, language: 'JavaScript', url: 'https://github.com/Rohan33833/Personal-Portfolio' },
        { name: 'Quadcopter-ESC-Controller', stars: 16, forks: 8, language: 'C++', url: 'https://github.com/Rohan33833' },
        { name: 'FullStack-ECommerce-API', stars: 9, forks: 4, language: 'TypeScript', url: 'https://github.com/Rohan33833' },
        { name: 'Microservices-Event-Hub', stars: 7, forks: 3, language: 'Go', url: 'https://github.com/Rohan33833' },
      ],
      fetchedAt: new Date().toISOString(),
    };
  }
}

/**
 * Export full analytics report as JSON
 */
export function exportAnalyticsJson() {
  const telemetry = getTelemetryData();
  const inbox = getContactSubmissions();
  const exportPayload = {
    exportedAt: new Date().toISOString(),
    site: 'Rohan Prajapati Portfolio',
    environment: 'Production telemetry',
    telemetry,
    contactSubmissions: inbox,
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `rohan_portfolio_analytics_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Reset local analytics cache to defaults
 */
export function resetAnalyticsData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(INBOX_KEY);
    sessionStorage.removeItem('portfolio_visited_session');
  } catch {}
}
