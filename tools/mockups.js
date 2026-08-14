/* mockups.js — built replacements for the export's <image-slot> drop zones.
   Keyed by the slot id in the .dc.html. Anything not listed here falls back to
   a labelled placeholder, so adding a real screenshot later just means deleting
   the entry. Every mockup is HTML/CSS only — no image files. */
module.exports = {

  /* 00 — the four top-level folders in a file-manager window */
  "s1-setup": `
<div class="win" role="img" aria-label="A file manager window showing four top-level folders: Studies, Development, Upskilling, Career">
  <div class="wbar"><span class="wdot r"></span><span class="wdot a"></span><span class="wdot e"></span><span class="wtitle">Home</span></div>
  <div class="wbody">
    <div class="folder"><span class="ficon"></span><span class="fname">Studies</span></div>
    <div class="folder"><span class="ficon"></span><span class="fname">Development</span></div>
    <div class="folder"><span class="ficon"></span><span class="fname">Upskilling</span></div>
    <div class="folder"><span class="ficon"></span><span class="fname">Career</span></div>
  </div>
</div>`,

  /* 01 — a real term folder, deliberately not tidied */
  "s2-y3t3": `
<div class="win" role="img" aria-label="A term folder named Y3T3 containing subject folders including Algorithms, Rizal and PE">
  <div class="wbar"><span class="wdot r"></span><span class="wdot a"></span><span class="wdot e"></span><span class="wtitle">Studies / BS Computer Science / Courses / Y3T3</span></div>
  <div class="wbody">
    <div class="folder"><span class="ficon"></span><span class="fname">Algorithms and Complexity</span></div>
    <div class="folder"><span class="ficon"></span><span class="fname">Software Engineering</span></div>
    <div class="folder"><span class="ficon"></span><span class="fname">Life and Works of Rizal</span></div>
    <div class="folder"><span class="ficon"></span><span class="fname">Physical Education 3</span></div>
    <div class="folder"><span class="ficon"></span><span class="fname">Technopreneurship</span></div>
    <div class="folder"><span class="ficon"></span><span class="fname">Thesis 1</span></div>
  </div>
</div>`,

  /* 03 — open a file: one document, nothing else */
  "s3-file": `
<div class="vsc solo" role="img" aria-label="VS Code with a single file open and no sidebar">
  <div class="vtop"><span>main.py</span></div>
  <div class="vmain"><div class="vedit">1  print("hello")<br>2<br>3</div></div>
</div>`,

  /* 03 — open a folder: tree, terminal, source control */
  "s4-folder": `
<div class="vsc" role="img" aria-label="VS Code with a whole project folder open, showing the file tree, editor and terminal">
  <div class="vtop"><span>schedule-tracker</span></div>
  <div class="vmain">
    <div class="vside">src/<br>README.md<br>.gitignore<br>requirements.txt</div>
    <div class="vedit">1  import calendar<br>2<br>3  def week():</div>
  </div>
  <div class="vterm">$ python src/main.py</div>
</div>`,

  /* 04 — one week, four colour-separated calendars */
  "s5-calendar": `
<div class="calweek" role="img" aria-label="A calendar week view with classes, deadlines, org events and personal time in separate colours">
  <div class="calday"><div class="dh">Mon</div><div class="calev cls">Algorithms 9:00</div><div class="calev per">Gym 18:00</div></div>
  <div class="calday"><div class="dh">Tue</div><div class="calev cls">Software Eng 13:00</div><div class="calev ddl">Lab due</div></div>
  <div class="calday"><div class="dh">Wed</div><div class="calev cls">Algorithms 9:00</div><div class="calev org">CS Society 17:00</div></div>
  <div class="calday"><div class="dh">Thu</div><div class="calev cls">Rizal 10:00</div><div class="calev per">Practice 19:00</div></div>
  <div class="calday"><div class="dh">Fri</div><div class="calev cls">Software Eng 13:00</div><div class="calev ddl">Quiz</div></div>
</div>`,

  /* 06 — a school dashboard that links rather than stores */
  "s6-notion": `
<div class="ndash" role="img" aria-label="A Notion dashboard with a page per subject, a deadline list and a term overview">
  <div class="ncard"><div class="nh">Algorithms</div><div class="nrow">Lecture notes</div><div class="nrow">LMS link</div><div class="nrow">Midterm reviewer</div></div>
  <div class="ncard"><div class="nh">Software Eng</div><div class="nrow">Project board</div><div class="nrow">Meeting notes</div><div class="nrow">Repo link</div></div>
  <div class="ncard"><div class="nh">Deadlines</div><div class="nrow">Lab · Aug 18</div><div class="nrow">Quiz · Aug 22</div><div class="nrow">Defense · Sep 3</div></div>
  <div class="ncard"><div class="nh">This term</div><div class="nrow">6 subjects</div><div class="nrow">2 certificates</div><div class="nrow">1 capstone</div></div>
</div>`,

  /* 07 — the four regions of the editor, labelled */
  "s7-vscode": `
<div class="vsc" role="img" aria-label="VS Code with a project open, labelled Explorer, Editor, Terminal and Source Control">
  <div class="vtop"><span>schedule-tracker</span></div>
  <div class="vmain">
    <div class="vside"><span class="hot" style="top:6px;left:6px">Explorer</span><span class="hot" style="bottom:6px;left:6px">Source control</span><br>src/<br>README.md<br>requirements.txt<br><br><br>main</div>
    <div class="vedit"><span class="hot" style="top:6px;left:6px">Editor</span><br><br>1  import calendar</div>
  </div>
  <div class="vterm"><span class="hot" style="top:-2px;left:6px">Terminal</span><br>$ python src/main.py</div>
</div>`
};
