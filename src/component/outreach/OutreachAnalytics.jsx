import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import { useGetOutreachAnalyticsQuery } from "../../features/linkedinOutreach/linkedOutreachApi";

// ─── Range map ────────────────────────────────────────────────────────────────
const RANGE_OPTIONS = ["Last 7 Days", "Last 30 Days", "All Time"];
const RANGE_PARAM   = { "Last 7 Days": "7d", "Last 30 Days": "30d", "All Time": "all" };

// ─── Static accent config for stat cards ─────────────────────────────────────
const CARD_META = [
  { label: "Emails Sent",       accent: "#27C4D6", glow: "0 0 24px rgba(39,196,214,0.25)", key: "emailsSent",       sub: (v, prev) => prev ? `${(((v-prev)/prev)*100).toFixed(0)}% ↑` : "" },
  { label: "Emails Opened",     accent: "#7C3AED", glow: "0 0 24px rgba(124,58,237,0.2)",  key: "emailsOpened",     sub: (v, _, total) => total ? `${((v/total)*100).toFixed(1)}% rate` : "" },
  { label: "Connections Sent",  accent: "#0EA5E9", glow: "0 0 24px rgba(14,165,233,0.2)",  key: "connectionsSent",  sub: (v, _, __, acc) => acc != null ? `${acc}% accept rate` : "" },
  { label: "Replies Received",  accent: "#F59E0B", glow: "0 0 24px rgba(245,158,11,0.2)",  key: "repliesReceived",  sub: (v, _, total) => total ? `${((v/total)*100).toFixed(1)}% rate` : "" },
];

