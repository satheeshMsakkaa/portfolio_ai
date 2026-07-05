from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Route Imports
from routes.upload import router as upload_router
from routes.dashboard import router as dashboard_router
from routes.ai import router as ai_router
from routes.chat import router as chat_router
from routes.news import router as news_router

# Optional Routes (if implemented)
# from routes.stocks import router as stocks_router
# from routes.mutualfund import router as mutualfund_router
# from routes.rebalance import router as rebalance_router
# from routes.health_score import router as health_router
# from routes.sectors import router as sectors_router
# from routes.sentiment import router as sentiment_router
# from routes.report import router as report_router

app = FastAPI(
    title="Portfolio AI",
    version="1.0.0",
    description="AI Powered Portfolio Dashboard"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"]
)

# Register Routes
app.include_router(upload_router)
app.include_router(dashboard_router)
app.include_router(ai_router)
app.include_router(chat_router)
app.include_router(news_router)

# Register Optional Routes
# app.include_router(stocks_router)
# app.include_router(mutualfund_router)
# app.include_router(rebalance_router)
# app.include_router(health_router)
# app.include_router(sectors_router)
# app.include_router(sentiment_router)
# app.include_router(report_router)

# Root API
@app.get("/", tags=["Health"])
def root():
    return {
        "status": "success",
        "message": "Portfolio AI Backend Running",
        "version": "1.0.0"
    }

# Startup Event
@app.on_event("startup")
async def startup_event():
    print("🚀 Portfolio AI Backend Started")

    print("\nRegistered Routes:")
    for route in app.routes:
        try:
            methods = ",".join(route.methods)
            print(f"{methods:20} {route.path}")
        except Exception:
            pass

# Shutdown Event
@app.on_event("shutdown")
async def shutdown_event():
    print("🛑 Portfolio AI Backend Stopped")