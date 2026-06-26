
import { useNavigate } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import Navbar from "../components/Navbar";

export default function UploadPage() {
  const navigate = useNavigate();

  const handleSuccess = (dashboardData) => {
    localStorage.setItem("dashboard", JSON.stringify(dashboardData));
    navigate("/dashboard");
  };

  return (
      <><Navbar />
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center px-12 lg:px-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
          <div className="max-w-xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 mb-6">
              AI Powered Investment Analytics
            </div>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Portfolio AI Dashboard
            </h1>

            <p className="text-xl text-blue-100 mb-8">
              Upload your portfolio and receive instant AI-powered insights,
              performance analysis, sector allocation, portfolio health score,
              risk assessment, and personalized rebalancing recommendations.
            </p>

            <div className="space-y-4">
              <Feature
                icon="📊"
                title="Portfolio Analytics"
                desc="Track investment, profit/loss, and returns in day-1."
              />

              <Feature
                icon="🤖"
                title="AI Insights"
                desc="Get intelligent recommendations based on portfolio performance."
              />

              <Feature
                icon="📈"
                title="Sector Allocation"
                desc="Understand where your investments are concentrated."
              />

              <Feature
                icon="⚖️"
                title="Portfolio Rebalancing"
                desc="Receive suggestions to improve diversification and reduce risk."
              />
            </div>

            {/* Download Templates */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-4">
                📥 Download Sample Templates
              </h3>

              <div className="flex flex-wrap gap-3">

                <a
                  href="/template/Portfolio_AI_Template_IND.xlsx"
                  download
                  className="
                    inline-flex items-center gap-2
                    px-4 py-3
                    rounded-xl
                    bg-white/10
                    hover:bg-white/20
                    border border-white/20
                    transition
                  "
                >
                  INDIA Portfolio Template
                </a>

                <a
                  href="/template/Portfolio_AI_Template_USA.xlsx"
                  download
                  className="
                    inline-flex items-center gap-2
                    px-4 py-3
                    rounded-xl
                    bg-white/10
                    hover:bg-white/20
                    border border-white/20
                    transition
                  "
                >
                  USA Portfolio Template
                </a>

              </div>

              <p className="text-sm text-blue-100 mt-3">
                Download the sample Excel templates, fill in your holdings,
                and upload them for AI-powered analysis.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800">
                Upload Portfolio
              </h2>
              <p className="text-slate-500 mt-2">
                Upload your Excel portfolio file and let AI analyze your
                investments.
              </p>
            </div>

            <FileUploader onUploadSuccess={handleSuccess} />
          </div>
        </div>

      </div>
    </div>
    </>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="text-3xl">{icon}</div>

      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-blue-100">{desc}</p>
      </div>
    </div>
  );
}