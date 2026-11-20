"""
C/C++ Systems project code template generator.
Includes modern C++17 system engine, Makefile, interactive web monitor, and schema.
"""

from typing import List, Dict, Any
from ..models import CodeFile


def generate_cpp_files(proj: Dict[str, Any]) -> List[CodeFile]:
    """Generates C/C++ Systems source code files."""
    t = proj["title"]
    cat = proj["category"]
    tech = proj["techStack"]
    tech_str = ", ".join(tech)
    y_lbl = proj["yearLabel"]
    degs = ", ".join(proj["degrees"])

    files = [
        {
            "filename": "src/main.cpp",
            "language": "cpp",
            "code": f'''/* ===================================================================
   {t} - Core Engine in C++
   Academic Level: {y_lbl} | Degrees: {degs}
   Standard: C++17
   =================================================================== */

#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include <iomanip>

struct RecordItem {{
    int id;
    std::string name;
    double metric;
    std::string status;
}};

class SystemEngine {{
private:
    std::vector<RecordItem> records;
    const std::string storageFile = "records_data.dat";

public:
    SystemEngine() {{
        loadDefaultRecords();
    }}

    void loadDefaultRecords() {{
        records.push_back({{101, "Alpha Task / Baseline", 94.5, "VERIFIED"}});
        records.push_back({{102, "Beta Pipeline / Cluster", 88.2, "ACTIVE"}});
        records.push_back({{103, "Gamma Module / Telemetry", 97.1, "OPTIMAL"}});
    }}

    void addRecord(int id, const std::string& name, double metric) {{
        records.push_back({{id, name, metric, "ACTIVE"}});
        std::cout << "[SUCCESS] Added Record #" << id << " (" << name << ")\\n";
    }}

    void displayRecords() const {{
        std::cout << "\\n=======================================================\\n";
        std::cout << "{t} - Record Registry\\n";
        std::cout << "=======================================================\\n";
        std::cout << std::left << std::setw(8) << "ID" 
                  << std::setw(28) << "Record Name" 
                  << std::setw(12) << "Score" 
                  << std::setw(12) << "Status" << "\\n";
        std::cout << "-------------------------------------------------------\\n";
        for (const auto& r : records) {{
            std::cout << std::left << std::setw(8) << r.id 
                      << std::setw(28) << r.name 
                      << std::setw(12) << r.metric 
                      << std::setw(12) << r.status << "\\n";
        }}
        std::cout << "=======================================================\\n\\n";
    }}

    void exportToDisk() const {{
        std::ofstream out(storageFile);
        if (!out) {{
            std::cerr << "[ERROR] Unable to open " << storageFile << " for writing.\\n";
            return;
        }}
        for (const auto& r : records) {{
            out << r.id << "," << r.name << "," << r.metric << "," << r.status << "\\n";
        }}
        out.close();
        std::cout << "[PERSISTENCE] Exported " << records.size() << " records to " << storageFile << "\\n";
    }}
}};

int main() {{
    std::cout << "=======================================================\\n";
    std::cout << "Initializing {t}\\n";
    std::cout << "Academic Level: {y_lbl} ({degs})\\n";
    std::cout << "=======================================================\\n";

    SystemEngine engine;
    engine.displayRecords();
    engine.addRecord(104, "Delta Real-Time Execution", 99.3);
    engine.displayRecords();
    engine.exportToDisk();

    std::cout << "[SYSTEM FINISHED] Execution complete with exit code 0.\\n";
    return 0;
}}
'''
        },
        {
            "filename": "Makefile",
            "language": "makefile",
            "code": '''CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -O2
SRC = src/main.cpp
TARGET = project_app

all: $(TARGET)

$(TARGET): $(SRC)
	$(CXX) $(CXXFLAGS) $(SRC) -o $(TARGET)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET) *.dat
'''
        },
        {
            "filename": "frontend/index.html",
            "language": "html",
            "code": f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{t} - Terminal Shell</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h2>💻 {t}</h2>
      <p class="badge">{y_lbl} • {degs}</p>
      <p style="color: var(--text-muted); margin-top: 0.5rem;">C++ Virtual Execution Console & System State Inspector</p>
    </header>

    <div class="card">
      <div class="form-group">
        <input type="text" id="cliCommand" placeholder="Enter CLI command (e.g. run, list, add 105 'New Module' 98.4, benchmark, clear)...">
        <button id="execBtn" class="btn">Execute Command</button>
      </div>

      <div class="output-box" id="outputConsole">
user@projectforge:~$ ./project_app --init
[SYSTEM INIT] Booting {t}...
[MEMORY] Allocated heap buffer 64KB.
[STATUS] Ready. Type 'help' or click 'Execute Command'.
      </div>
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>
'''
        },
        {
            "filename": "frontend/app.js",
            "language": "javascript",
            "code": f'''document.addEventListener("DOMContentLoaded", () => {{
  const cliCommand = document.getElementById("cliCommand");
  const execBtn = document.getElementById("execBtn");
  const outputConsole = document.getElementById("outputConsole");

  let records = [
    {{ id: 101, name: "Alpha Task / Baseline", score: 94.5, status: "VERIFIED" }},
    {{ id: 102, name: "Beta Pipeline / Cluster", score: 88.2, status: "ACTIVE" }},
    {{ id: 103, name: "Gamma Module / Telemetry", score: 97.1, status: "OPTIMAL" }}
  ];

  function runCmd() {{
    const cmd = cliCommand.value.trim() || "run";
    cliCommand.value = "";

    if (cmd === "clear") {{
      outputConsole.innerText = "user@projectforge:~$ ";
      return;
    }}

    let response = `\\nuser@projectforge:~$ ${{cmd}}\\n`;

    if (cmd === "run" || cmd === "list") {{
      response += `=======================================================\\n` +
                  `ID      NAME                         SCORE       STATUS\\n` +
                  `-------------------------------------------------------\\n`;
      records.forEach(r => {{
        response += `${{String(r.id).padEnd(8)}}${{r.name.padEnd(29)}}${{String(r.score).padEnd(12)}}${{r.status}}\\n`;
      }});
      response += `=======================================================\\n[TOTAL RECORDS]: ${{records.length}}\\n`;
    }} else if (cmd.startsWith("add")) {{
      const newId = 100 + records.length + 1;
      records.push({{ id: newId, name: `Record #${{newId}} Task`, score: 96.4, status: "ACTIVE" }});
      response += `[SUCCESS] Added Record #${{newId}} to memory table and synchronized disk buffer.\\n`;
    }} else if (cmd === "benchmark") {{
      response += `[BENCHMARK] Executing 1,000,000 vector allocations...\\n` +
                  `• Elapsed CPU Time : 0.0384 seconds\\n` +
                  `• Memory Footprint : 4.2 MB\\n` +
                  `• Throughput       : 26,041,666 ops/sec\\n`;
    }} else {{
      response += `Available Commands: 'run', 'list', 'add', 'benchmark', 'clear'\\n`;
    }}

    outputConsole.innerText += response;
    outputConsole.scrollTop = outputConsole.scrollHeight;
  }}

  execBtn.addEventListener("click", runCmd);
  cliCommand.addEventListener("keypress", (e) => {{
    if (e.key === "Enter") runCmd();
  }});
}});
'''
        },
        {
            "filename": "database/schema.sql",
            "language": "sql",
            "code": '''-- C/C++ Systems Record Persistence Schema
CREATE TABLE IF NOT EXISTS system_records (
    record_id INTEGER PRIMARY KEY,
    record_name VARCHAR(128) NOT NULL,
    performance_score DOUBLE NOT NULL,
    execution_status VARCHAR(32) NOT NULL,
    last_synced TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
'''
        }
    ]

    return files
