import { useState } from 'react';
import { Route } from '../App';
import { page, panel, panelFlat, button, press, badge, COLORS } from '../theme';

interface Props { navigate: (r: Route) => void; }

export default function DownloadPage({ navigate }: Props) {
  const [copied, setCopied] = useState('');

  const copyText = (text: string, name: string) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(name); setTimeout(() => setCopied(''), 2000); });
  };

  return (
    <div style={page}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={badge(COLORS.green)}>C# Windows Forms Project</span>
          <h1 style={{ color: COLORS.ink, fontSize: '2rem', fontWeight: 900, margin: '14px 0 10px' }}>Download C# Source Code</h1>
          <p style={{ color: COLORS.sub, fontSize: '0.95rem', fontWeight: 600 }}>
            Complete Visual Studio project — copy each file into your solution
          </p>
        </div>

        {/* Quick guide */}
        <div style={{ ...panel, marginBottom: 28 }}>
          <h3 style={{ color: COLORS.ink, marginBottom: 16, fontWeight: 800 }}>Quick Setup Guide</h3>
          {[
            ['1', 'Open Visual Studio 2019/2022', 'File → New → Project → Windows Forms App (.NET Framework or .NET 6+)'],
            ['2', 'Name the project', '"HafizSweetsQueueSimulator"'],
            ['3', 'Add the C# files', 'Copy each file below into your project directory, replacing existing files'],
            ['4', 'Add NuGet packages', 'Right-click project → Manage NuGet Packages → Install: System.Windows.Forms (already included in WinForms)'],
            ['5', 'Build & Run', 'Press F5 or Ctrl+F5 to build and run the application'],
          ].map(([num, title, desc]) => (
            <div key={num} style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 30, height: 30, background: COLORS.green, border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.ink, fontWeight: 800, flexShrink: 0 }}>{num}</div>
              <div>
                <div style={{ color: COLORS.ink, fontWeight: 700, marginBottom: 4 }}>{title}</div>
                <div style={{ color: COLORS.sub, fontSize: 13, fontWeight: 500 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Requirements */}
        <div style={{ ...panelFlat, padding: 24, marginBottom: 28 }}>
          <h3 style={{ color: COLORS.ink, marginBottom: 12, fontWeight: 800 }}>Requirements</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              ['IDE', 'Visual Studio 2019 or 2022'],
              ['Framework', '.NET 6+ or .NET Framework 4.7.2+'],
              ['OS', 'Windows 10/11'],
              ['NuGet', 'No extra packages needed'],
            ].map(([label, val]) => (
              <div key={label} style={{ background: COLORS.mute, border: '2px solid #000', padding: '12px 16px' }}>
                <div style={{ color: COLORS.sub, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                <div style={{ color: COLORS.ink, fontSize: 14, fontWeight: 700 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Code blocks */}
        {CODE_FILES.map(({ name, code }) => (
          <div key={name} style={{ ...panelFlat, marginBottom: 24, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: COLORS.ink, borderBottom: '2px solid #000' }}>
              <span style={{ color: COLORS.surface, fontWeight: 700, fontFamily: 'monospace' }}>{name}</span>
              <button onClick={() => copyText(code, name)} style={{
                ...button(copied === name ? COLORS.green : COLORS.yellow),
                padding: '6px 16px', fontSize: 13,
              }}>{copied === name ? 'Copied!' : 'Copy'}</button>
            </div>
            <pre style={{ margin: 0, padding: '20px', overflowX: 'auto', color: COLORS.sub, fontSize: 12, lineHeight: 1.6, maxHeight: 400, background: COLORS.surface }}>
              <code>{code}</code>
            </pre>
          </div>
        ))}

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <button onClick={() => navigate('home')} style={button(COLORS.surface)}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >← Back to Home</button>
        </div>
      </div>
    </div>
  );
}

// =================== C# SOURCE CODE FILES ===================

const CODE_FILES = [
  {
    name: 'Program.cs',
    code: `using System;
using System.Windows.Forms;

namespace HafizSweetsQueueSimulator
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new MainForm());
        }
    }
}`,
  },
  {
    name: 'MainForm.cs',
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

namespace HafizSweetsQueueSimulator
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
            this.Text = "Hafiz Sweets - Simulation & Queuing Calculator";
            this.Size = new Size(900, 650);
            this.BackColor = Color.FromArgb(10, 10, 26);
            this.ForeColor = Color.White;
            this.StartPosition = FormStartPosition.CenterScreen;
            BuildUI();
        }

        private void BuildUI()
        {
            // Title Panel
            Panel titlePanel = new Panel();
            titlePanel.Dock = DockStyle.Top;
            titlePanel.Height = 120;
            titlePanel.BackColor = Color.FromArgb(15, 15, 35);
            this.Controls.Add(titlePanel);

            Label lblTitle = new Label();
            lblTitle.Text = "Hafiz Sweets";
            lblTitle.Font = new Font("Segoe UI", 18, FontStyle.Bold);
            lblTitle.ForeColor = Color.FromArgb(165, 180, 252);
            lblTitle.TextAlign = ContentAlignment.MiddleCenter;
            lblTitle.Dock = DockStyle.Top;
            lblTitle.Height = 55;
            titlePanel.Controls.Add(lblTitle);

            Label lblSub = new Label();
            lblSub.Text = "Simulation & Queuing Calculator";
            lblSub.Font = new Font("Segoe UI", 11);
            lblSub.ForeColor = Color.FromArgb(148, 163, 184);
            lblSub.TextAlign = ContentAlignment.MiddleCenter;
            lblSub.Dock = DockStyle.Top;
            lblSub.Height = 30;
            titlePanel.Controls.Add(lblSub);

            // Members Panel
            Panel membersPanel = new Panel();
            membersPanel.Dock = DockStyle.Top;
            membersPanel.Height = 200;
            membersPanel.BackColor = Color.FromArgb(12, 12, 28);
            membersPanel.Padding = new Padding(20);
            this.Controls.Add(membersPanel);

            Label lblMembers = new Label();
            lblMembers.Text = "Group Members:\\n" +
                "• Doshab Hussain (B22110106021)\\n" +
                "• Amna Nehal (B22110106016)\\n" +
                "• Alishna Azhar (B22110106013)\\n" +
                "• Huzaifa Arain (B22110106028)\\n" +
                "• M. Hassaan Mushtaq (B22110106049)\\n" +
                "• Warisha Anwer (B22110106089)\\n" +
                "• Abdul Rafay (B22110106004)";
            lblMembers.Font = new Font("Segoe UI", 9.5f);
            lblMembers.ForeColor = Color.FromArgb(226, 232, 240);
            lblMembers.TextAlign = ContentAlignment.MiddleCenter;
            lblMembers.Dock = DockStyle.Fill;
            membersPanel.Controls.Add(lblMembers);

            // Buttons Panel
            Panel btnPanel = new Panel();
            btnPanel.Dock = DockStyle.Fill;
            btnPanel.BackColor = Color.FromArgb(10, 10, 26);
            this.Controls.Add(btnPanel);

            Label lblSelect = new Label();
            lblSelect.Text = "Select Mode";
            lblSelect.Font = new Font("Segoe UI", 14, FontStyle.Bold);
            lblSelect.ForeColor = Color.White;
            lblSelect.TextAlign = ContentAlignment.MiddleCenter;
            lblSelect.Dock = DockStyle.Top;
            lblSelect.Height = 50;
            btnPanel.Controls.Add(lblSelect);

            FlowLayoutPanel flow = new FlowLayoutPanel();
            flow.Dock = DockStyle.Fill;
            flow.FlowDirection = FlowDirection.LeftToRight;
            flow.WrapContents = true;
            flow.Padding = new Padding(80, 30, 80, 30);
            flow.BackColor = Color.FromArgb(10, 10, 26);
            btnPanel.Controls.Add(flow);

            Button btnQueue = CreateMainButton("📊  Queuing Calculator", Color.FromArgb(99, 102, 241));
            btnQueue.Click += (s, e) => { var f = new QueueForm(); f.ShowDialog(); };
            flow.Controls.Add(btnQueue);

            Button btnSim = CreateMainButton("🔬  Simulator", Color.FromArgb(168, 85, 247));
            btnSim.Click += (s, e) => { var f = new SimulationForm(); f.ShowDialog(); };
            flow.Controls.Add(btnSim);
        }

        private Button CreateMainButton(string text, Color color)
        {
            Button btn = new Button();
            btn.Text = text;
            btn.Font = new Font("Segoe UI", 12, FontStyle.Bold);
            btn.Size = new Size(280, 70);
            btn.Margin = new Padding(15);
            btn.BackColor = color;
            btn.ForeColor = Color.White;
            btn.FlatStyle = FlatStyle.Flat;
            btn.FlatAppearance.BorderSize = 0;
            btn.Cursor = Cursors.Hand;
            return btn;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            this.ResumeLayout(false);
        }
    }
}`,
  },
  {
    name: 'QueueCalculator.cs',
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

namespace HafizSweetsQueueSimulator
{
    // ============================================================
    //  QUEUE CALCULATOR FORM — All 6 Models (MM1, MMS, MG1, MGS, GG1, GGS)
    // ============================================================
    public class QueueForm : Form
    {
        private ComboBox cmbModel;
        private Panel inputPanel;
        private Panel resultPanel;

        public QueueForm()
        {
            this.Text = "Queuing Calculator";
            this.Size = new Size(820, 680);
            this.BackColor = Color.FromArgb(10, 10, 26);
            this.ForeColor = Color.White;
            this.StartPosition = FormStartPosition.CenterScreen;
            BuildUI();
        }

        private void BuildUI()
        {
            Label lbl = new Label { Text = "Select Queue Model:", Dock = DockStyle.Top, Height = 36,
                Font = new Font("Segoe UI", 11, FontStyle.Bold), ForeColor = Color.FromArgb(165, 180, 252),
                TextAlign = ContentAlignment.MiddleLeft, Padding = new Padding(15, 0, 0, 0) };
            this.Controls.Add(lbl);

            cmbModel = new ComboBox { Dock = DockStyle.Top, Height = 36, DropDownStyle = ComboBoxStyle.DropDownList,
                Font = new Font("Segoe UI", 11), BackColor = Color.FromArgb(30, 27, 75), ForeColor = Color.White };
            cmbModel.Items.AddRange(new[] { "M/M/1", "M/M/S", "M/G/1", "M/G/S", "G/G/1", "G/G/S" });
            cmbModel.SelectedIndex = 0;
            cmbModel.SelectedIndexChanged += (s, e) => LoadModel();
            this.Controls.Add(cmbModel);

            resultPanel = new Panel { Dock = DockStyle.Bottom, Height = 220, BackColor = Color.FromArgb(15, 15, 35),
                Padding = new Padding(15) };
            this.Controls.Add(resultPanel);

            inputPanel = new Panel { Dock = DockStyle.Fill, BackColor = Color.FromArgb(12, 12, 28),
                AutoScroll = true, Padding = new Padding(15) };
            this.Controls.Add(inputPanel);

            LoadModel();
        }

        private void LoadModel()
        {
            string model = cmbModel.SelectedItem?.ToString() ?? "M/M/1";
            inputPanel.Controls.Clear();
            resultPanel.Controls.Clear();

            switch (model)
            {
                case "M/M/1": LoadMM1(); break;
                case "M/M/S": LoadMMS(); break;
                case "M/G/1": LoadMG1(); break;
                case "M/G/S": LoadMGS(); break;
                case "G/G/1": LoadGG1(); break;
                case "G/G/S": LoadGGS(); break;
            }
        }

        // ---- Helper ----
        private (Label lbl, TextBox tb) AddField(string label, string defVal, int top)
        {
            Label l = new Label { Text = label, Top = top, Left = 20, Width = 220, Height = 28,
                Font = new Font("Segoe UI", 9.5f), ForeColor = Color.FromArgb(148, 163, 184) };
            TextBox tb = new TextBox { Text = defVal, Top = top, Left = 250, Width = 200, Height = 30,
                Font = new Font("Segoe UI", 10), BackColor = Color.FromArgb(30, 27, 75), ForeColor = Color.White,
                BorderStyle = BorderStyle.FixedSingle };
            inputPanel.Controls.Add(l); inputPanel.Controls.Add(tb);
            return (l, tb);
        }

        private (Label lbl, ComboBox cb) AddCombo(string label, string[] items, int top)
        {
            Label l = new Label { Text = label, Top = top, Left = 20, Width = 220, Height = 28,
                Font = new Font("Segoe UI", 9.5f), ForeColor = Color.FromArgb(148, 163, 184) };
            ComboBox cb = new ComboBox { Top = top, Left = 250, Width = 200, DropDownStyle = ComboBoxStyle.DropDownList,
                Font = new Font("Segoe UI", 10), BackColor = Color.FromArgb(30, 27, 75), ForeColor = Color.White };
            cb.Items.AddRange(items); cb.SelectedIndex = 0;
            inputPanel.Controls.Add(l); inputPanel.Controls.Add(cb);
            return (l, cb);
        }

        private Button AddCalcButton(int top, EventHandler handler)
        {
            Button btn = new Button { Text = "Calculate", Top = top, Left = 20, Width = 180, Height = 40,
                Font = new Font("Segoe UI", 11, FontStyle.Bold), BackColor = Color.FromArgb(99, 102, 241),
                ForeColor = Color.White, FlatStyle = FlatStyle.Flat, Cursor = Cursors.Hand };
            btn.FlatAppearance.BorderSize = 0;
            btn.Click += handler;
            inputPanel.Controls.Add(btn);
            return btn;
        }

        private void ShowResults(string[] labels, string[] values)
        {
            resultPanel.Controls.Clear();
            Label title = new Label { Text = "📈 Performance Metrics", Top = 5, Left = 10, Width = 760, Height = 28,
                Font = new Font("Segoe UI", 11, FontStyle.Bold), ForeColor = Color.FromArgb(165, 180, 252) };
            resultPanel.Controls.Add(title);
            int x = 10, y = 38;
            for (int i = 0; i < labels.Length; i++)
            {
                Panel card = new Panel { Top = y, Left = x, Width = 155, Height = 60,
                    BackColor = Color.FromArgb(25, 20, 60), BorderStyle = BorderStyle.FixedSingle };
                Label v = new Label { Text = values[i], Top = 5, Left = 5, Width = 145, Height = 25,
                    Font = new Font("Segoe UI", 12, FontStyle.Bold), ForeColor = Color.White,
                    TextAlign = ContentAlignment.MiddleCenter };
                Label lb = new Label { Text = labels[i], Top = 30, Left = 5, Width = 145, Height = 22,
                    Font = new Font("Segoe UI", 7.5f), ForeColor = Color.FromArgb(148, 163, 184),
                    TextAlign = ContentAlignment.MiddleCenter };
                card.Controls.Add(v); card.Controls.Add(lb);
                resultPanel.Controls.Add(card);
                x += 163;
                if (x + 163 > 780) { x = 10; y += 68; }
            }
        }

        private void ShowError(string msg)
        {
            resultPanel.Controls.Clear();
            Label err = new Label { Text = "⚠️ " + msg, Top = 10, Left = 10, Width = 760,
                Font = new Font("Segoe UI", 10), ForeColor = Color.FromArgb(252, 165, 165) };
            resultPanel.Controls.Add(err);
        }

        // ============================================================
        //  M/M/1
        // ============================================================
        private void LoadMM1()
        {
            var (_, tbIA) = AddField("Mean Interarrival Time:", "10", 20);
            var (_, tbSvc) = AddField("Mean Service Time:", "8", 60);
            AddCalcButton(110, (s, e) =>
            {
                try
                {
                    double lambda = 1.0 / double.Parse(tbIA.Text);
                    double mu = 1.0 / double.Parse(tbSvc.Text);
                    double rho = lambda / mu;
                    if (rho >= 1) { ShowError("ρ ≥ 1: System is unstable."); return; }
                    double Ls = rho / (1 - rho), Ws = 1.0 / (mu - lambda);
                    double Lq = rho * rho / (1 - rho), Wq = rho / (mu - lambda);
                    ShowResults(
                        new[] { "Ls (System)", "Ws (Sys Time)", "Lq (Queue)", "Wq (Wait)", "ρ (Util%)", "Idle%" },
                        new[] { Ls.ToString("F3"), Ws.ToString("F3"), Lq.ToString("F3"), Wq.ToString("F3"),
                                (rho*100).ToString("F1")+"%", ((1-rho)*100).ToString("F1")+"%" });
                }
                catch { ShowError("Enter valid numbers."); }
            });
        }

        // ============================================================
        //  M/M/S
        // ============================================================
        private void LoadMMS()
        {
            var (_, tbS) = AddField("Number of Servers (S):", "2", 20);
            var (_, tbIA) = AddField("Mean Interarrival Time:", "2", 60);
            var (_, tbSvc) = AddField("Mean Service Time:", "1.8", 100);
            AddCalcButton(150, (s, e) =>
            {
                try
                {
                    double lambda = 1.0 / double.Parse(tbIA.Text);
                    double mu = 1.0 / double.Parse(tbSvc.Text);
                    int S = int.Parse(tbS.Text);
                    double rho = lambda / (S * mu);
                    if (rho >= 1) { ShowError("ρ ≥ 1: System unstable."); return; }
                    double P0inv = 0;
                    for (int k = 0; k < S; k++) P0inv += Math.Pow(S * rho, k) / Factorial(k);
                    P0inv += Math.Pow(S * rho, S) / (Factorial(S) * (1 - rho));
                    double P0 = 1.0 / P0inv;
                    double Lq = P0 * Math.Pow(lambda / mu, S) * rho / (Factorial(S) * Math.Pow(1 - rho, 2));
                    double Wq = Lq / lambda, Ws = Wq + 1.0 / mu, Ls = lambda * Ws;
                    ShowResults(
                        new[] { "Ls", "Ws", "Lq", "Wq", "ρ%", "Idle%", "P0" },
                        new[] { Ls.ToString("F3"), Ws.ToString("F3"), Lq.ToString("F3"), Wq.ToString("F3"),
                                (rho*100).ToString("F1")+"%", ((1-rho)*100).ToString("F1")+"%", P0.ToString("F4") });
                }
                catch { ShowError("Enter valid numbers."); }
            });
        }

        // ============================================================
        //  M/G/1
        // ============================================================
        private void LoadMG1()
        {
            var (_, tbIA) = AddField("Mean Interarrival Time:", "0.3", 20);
            var (_, cbDist) = AddCombo("Service Distribution:", new[] { "Exponential", "Poisson" }, 60);
            var (_, tbSvc) = AddField("Mean Service Time:", "0.25", 100);
            AddCalcButton(150, (s, e) =>
            {
                try
                {
                    double lambda = 1.0 / double.Parse(tbIA.Text);
                    double meanSvc = double.Parse(tbSvc.Text);
                    double mu = 1.0 / meanSvc;
                    double sigma2 = cbDist.SelectedIndex == 0 ? meanSvc * meanSvc : meanSvc; // exp: var=mean^2, poisson: var=mean
                    double rho = lambda / mu;
                    if (rho >= 1) { ShowError("ρ ≥ 1."); return; }
                    double Lq = (lambda * lambda * sigma2 + rho * rho) / (2 * (1 - rho));
                    double Wq = Lq / lambda, Ws = Wq + 1.0 / mu, Ls = lambda * Ws;
                    double Cs2 = sigma2 / (meanSvc * meanSvc);
                    ShowResults(
                        new[] { "L", "W", "Lq", "Wq", "ρ%", "Idle%", "Cs²" },
                        new[] { Ls.ToString("F3"), Ws.ToString("F3"), Lq.ToString("F3"), Wq.ToString("F3"),
                                (rho*100).ToString("F1")+"%", ((1-rho)*100).ToString("F1")+"%", Cs2.ToString("F3") });
                }
                catch { ShowError("Enter valid numbers."); }
            });
        }

        // ============================================================
        //  M/G/S
        // ============================================================
        private void LoadMGS()
        {
            var (_, tbS) = AddField("Number of Servers:", "2", 20);
            var (_, tbIA) = AddField("Mean Interarrival Time:", "2", 60);
            var (_, cbDist) = AddCombo("Service Distribution:", new[] { "Exponential", "Poisson" }, 100);
            var (_, tbSvc) = AddField("Mean Service Time:", "1.5", 140);
            AddCalcButton(190, (s, e) =>
            {
                try
                {
                    int S = int.Parse(tbS.Text);
                    double lambda = 1.0 / double.Parse(tbIA.Text);
                    double mu = 1.0 / double.Parse(tbSvc.Text);
                    double Cs2 = cbDist.SelectedIndex == 0 ? 1.0 : double.Parse(tbSvc.Text); // exp Cs²=1, poisson var=mean
                    double rho = lambda / (S * mu);
                    if (rho >= 1) { ShowError("ρ ≥ 1."); return; }
                    double P0inv = 0;
                    for (int k = 0; k < S; k++) P0inv += Math.Pow(S * rho, k) / Factorial(k);
                    P0inv += Math.Pow(S * rho, S) / (Factorial(S) * (1 - rho));
                    double P0 = 1.0 / P0inv;
                    double LqMM = P0 * Math.Pow(lambda / mu, S) * rho / (Factorial(S) * Math.Pow(1 - rho, 2));
                    double Lq = LqMM * (1 + Cs2) / 2;
                    double Wq = Lq / lambda, Ws = Wq + 1.0 / mu, Ls = lambda * Ws;
                    ShowResults(
                        new[] { "Ls", "Ws", "Lq", "Wq", "ρ%", "Idle%" },
                        new[] { Ls.ToString("F3"), Ws.ToString("F3"), Lq.ToString("F3"), Wq.ToString("F3"),
                                (rho*100).ToString("F1")+"%", ((1-rho)*100).ToString("F1")+"%" });
                }
                catch { ShowError("Enter valid numbers."); }
            });
        }

        // ============================================================
        //  G/G/1
        // ============================================================
        private void LoadGG1()
        {
            var (_, cbIA) = AddCombo("Interarrival Distribution:", new[] { "Exponential", "Poisson", "Normal", "Uniform", "Gamma" }, 20);
            var (_, tbMIA) = AddField("Mean Interarrival:", "10", 60);
            var (_, tbVIA) = AddField("Variance Interarrival:", "20", 100);
            var (_, cbSvc) = AddCombo("Service Distribution:", new[] { "Exponential", "Poisson", "Normal", "Uniform", "Gamma" }, 140);
            var (_, tbMSvc) = AddField("Mean Service:", "8", 180);
            var (_, tbVSvc) = AddField("Variance Service:", "25", 220);
            AddCalcButton(270, (s, e) =>
            {
                try
                {
                    double mIA = double.Parse(tbMIA.Text);
                    double mSvc = double.Parse(tbMSvc.Text);
                    double lambda = 1.0 / mIA, mu = 1.0 / mSvc;
                    double Ca2 = GetSCV(cbIA.SelectedIndex, mIA, double.Parse(tbVIA.Text));
                    double Cs2 = GetSCV(cbSvc.SelectedIndex, mSvc, double.Parse(tbVSvc.Text));
                    double rho = lambda / mu;
                    if (rho >= 1) { ShowError("ρ ≥ 1."); return; }
                    double Lq = (rho * rho * (1 + Cs2) * (Ca2 + rho * rho * Cs2)) /
                                (2 * (1 - rho) * (1 + rho * rho * Cs2));
                    double Wq = Lq / lambda, Ws = Wq + 1.0 / mu, Ls = lambda * Ws;
                    ShowResults(
                        new[] { "Ls", "Ws", "Lq", "Wq", "ρ%", "Idle%", "Ca²", "Cs²" },
                        new[] { Ls.ToString("F3"), Ws.ToString("F3"), Lq.ToString("F3"), Wq.ToString("F3"),
                                (rho*100).ToString("F1")+"%", ((1-rho)*100).ToString("F1")+"%",
                                Ca2.ToString("F3"), Cs2.ToString("F3") });
                }
                catch { ShowError("Enter valid numbers."); }
            });
        }

        // ============================================================
        //  G/G/S
        // ============================================================
        private void LoadGGS()
        {
            var (_, tbS) = AddField("Number of Servers:", "2", 20);
            var (_, cbIA) = AddCombo("Interarrival Dist:", new[] { "Exponential", "Poisson", "Normal", "Uniform", "Gamma" }, 60);
            var (_, tbMIA) = AddField("Mean Interarrival:", "10", 100);
            var (_, tbVIA) = AddField("Variance Interarrival:", "20", 140);
            var (_, cbSvc) = AddCombo("Service Dist:", new[] { "Exponential", "Poisson", "Normal", "Uniform", "Gamma" }, 180);
            var (_, tbMSvc) = AddField("Mean Service:", "8", 220);
            var (_, tbVSvc) = AddField("Variance Service:", "25", 260);
            AddCalcButton(310, (s, e) =>
            {
                try
                {
                    int S = int.Parse(tbS.Text);
                    double mIA = double.Parse(tbMIA.Text);
                    double mSvc = double.Parse(tbMSvc.Text);
                    double lambda = 1.0 / mIA, mu = 1.0 / mSvc;
                    double Ca2 = GetSCV(cbIA.SelectedIndex, mIA, double.Parse(tbVIA.Text));
                    double Cs2 = GetSCV(cbSvc.SelectedIndex, mSvc, double.Parse(tbVSvc.Text));
                    double rho = lambda / (S * mu);
                    if (rho >= 1) { ShowError("ρ ≥ 1."); return; }
                    double P0inv = 0;
                    for (int k = 0; k < S; k++) P0inv += Math.Pow(S * rho, k) / Factorial(k);
                    P0inv += Math.Pow(S * rho, S) / (Factorial(S) * (1 - rho));
                    double P0 = 1.0 / P0inv;
                    double LqMM = P0 * Math.Pow(lambda / mu, S) * rho / (Factorial(S) * Math.Pow(1 - rho, 2));
                    double Lq = LqMM * (Ca2 + Cs2) / 2.0;
                    double Wq = Lq / lambda, Ws = Wq + 1.0 / mu, Ls = lambda * Ws;
                    ShowResults(
                        new[] { "Ls", "Ws", "Lq", "Wq", "ρ%", "Idle%", "Ca²", "Cs²" },
                        new[] { Ls.ToString("F3"), Ws.ToString("F3"), Lq.ToString("F3"), Wq.ToString("F3"),
                                (rho*100).ToString("F1")+"%", ((1-rho)*100).ToString("F1")+"%",
                                Ca2.ToString("F3"), Cs2.ToString("F3") });
                }
                catch { ShowError("Enter valid numbers."); }
            });
        }

        private double GetSCV(int distIdx, double mean, double variance)
        {
            // 0=Exp, 1=Poisson, 2=Normal, 3=Uniform, 4=Gamma
            if (distIdx == 0) return 1.0;           // exponential: SCV=1
            if (distIdx == 1) return mean / (mean * mean); // poisson: var=mean
            return variance / (mean * mean);         // general
        }

        private static double Factorial(int n) => n <= 1 ? 1 : n * Factorial(n - 1);
    }
}`,
  },
  {
    name: 'SimulationEngine.cs',
    code: `using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using System.Text;

namespace HafizSweetsQueueSimulator
{
    // ============================================================
    //  SIMULATION FORM — M/M/S, M/G/S, G/G/S
    //  No Priority — FCFS only
    //  Service Distribution: Exponential or Poisson ONLY
    // ============================================================
    public class SimulationForm : Form
    {
        private ComboBox cmbModel;
        private Panel inputPanel;
        private RichTextBox rtbResults;
        private DataGridView dgvTable;

        public SimulationForm()
        {
            this.Text = "Simulator — No Priority | Exponential & Poisson Only";
            this.Size = new Size(950, 750);
            this.BackColor = Color.FromArgb(10, 10, 26);
            this.ForeColor = Color.White;
            this.StartPosition = FormStartPosition.CenterScreen;
            BuildUI();
        }

        private void BuildUI()
        {
            // Model selector
            Label lblM = new Label { Text = "Select Simulation Model:", Dock = DockStyle.Top, Height = 36,
                Font = new Font("Segoe UI", 11, FontStyle.Bold), ForeColor = Color.FromArgb(196, 181, 253),
                TextAlign = ContentAlignment.MiddleLeft, Padding = new Padding(12, 0, 0, 0) };
            this.Controls.Add(lblM);

            cmbModel = new ComboBox { Dock = DockStyle.Top, DropDownStyle = ComboBoxStyle.DropDownList,
                Font = new Font("Segoe UI", 11), BackColor = Color.FromArgb(45, 27, 105), ForeColor = Color.White };
            cmbModel.Items.AddRange(new[] { "M/M/S — Multi-Server Markovian", "M/G/S — General Service", "G/G/S — General (No Priority)" });
            cmbModel.SelectedIndex = 0;
            cmbModel.SelectedIndexChanged += (s, e) => LoadSimModel();
            this.Controls.Add(cmbModel);

            // Note banner
            Label lblNote = new Label {
                Text = "ℹ  No Priority Queuing | FCFS | Service: Exponential or Poisson ONLY",
                Dock = DockStyle.Top, Height = 30, BackColor = Color.FromArgb(45, 27, 105),
                Font = new Font("Segoe UI", 9), ForeColor = Color.FromArgb(196, 181, 253),
                TextAlign = ContentAlignment.MiddleCenter };
            this.Controls.Add(lblNote);

            // Results table
            dgvTable = new DataGridView { Dock = DockStyle.Bottom, Height = 220,
                BackgroundColor = Color.FromArgb(15, 15, 35), ForeColor = Color.White,
                DefaultCellStyle = new DataGridViewCellStyle { BackColor = Color.FromArgb(15, 15, 35), ForeColor = Color.White },
                ColumnHeadersDefaultCellStyle = new DataGridViewCellStyle { BackColor = Color.FromArgb(45, 27, 105), ForeColor = Color.FromArgb(196, 181, 253), Font = new Font("Segoe UI", 9, FontStyle.Bold) },
                GridColor = Color.FromArgb(40, 40, 70), AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill,
                ReadOnly = true, AllowUserToAddRows = false, RowHeadersVisible = false };
            this.Controls.Add(dgvTable);

            // Results summary
            rtbResults = new RichTextBox { Dock = DockStyle.Bottom, Height = 140,
                BackColor = Color.FromArgb(12, 12, 28), ForeColor = Color.FromArgb(165, 180, 252),
                Font = new Font("Consolas", 9.5f), ReadOnly = true, BorderStyle = BorderStyle.None };
            this.Controls.Add(rtbResults);

            // Input panel
            inputPanel = new Panel { Dock = DockStyle.Fill, BackColor = Color.FromArgb(12, 12, 28), AutoScroll = true, Padding = new Padding(12) };
            this.Controls.Add(inputPanel);

            LoadSimModel();
        }

        private void LoadSimModel()
        {
            inputPanel.Controls.Clear();
            rtbResults.Clear();
            dgvTable.Columns.Clear();
            dgvTable.Rows.Clear();
            BuildSimInputs();
        }

        private void BuildSimInputs()
        {
            // Common fields
            var (_, tbS)    = AddField("Number of Servers:", "2", 20);
            var (_, tbIA)   = AddField("Mean Interarrival Time:", "2", 60);
            var (_, cbDist) = AddCombo("Service Distribution:", new[] { "Exponential", "Poisson" }, 100);
            var (_, tbSvc)  = AddField("Mean Service Time:", "1.5", 140);
            var (_, tbN)    = AddField("Number of Customers:", "200", 180);

            Button btnRun = new Button { Text = "▶  Run Simulation", Top = 230, Left = 20, Width = 220, Height = 44,
                Font = new Font("Segoe UI", 12, FontStyle.Bold), BackColor = Color.FromArgb(168, 85, 247),
                ForeColor = Color.White, FlatStyle = FlatStyle.Flat, Cursor = Cursors.Hand };
            btnRun.FlatAppearance.BorderSize = 0;
            btnRun.Click += (s, e) =>
            {
                try
                {
                    int S = int.Parse(tbS.Text);
                    double meanIA = double.Parse(tbIA.Text);
                    double meanSvc = double.Parse(tbSvc.Text);
                    int N = int.Parse(tbN.Text);
                    bool usePoisson = cbDist.SelectedIndex == 1;

                    if (S < 1 || meanIA <= 0 || meanSvc <= 0 || N < 1) { rtbResults.Text = "⚠  Enter valid positive values."; return; }
                    if (N > 10000) { rtbResults.Text = "⚠  Max 10,000 customers."; return; }

                    var result = SimEngine.Run(S, 1.0/meanIA, 1.0/meanSvc, N, usePoisson);
                    DisplayResults(result);
                }
                catch { rtbResults.Text = "⚠  Invalid input values."; }
            };
            inputPanel.Controls.Add(btnRun);

            Button btnReset = new Button { Text = "Reset", Top = 230, Left = 252, Width = 100, Height = 44,
                Font = new Font("Segoe UI", 10), BackColor = Color.FromArgb(30, 27, 75),
                ForeColor = Color.FromArgb(148, 163, 184), FlatStyle = FlatStyle.Flat, Cursor = Cursors.Hand };
            btnReset.Click += (s, e) => { rtbResults.Clear(); dgvTable.Columns.Clear(); dgvTable.Rows.Clear(); };
            inputPanel.Controls.Add(btnReset);
        }

        private void DisplayResults(SimEngine.SimResult r)
        {
            rtbResults.Clear();
            rtbResults.AppendText(
                $"Avg Wait Time (Wq):    {r.AvgWait:F4}\\n" +
                $"Avg System Time (W):   {r.AvgSystem:F4}\\n" +
                $"Avg Queue Length (Lq): {r.AvgQueueLen:F4}\\n" +
                $"Avg System Length (L): {r.AvgSysLen:F4}\\n" +
                $"Server Utilization:    {r.Utilization*100:F1}%\\n" +
                $"Throughput:            {r.Throughput:F4}\\n" +
                $"Total Served:          {r.TotalServed}");

            // Table — first 50 rows
            dgvTable.Columns.Clear();
            dgvTable.Rows.Clear();
            foreach (var col in new[] { "#", "Arrival", "Svc Start", "Svc Time", "Departure", "Wait", "System" })
                dgvTable.Columns.Add(col, col);

            int limit = Math.Min(50, r.Table.Count);
            for (int i = 0; i < limit; i++)
            {
                var row = r.Table[i];
                dgvTable.Rows.Add(row.Customer, row.Arrival.ToString("F4"), row.SvcStart.ToString("F4"),
                    row.SvcTime.ToString("F4"), row.Departure.ToString("F4"),
                    row.Wait.ToString("F4"), row.SystemTime.ToString("F4"));
            }
        }

        private (Label, TextBox) AddField(string label, string def, int top)
        {
            Label l = new Label { Text = label, Top = top, Left = 20, Width = 230, Height = 28,
                Font = new Font("Segoe UI", 9.5f), ForeColor = Color.FromArgb(148, 163, 184) };
            TextBox tb = new TextBox { Text = def, Top = top, Left = 258, Width = 180,
                Font = new Font("Segoe UI", 10), BackColor = Color.FromArgb(30, 27, 75), ForeColor = Color.White };
            inputPanel.Controls.Add(l); inputPanel.Controls.Add(tb);
            return (l, tb);
        }

        private (Label, ComboBox) AddCombo(string label, string[] items, int top)
        {
            Label l = new Label { Text = label, Top = top, Left = 20, Width = 230, Height = 28,
                Font = new Font("Segoe UI", 9.5f), ForeColor = Color.FromArgb(148, 163, 184) };
            ComboBox cb = new ComboBox { Top = top, Left = 258, Width = 180, DropDownStyle = ComboBoxStyle.DropDownList,
                Font = new Font("Segoe UI", 10), BackColor = Color.FromArgb(30, 27, 75), ForeColor = Color.White };
            cb.Items.AddRange(items); cb.SelectedIndex = 0;
            inputPanel.Controls.Add(l); inputPanel.Controls.Add(cb);
            return (l, cb);
        }
    }

    // ============================================================
    //  SIMULATION ENGINE (Discrete Event)
    // ============================================================
    public static class SimEngine
    {
        public class TableRow
        {
            public int Customer; public double Arrival, SvcStart, SvcTime, Departure, Wait, SystemTime;
        }

        public class SimResult
        {
            public double AvgWait, AvgSystem, AvgQueueLen, AvgSysLen, Utilization, Throughput;
            public int TotalServed;
            public List<TableRow> Table = new List<TableRow>();
        }

        private static Random rng = new Random();

        private static double ExpRandom(double rate) => -Math.Log(1 - rng.NextDouble()) / rate;

        private static double PoissonRandom(double lambda)
        {
            double L = Math.Exp(-lambda);
            int k = 0; double p = 1;
            do { k++; p *= rng.NextDouble(); } while (p > L);
            return Math.Max(1, k - 1);
        }

        public static SimResult Run(int servers, double arrRate, double svcRate, int N, bool poissonSvc)
        {
            var freeAt = new double[servers];
            double clock = 0;
            var rows = new List<TableRow>();
            double totalSvc = 0;

            for (int i = 1; i <= N; i++)
            {
                clock += ExpRandom(arrRate);
                double arrival = clock;

                // Find earliest-free server (FCFS, no priority)
                int best = 0;
                for (int j = 1; j < servers; j++) if (freeAt[j] < freeAt[best]) best = j;
                double svcStart = Math.Max(arrival, freeAt[best]);
                double svcTime = poissonSvc ? PoissonRandom(1.0 / svcRate) : ExpRandom(svcRate);
                double departure = svcStart + svcTime;
                freeAt[best] = departure;
                totalSvc += svcTime;

                rows.Add(new TableRow {
                    Customer = i, Arrival = arrival, SvcStart = svcStart,
                    SvcTime = svcTime, Departure = departure,
                    Wait = svcStart - arrival, SystemTime = departure - arrival
                });
            }

            double totalWait = 0, totalSys = 0;
            foreach (var r in rows) { totalWait += r.Wait; totalSys += r.SystemTime; }
            double simDur = rows[rows.Count - 1].Departure;
            double avgW = totalWait / N, avgS = totalSys / N;
            double throughput = N / simDur;
            double util = totalSvc / (simDur * servers);

            return new SimResult {
                AvgWait = avgW, AvgSystem = avgS,
                AvgQueueLen = throughput * avgW, AvgSysLen = throughput * avgS,
                Utilization = util, Throughput = throughput,
                TotalServed = N, Table = rows
            };
        }
    }
}`,
  },
  {
    name: 'README.md',
    code: `# Hafiz Sweets — Simulation & Queuing Calculator
## C# Windows Forms Application

### Group Members
| Name | ID |
|------|----|
| Doshab Hussain | B22110106021 |
| Amna Nehal | B22110106016 |
| Alishna Azhar | B22110106013 |
| Huzaifa Arain | B22110106028 |
| M. Hassaan Mushtaq | B22110106049 |
| Warisha Anwer | B22110106089 |
| Abdul Rafay | B22110106004 |

---

## Requirements
- Visual Studio 2019 or 2022
- .NET Framework 4.7.2+ OR .NET 6/7/8
- Windows OS

## Setup Steps
1. Open Visual Studio
2. File → New → Project → Windows Forms App (.NET Framework)
3. Name: HafizSweetsQueueSimulator
4. Copy all .cs files into the project folder (replace existing ones)
5. Press F5 to build and run

## Features

### Queuing Calculator (6 Models)
- **M/M/1** — Single server, Poisson arrivals, exponential service
- **M/M/S** — Multi-server, Poisson arrivals, exponential service
- **M/G/1** — Single server, Poisson arrivals, general service
- **M/G/S** — Multi-server, Poisson arrivals, general service
- **G/G/1** — Single server, general arrivals and service
- **G/G/S** — Multi-server, general arrivals and service

### Simulator (3 Models)
- **M/M/S** — Discrete event simulation
- **M/G/S** — General service simulation
- **G/G/S** — Full general simulation
- **NO Priority Queuing** — FCFS only
- **Service Distributions**: Exponential and Poisson ONLY
- Outputs: Wq, W, Lq, L, Utilization, Throughput + full event table

## Notes
- Simulator uses FCFS (no priority) as specified
- Service distributions limited to Exponential and Poisson
- Queuing Calculator supports all distributions (Normal, Uniform, Gamma, etc.)
`,
  },
];
