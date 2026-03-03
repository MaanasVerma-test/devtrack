import { useState, useEffect } from "react";

function App() {
  const [skillInput, setSkillInput] = useState("");

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem("skills");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedSkill, setSelectedSkill] = useState("");
  const [hours, setHours] = useState("");
  const [note, setNote] = useState("");

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem("logs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  const addSkill = () => {
    if (skillInput.trim() === "") return;
    if (skills.some((s) => s.name === skillInput)) return;

    setSkills([...skills, { name: skillInput, completed: false }]);
    setSkillInput("");
  };

  const deleteSkill = (name) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete "${name}"?\nAll logs related to this skill will also be deleted.`
  );

  if (!confirmDelete) return;

  setSkills(skills.filter((s) => s.name !== name));
  setLogs(logs.filter((log) => log.skill !== name));
};

  const toggleComplete = (name) => {
    setSkills(
      skills.map((s) =>
        s.name === name ? { ...s, completed: !s.completed } : s
      )
    );
  };

  const addLog = () => {
    if (!selectedSkill || !hours) return;

    const today = new Date().toISOString().split("T")[0];

    const newLog = {
      date: today,
      skill: selectedSkill,
      hours,
      note,
    };

    const filteredLogs = logs.filter(
      (log) => !(log.date === today && log.skill === selectedSkill)
    );

    setLogs([...filteredLogs, newLog]);
    setHours("");
    setNote("");
  };

  const totalHours = logs.reduce(
    (sum, log) => sum + Number(log.hours),
    0
  );

  const getStreak = () => {
    if (logs.length === 0) return 0;

    const dates = [...new Set(logs.map((log) => log.date))]
      .sort()
      .reverse();

    let streak = 0;
    let currentDate = new Date();

    for (let i = 0; i < dates.length; i++) {
      const logDate = new Date(dates[i]);
      const diff =
        (currentDate - logDate) / (1000 * 60 * 60 * 24);

      if (Math.floor(diff) === streak) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const currentStreak = getStreak();

  const sectionStyle = {
  backgroundColor: "#f2ee7571",
  border: "1px solid #000000",
  padding: "20px",
  marginBottom: "20px",
};
  

  const buttonStyle = {
    padding: "6px 10px",
    marginLeft: "6px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        fontFamily: "Arial",
        color: "#000",
      }}
    >
      <h1>DevTrack</h1>

      {/* Skills */}
      <div style={sectionStyle}>
        <h2>Skills</h2>
        <input
          type="text"
          placeholder="Add skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />
        <button style={buttonStyle} onClick={addSkill}>
          Add
        </button>

        <ul>
          {[...skills]
  .sort((a, b) => a.completed - b.completed)
  .map((s, index) => (
            <li key={index} style={{ marginTop: "10px" }}>
              <span
                style={{
                  textDecoration: s.completed
                    ? "line-through"
                    : "none",
                  marginRight: "10px",
                }}
              >
                {s.name}
              </span>

              <button
                style={buttonStyle}
                onClick={() => toggleComplete(s.name)}
              >
                {s.completed ? "Undo" : "Complete"}
              </button>

              <button
                style={buttonStyle}
                onClick={() => deleteSkill(s.name)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Log */}
      <div style={sectionStyle}>
        <h2>Add Daily Log</h2>

        <select
          value={selectedSkill}
          onChange={(e) =>
            setSelectedSkill(e.target.value)
          }
        >
          <option value="">Select Skill</option>
          {skills
            .filter((s) => !s.completed)
            .map((s, index) => (
              <option key={index} value={s.name}>
                {s.name}
              </option>
            ))}
        </select>

        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          style={{ marginLeft: "6px" }}
        />

        <input
          type="text"
          placeholder="What did you do?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ marginLeft: "6px" }}
        />

        <button style={buttonStyle} onClick={addLog}>
          Save
        </button>
      </div>

      {/* Dashboard */}
      <div style={sectionStyle}>
        <h2>Dashboard</h2>
        <p>Total Hours: {totalHours}</p>
        <p>Total Logs: {logs.length}</p>
        <p>Current Streak: {currentStreak} days</p>
      </div>

      {/* Logs */}
      <div style={sectionStyle}>
        <h2>Logs</h2>
        <ul>
          {logs.map((log, index) => (
            <li key={index} style={{ marginTop: "6px" }}>
              {log.date} | {log.skill} | {log.hours} hrs | {log.note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;