import { useEffect, useState } from "react";
import { MessageCircle, X, LayoutDashboard, BrainCircuit, Newspaper } from "lucide-react";

import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import EquityTable from "../components/EquityTable";
import MutualFundTable from "../components/MutualFundTable";
import PortfolioPieChart from "../components/PortfolioPieChart";
import SectorChart from "../components/SectorChart";

import AIInsights from "../components/AIInsights";
import RebalanceSuggestions from "../components/RebalanceSuggestions";
import AllocationCard from "../components/AllocationCard";
import NewsPanel from "../components/NewsPanel";
import HealthScoreCard from "../components/HealthScoreCard";
import AIChat from "../components/AIChat";

import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

import API from "../services/api";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [chatOpen, setChatOpen] =
    useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {
    if (chatOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [chatOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setChatOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEsc
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleEsc
      );
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const dashboardData = JSON.parse(
        localStorage.getItem("dashboard")
      );

      if (!dashboardData) {
        setError("No dashboard data found.");
        return;
      }

      setDashboard(dashboardData);

      setLoading(false);

      loadAIData(dashboardData);
      loadNews(dashboardData);

    } catch (err) {
      setError("Failed to load dashboard.");
      setLoading(false);
    }
  };

  const loadAIData = async (dashboardData) => {
    setAiLoading(true);
    try {
      const aiResponse = await API.post(
        "/ai/analyze",
        dashboardData
      );

      setAiData(aiResponse.data);
    } catch (err) {
      console.error(
        "AI Analysis Error",
        err
      );
    } finally {
      setAiLoading(false);
    }
  };

  const loadNews = async (dashboardData) => {
    try {
      let query = `${dashboardData?.investor?.country} Stock Market`;

      if (
        dashboardData?.equities?.length > 0
      ) {
        query = dashboardData.equities
          .slice(0, 3)
          .map((x) => `"${x.Symbol}"`)
          .join(" OR ");
        query = `${dashboardData?.investor?.country} Stocks Market News`;
      }

      const newsResponse = await API.get(
        `/news?query=${query}&max=5`
      );

      setNews(
        newsResponse.data.articles || []
      );
    } catch (err) {
      console.error("News Error", err);
    }
  };

  const handleRefreshAI = () => {
    const dashboardData = JSON.parse(
      localStorage.getItem("dashboard")
    );

    if (dashboardData) {
      loadAIData(dashboardData);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
      />
    );
  }

  return (
    <>
      <Navbar
        investor={
          dashboard?.investor
        }
      />

      <div className="p-6 bg-slate-100 min-h-screen">

        {/* Tabs */}

        <div className="flex gap-3 mb-6">

          <button
            onClick={() =>
              setActiveTab(
                "dashboard"
              )
            }
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all ${activeTab ===
              "dashboard"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white shadow"
              }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            onClick={() =>
              setActiveTab("ai")
            }
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all ${activeTab === "ai"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white shadow"
              }`}
          >
            <BrainCircuit size={18} />
            AI Assistant
          </button>

          <button
            onClick={() =>
              setActiveTab("news")
            }
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all ${activeTab === "news"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white shadow"
              }`}
          >
            <Newspaper size={18} />
            Latest News
          </button>
        </div>

        {/* Dashboard Tab */}

        {activeTab ===
          "dashboard" && (
            <>
              <SummaryCards
                summary={
                  dashboard?.summary
                }
                currencySymbol={
                  dashboard?.currencySymbol
                }
              />

              <div className="grid lg:grid-cols-2 gap-6 mt-6">

                <div className="bg-white rounded-xl shadow p-4">
                  <h2 className="font-bold mb-4">
                    Portfolio Allocation
                  </h2>

                  <PortfolioPieChart
                    data={dashboard?.portfolioAllocation}
                    currencySymbol={dashboard?.currencySymbol}
                  />
                </div>

                <div className="bg-white rounded-xl shadow p-4">
                  <h2 className="font-bold mb-4">
                    Sector Allocation
                  </h2>

                  <SectorChart
                    data={dashboard?.sectorAllocation}
                    currencySymbol={dashboard?.currencySymbol}
                  />
                </div>

              </div>
              
              { dashboard.equities?.length > 0 && (
                <div className="mt-6">
                  <EquityTable
                    equities={
                      dashboard?.equities ||
                      []
                    }
                    currencySymbol={
                      dashboard?.currencySymbol
                    }
                  />
                </div>
              )}

              { dashboard.mutualFunds?.length > 0 && (
                <div className="mt-6">
                  <MutualFundTable
                    funds={
                      dashboard?.mutualFunds ||
                      []
                    }
                    currencySymbol={
                      dashboard?.currencySymbol
                    }
                  />
                </div>
              )}
            </>
          )}

        {/* AI TAB */}

        {activeTab === "ai" && (
          <div className="space-y-6">

            {aiLoading ? (
              <div className="bg-white rounded-xl shadow p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex gap-1 text-blue-600">
                    <span className="animate-bounce">
                      ●
                    </span>
                    <span
                      className="animate-bounce"
                      style={{
                        animationDelay:
                          "0.1s",
                      }}
                    >
                      ●
                    </span>

                    <span
                      className="animate-bounce"
                      style={{
                        animationDelay:
                          "0.2s",
                      }}
                    >
                      ●
                    </span>

                  </div>

                </div>

                <h3 className="font-semibold text-lg">
                  Generating AI Insights
                </h3>

                <p className="text-gray-500 mt-2">
                  Analyzing portfolio risk,
                  diversification and
                  rebalancing opportunities...
                </p>

              </div>
            ) : !aiData ? (
              <div className="bg-white rounded-xl shadow p-8 text-center">

                <div className="text-5xl mb-4">
                  🤖
                </div>

                <h3 className="text-lg font-semibold">
                  AI Insights Unavailable
                </h3>

                <p className="text-gray-500 mt-2 mb-6">
                  Unable to generate portfolio insights.
                  Please try again.
                </p>

                <button
                  onClick={handleRefreshAI}
                  className="
                bg-blue-600
                text-white
                px-5
                py-2
                rounded-lg
                hover:bg-blue-700
                transition
              "
                >
                  Refresh Insights
                </button>

              </div>
            ) : (

              <>
                <AIInsights
                  insights={aiData?.insights}
                />

                <div className="grid lg:grid-cols-2 gap-6">

                  <HealthScoreCard
                    score={aiData?.healthScore}
                  />

                  <RebalanceSuggestions
                    data={
                      aiData?.rebalancing || {}
                    }
                  />
                </div>

                <div className="grid lg:grid-cols-2 gap-6">

                  <AllocationCard
                    title="Current Allocation"
                    data={
                      aiData?.rebalancing
                        ?.currentAllocation
                    }
                    color="bg-red-500"
                    type="current"
                  />

                  <AllocationCard
                    title="Recommended Allocation"
                    data={
                      aiData?.rebalancing
                        ?.recommendedAllocation
                    }
                    color="bg-green-500"
                    type="recommended"
                  />

                </div>

              </>

            )}

          </div>
        )}

        {activeTab === "news" && (
          <div className="bg-white rounded-xl shadow p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl font-bold">
                Latest Market News
              </h2>
            </div>

            <NewsPanel
              articles={news}
            />

          </div>
        )}

        {/* Floating AI Button */}

        <button
          onClick={() =>
            setChatOpen(true)
          }
          className="
            fixed
            bottom-6
            right-6
            z-40
            bg-blue-600
            text-white
            p-4
            rounded-full
            shadow-xl
            transition-all
            duration-300
            hover:scale-110
            active:scale-95
          "
        >
          <MessageCircle
            size={26}
          />
        </button>

        {/* Overlay */}

        <div
          className={`fixed inset-0 z-50 transition-all duration-300 ${chatOpen
            ? "bg-black/40 pointer-events-auto"
            : "bg-transparent pointer-events-none"
            }`}
        >

          {/* Backdrop */}

          <div
            className="absolute inset-0"
            onClick={() =>
              setChatOpen(false)
            }
          />

          {/* Chat Panel */}

          <div
            className={`
              absolute
              top-0
              right-0
              h-full
              w-full
              md:w-[450px]
              bg-white
              shadow-2xl
              flex
              flex-col
              transition-transform
              duration-300
              ease-out
              ${chatOpen
                ? "translate-x-0"
                : "translate-x-full"
              }
            `}
          >

            {/* Header */}

            <div className="border-b p-4">

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="font-bold text-lg">
                    AI Portfolio
                    Assistant
                  </h2>
                </div>

                <button
                  onClick={() =>
                    setChatOpen(
                      false
                    )
                  }
                  className="hover:bg-gray-100 p-2 rounded-lg"
                >
                  <X
                    size={22}
                  />
                </button>

              </div>

            </div>

            {/* Chat Area */}

            <div className="flex-1 min-h-0">
              <AIChat />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}