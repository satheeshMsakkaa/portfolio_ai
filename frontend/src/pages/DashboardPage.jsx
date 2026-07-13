import { useEffect, useState } from "react";
import { MessageCircle, X, LayoutDashboard, BrainCircuit, Newspaper, Download, Loader2 } from "lucide-react";

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
import NarrativeInsights from "../components/NarrativeInsights";
import PortfolioStrengths from "../components/PortfolioStrengths";
import PortfolioWeaknesses from "../components/PortfolioWeaknesses";
import WhatIfAnalysis from "../components/WhatIfAnalysis";
import RiskAnalysis from "../components/RiskAnalysis";
import BenchmarkComparison from "../components/BenchmarkComparison";
import TopPerformers from "../components/TopPerformers";
import UnderPerformers from "../components/UnderPerformers";
import AnomalyDetection from "../components/AnomalyDetection";
import MarketOutlook from "../components/MarketOutlook";
import NextBestActions from "../components/NextBestActions";
import AIChat from "../components/AIChat";

import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

import API from "../services/api";
import TaxAwareAnalysis from "../components/TaxAwareAnalysis";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [printing, setPrinting] = useState(false);

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
        query = `${dashboardData?.investor?.country} Stocks Market`;
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

  const handlePrint = async () => {
    try {
      setPrinting(true);
      const response = await API.post(
        "/report",
        {
          dashboard,
          ai: aiData
        },
        {
          responseType: "blob"
        }
      );

      const disposition = response.headers["content-disposition"];
      let filename = "Portfolio_Report.pdf";
      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match) {
          filename = match[1];
        }
      }

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      document.body.appendChild(link);

      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      setPrinting(false);
      console.error(
        "PDF Generation Error",
        err
      );
    } finally {
      setPrinting(false);
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

        <div className="flex gap-4 mb-6">

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
            AI Portfolio Intelligence
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
          { aiData &&
          <button
            onClick={handlePrint}
            disabled={printing}
            className={`
              flex items-center gap-2
              px-5 py-2.5
              rounded-lg
              text-white
              font-semibold
              shadow-md
              transition-all
              ${
                printing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }
            `}
          >
            {printing ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download size={18} />
                Download Portfolio (PDF Report)
              </>
            )}
          </button>
        }
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
                  Generating AI Portfolio Intelligence...
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
                  AI Intelligence Unavailable
                </h3>

                <p className="text-gray-500 mt-2 mb-6">
                  Unable to generate portfolio intelligence.
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
              aiData?.aiResponse.success ?
              <>
              <AIInsights insights={aiData?.aiResponse || {}} />
                <div className="grid lg:grid-cols-2 gap-6">
                  { aiData?.aiResponse?.healthScore !== undefined && <HealthScoreCard score={aiData?.aiResponse?.healthScore || 0} /> }
                  { aiData?.aiResponse?.rebalanceSuggestions && <RebalanceSuggestions data={aiData?.aiResponse?.rebalanceSuggestions || []} /> }
                </div>
                {
                  aiData?.aiResponse?.narrativeInsights?.length > 0 &&
                  <NarrativeInsights insights={aiData?.aiResponse?.narrativeInsights || []} />
                }
                <div className="grid lg:grid-cols-2 gap-6">
                  {aiData?.aiResponse?.portfolioStrengths?.length > 0 && <PortfolioStrengths items={aiData?.aiResponse?.portfolioStrengths || []} />}
                  {aiData?.aiResponse?.portfolioWeaknesses?.length > 0 && <PortfolioWeaknesses items={aiData?.aiResponse?.portfolioWeaknesses || []} />}
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                  {aiData?.aiResponse?.riskAnalysis && <RiskAnalysis data={aiData?.aiResponse?.riskAnalysis || {}} />}
                  {aiData?.aiResponse?.benchmarkComparison && <BenchmarkComparison data={aiData?.aiResponse?.benchmarkComparison || {}} />}
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                  {aiData?.aiResponse?.rebalancing?.currentAllocation && <AllocationCard title="Current Allocation" data={aiData?.aiResponse?.rebalancing?.currentAllocation} color="bg-red-500" type="current" />}
                  {aiData?.aiResponse?.rebalancing?.recommendedAllocation && <AllocationCard title="Recommended Allocation" data={aiData?.aiResponse?.rebalancing?.recommendedAllocation } color="bg-green-500" type="recommended" />}
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                  {aiData?.aiResponse?.topPerformers?.length > 0 && <TopPerformers items={aiData?.aiResponse?.topPerformers || []} />}
                  {aiData?.aiResponse?.underPerformers?.length > 0 && <UnderPerformers items={aiData?.aiResponse?.underPerformers || []} />}
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                  {aiData?.aiResponse?.taxAwareAnalysis && <TaxAwareAnalysis data={aiData?.aiResponse?.taxAwareAnalysis || {}} />}
                  {aiData?.aiResponse?.marketOutlook && <MarketOutlook data={aiData?.aiResponse?.marketOutlook || {}} />}
                </div>
                {aiData?.aiResponse?.anomalyDetection && <AnomalyDetection items={aiData?.aiResponse?.anomalyDetection || []} />}
                <div className="grid lg:grid-cols-2 gap-6">
                  {aiData?.aiResponse?.whatIfAnalysis && <WhatIfAnalysis items={aiData?.aiResponse?.whatIfAnalysis || []} />}
                  {aiData?.aiResponse?.nextBestActions && <NextBestActions actions={aiData?.aiResponse?.nextBestActions || []} />}
                </div>
              </>
              : (
                <div className="bg-white rounded-xl shadow p-8 text-center">

                  <div className="text-5xl mb-4">
                    🤖
                  </div>

                  <h3 className="text-lg font-semibold">
                    AI Intelligence Unavailable
                  </h3>

                  <p className="text-gray-500 mt-2 mb-6">
                    Unable to generate portfolio intelligence.
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
                    Refresh AI Intelligence
                  </button>
                </div>
              )
            )}
          </div>
        )}

        {/* News Tab */}

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