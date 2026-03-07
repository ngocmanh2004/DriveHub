from app.models.user_model import User

async def get_user_by_id(user_id: int) -> User:
    # Thực hiện truy vấn DB
    user = await User.get(user_id)
    return user
