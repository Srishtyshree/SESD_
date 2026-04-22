import { useState } from "react";

async function callAssistant(text, mode) {
  const labels = { continue: "CONTINUATION", feedback: "LITERARY FEEDBACK", title: "SUGGESTED TITLES" };
  const mockResponses = {
    continue: "The silver light of the moon spilled across the floor, tracing patterns that felt like a language long forgotten. I reached out, my fingers almost touching the surface of the meridian glass...",
    feedback: "Your prose has a beautiful weight to it. The imagery of the salt-water maps is particularly striking. Try to vary the sentence length in the second paragraph to create a more rhythmic flow.",
    title: "1. The Salt-Water Cartographer\n2. Echoes of the Meridian\n3. The Silent Lighthouse\n4. Maps of Ghostly Tides\n5. The Keeper's Lullaby",
  };
  
  await new Promise(r => setTimeout(r, 1500));
  return { text: mockResponses[mode] || "The archive is stirring...", label: labels[mode] };
}

export function QuillPage() {
  const [draft, setDraft] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(null);

  const run = async (m) => {
    if (!draft.trim() || loading) return;
    setMode(m);
    setLoading(true);
    setOutput(null);
    try {
      const result = await callAssistant(draft, m);
      setOutput(result);
    } catch {
      setOutput({ text: "The archive is momentarily closed. Please try again.", label: "ERROR" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="quill-layout">
        <div className="quill-editor-pane">
          <div className="quill-editor-top">
            <span className="quill-editor-title">✦ THE QUILL — YOUR WRITING DESK</span>
            <span className="quill-char-count">{draft.length} characters</span>
          </div>
          <textarea
            className="quill-textarea"
            placeholder={"Begin writing here…\n\nThe archive listens. Every word you place here becomes part of its quiet, perpetual hum."}
            value={draft}
            onChange={e => setDraft(e.target.value)}
          />
        </div>

        <div className="quill-ai-pane">
          <div className="quill-ai-top">
            <div className="quill-ai-title">ARCHIVE COMPANION</div>
            <div className="quill-ai-sub">Guided by the spirits of the stacks</div>
          </div>

          <div className="quill-actions">
            <button className="quill-btn quill-btn-cont" onClick={() => run("continue")} disabled={!draft.trim() || loading}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              CONTINUE MY WRITING
            </button>
            <button className="quill-btn quill-btn-feed" onClick={() => run("feedback")} disabled={!draft.trim() || loading}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              GET LITERARY FEEDBACK
            </button>
            <button className="quill-btn quill-btn-title" onClick={() => run("title")} disabled={!draft.trim() || loading}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>
              SUGGEST A TITLE
            </button>
          </div>

          <div className="quill-output">
            {loading && (
              <div>
                <div className="quill-output-label">
                  {mode === "continue" ? "CONTINUING" : mode === "feedback" ? "READING" : "CONSIDERING"} YOUR WORK…
                </div>
                <p className="quill-loading">The archive is stirring…</p>
              </div>
            )}
            {!loading && output && (
              <div>
                <div className="quill-output-label">{output.label}</div>
                <p className="quill-output-txt">{output.text}</p>
              </div>
            )}
            {!loading && !output && (
              <div className="quill-empty">
                <p>Write something in the desk beside you, then ask the archive companion for guidance.</p>
                <div style={{ marginTop: 28, color: "#c9a252", fontSize: 24, opacity: .25 }}>✦</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