const FUNNEL_COLORS = ["#374151", "#06B6D4", "#10B981", "#7C3AED", "#22C55E"];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: "#1E2537", border: "1px solid #27C4D6",
        borderRadius: 8, padding: "8px 14px", color: "#fff", fontSize: 13,
      }}>
        <div style={{ color: "#9CA3AF", marginBottom: 2 }}>{label}</div>
        <div style={{ color: "#27C4D6", fontWeight: 700 }}>{payload[0].value} emails</div>
      </div>
    );
  }
  return null;
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton({ h = 14, w = "100%", r = 6 }) {
  return (
    <div style={{
      height: h, width: w, background: "#1F2937", borderRadius: r,
      animation: "pulse 1.6s ease-in-out infinite",
    }} />
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, subColor, accent, glow, loading }) {
  return (
    <div style={{
      background: "#111827", borderRadius: 14, padding: "22px 24px",
      border: `1px solid ${accent}33`, boxShadow: glow,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${accent}, transparent)`,
        borderRadius: "14px 14px 0 0",
      }} />
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Skeleton h={36} w="50%" />
          <Skeleton h={12} w="70%" />
          <Skeleton h={10} w="40%" />
        </div>
      ) : (
        <>
          <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1, color: "#fff", marginBottom: 6 }}>{value ?? "—"}</div>
          <div style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 8 }}>{label}</div>
          <div style={{ color: subColor || "#9CA3AF", fontSize: 12, fontWeight: 600 }}>{sub}</div>
        </>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OutreachAnalytics() {
  const [range, setRange] = useState("Last 7 Days");
  const rangeParam = RANGE_PARAM[range];

  const { data, isLoading, isError, refetch } = useGetOutreachAnalyticsQuery(rangeParam);

  // Normalise – backend might return various shapes; fall back to empty data gracefully
  const stats            = data?.stats            ?? {};
  const emailPerformance = data?.emailPerformance ?? [];
  const funnelData       = data?.funnel           ?? [];
  const companyRows      = data?.companyPerformance ?? [];

  // Build chart data — backend sends [{ day, emails }] or [{ date, count }]
  const chartData = useMemo(() =>
    emailPerformance.map((d) => ({
      day: d.day ?? d.label ?? d.date?.slice(-5) ?? "",
      emails: d.emails ?? d.count ?? 0,
    })), [emailPerformance]);

  // Find peak bar index
  const peakIdx = chartData.reduce((maxI, d, i, arr) => d.emails > arr[maxI].emails ? i : maxI, 0);

  // Build funnel from data or fallback
  const funnelRows = funnelData.length > 0
    ? funnelData.map((f, i) => ({ ...f, color: FUNNEL_COLORS[i] ?? "#374151" }))
    : [];

  // Compute accept rate
  const acceptRate = stats.connectionsSent
    ? Math.round(((stats.connectionsAccepted ?? 0) / stats.connectionsSent) * 100)
    : null;

  const cards = [
    { ...CARD_META[0], value: stats.emailsSent,      sub: stats.emailsSentChange ? `${stats.emailsSentChange > 0 ? "+" : ""}${stats.emailsSentChange}% ↑` : "—", subColor: "#22C55E" },
    { ...CARD_META[1], value: stats.emailsOpened,    sub: stats.emailsSent ? `${((stats.emailsOpened/stats.emailsSent)*100).toFixed(1)}% rate` : "—", subColor: "#9CA3AF" },
    { ...CARD_META[2], value: stats.connectionsSent, sub: acceptRate != null ? `${acceptRate}% accept rate` : "—", subColor: "#9CA3AF" },
    { ...CARD_META[3], value: stats.repliesReceived, sub: stats.emailsSent ? `${((stats.repliesReceived/stats.emailsSent)*100).toFixed(1)}% rate` : "—", subColor: "#9CA3AF" },
  ];

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1200, minHeight: "100vh", color: "#fff" }}>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>Outreach Analytics</h1>
          <p style={{ margin: "6px 0 0", color: "#9CA3AF", fontSize: 14 }}>Track your outreach performance.</p>
        </div>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          style={{
            background: "#1A1E2C", color: "#fff", border: "1px solid #2D3348",
            borderRadius: 8, padding: "8px 14px", fontSize: 14, cursor: "pointer", outline: "none",
          }}
        >
          {RANGE_OPTIONS.map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>

      {/* Error */}
      {isError && (
        <div style={{
          background: "#EF444415", border: "1px solid #EF444430",
          borderRadius: 12, padding: "14px 20px", marginBottom: 20, color: "#FCA5A5",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          Failed to load analytics.
          <button onClick={() => refetch()}
            style={{ background: "none", border: "none", color: "#27C4D6", cursor: "pointer", fontWeight: 600 }}>
            Retry
          </button>
        </div>
      )}

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {cards.map((card) => (
          <StatCard key={card.label} loading={isLoading} {...card} />
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Bar Chart */}
        <div style={{ background: "#111827", borderRadius: 14, padding: "24px", border: "1px solid #1F2937" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700 }}>Email Performance</h3>
          {isLoading ? (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 220, padding: "0 10px" }}>
              {[60, 85, 70, 100, 75, 65, 40].map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: `${h}%`, background: "#1F2937",
                  borderRadius: "6px 6px 0 0", animation: "pulse 1.6s infinite",
                  animationDelay: `${i * 0.1}s`,
                }} />
              ))}
            </div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barSize={28}>
                <XAxis dataKey="day" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(39,196,214,0.05)" }} />
                <Bar dataKey="emails" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={i === peakIdx ? "#27C4D6" : "#5B6FA8"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: "#4B5563" }}>
              No email data for this period.
            </div>
          )}
        </div>

        {/* Connection Funnel */}
        <div style={{ background: "#111827", borderRadius: 14, padding: "24px", border: "1px solid #1F2937" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700 }}>Connection Funnel</h3>
          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["100%", "72%", "52%", "38%", "26%"].map((w, i) => (
                <div key={i} style={{ height: 38, width: w, background: "#1F2937", borderRadius: 8, animation: "pulse 1.6s infinite" }} />
              ))}
            </div>
          ) : funnelRows.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {funnelRows.map((step, i) => {
                const maxVal = funnelRows[0]?.value || 1;
                const widthPct = `${Math.max(26, Math.round((step.value / maxVal) * 100))}%`;
                return (
                  <div key={step.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      background: step.color, borderRadius: 8, height: 38,
                      width: widthPct, display: "flex", alignItems: "center",
                      justifyContent: "space-between", padding: "0 14px",
                      fontSize: 12, fontWeight: 600,
                      color: i === 0 ? "#9CA3AF" : "#fff",
                      minWidth: 140, boxSizing: "border-box",
                    }}>
                      <span>{step.label}: {step.value}</span>
                      <span style={{ fontSize: 11, opacity: 0.9, whiteSpace: "nowrap" }}>
                        {step.pct ?? `${((step.value / maxVal) * 100).toFixed(1)}%`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", color: "#4B5563" }}>
              No funnel data yet.
            </div>
          )}
        </div>
      </div>

      {/* Company Performance Table */}
      <div style={{ background: "#111827", borderRadius: 14, padding: "24px", border: "1px solid #1F2937" }}>
        <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700 }}>Company Performance</h3>
        {isLoading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} h={36} />)}
          </div>
        ) : companyRows.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Company", "Contacts", "Connected", "Accept Rate", "DMs Sent", "Replies", "Emails Sent", "Email Opens"].map((h) => (
                  <th key={h} style={{
                    textAlign: "left", padding: "8px 14px", color: "#6B7280",
                    fontSize: 13, fontWeight: 600, borderBottom: "1px solid #1F2937",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {companyRows.map((row) => (
                <tr
                  key={row.company ?? row.companyName ?? row.id}
                  style={{ borderBottom: "1px solid #1F293740" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1A1E2C")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "12px 14px", fontSize: 14, fontWeight: 500 }}>{row.company ?? row.companyName}</td>
                  <td style={{ padding: "12px 14px", fontSize: 14, color: "#D1D5DB" }}>{row.contacts ?? 0}</td>
                  <td style={{ padding: "12px 14px", fontSize: 14, color: "#D1D5DB" }}>{row.connected ?? 0}</td>
                  <td style={{ padding: "12px 14px", fontSize: 14 }}>
                    <span style={{ color: (row.acceptRate ?? 0) >= 60 ? "#22C55E" : (row.acceptRate ?? 0) >= 45 ? "#F59E0B" : "#EF4444", fontWeight: 600 }}>
                      {row.acceptRate ?? 0}%
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 14, color: "#D1D5DB" }}>{row.dmsSent ?? 0}</td>
                  <td style={{ padding: "12px 14px", fontSize: 14, color: "#D1D5DB" }}>{row.replies ?? 0}</td>
                  <td style={{ padding: "12px 14px", fontSize: 14, color: "#D1D5DB" }}>{row.emailsSent ?? 0}</td>
                  <td style={{ padding: "12px 14px", fontSize: 14, color: "#D1D5DB" }}>{row.opens ?? row.emailOpens ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#4B5563" }}>
            No company performance data yet.
          </div>
        )}
      </div>
    </div>
  );
}
