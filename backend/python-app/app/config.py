from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8081
    DATABASE_URL: str = "sqlite:///./app.db"  # Thay đổi theo nhu cầu
    SECRET_KEY: str = "your-secret-key"

    class Config:
        env_file = ".env"

settings = Settings()
