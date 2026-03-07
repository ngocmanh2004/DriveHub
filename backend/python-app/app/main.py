from fastapi import FastAPI
from app.api.qr_routes import router as qr_router
from app.config import settings

app = FastAPI(title="Service-Based API", version="1.0.0")

# Đăng ký các route API
app.include_router(qr_router, prefix="/api")
if __name__ == "__main__":
    import uvicorn
    print(f"Starting server on http://{settings.HOST}:{settings.PORT}...")
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)
