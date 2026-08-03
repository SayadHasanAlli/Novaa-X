from app.database import Base
from sqlalchemy import Column, Integer, String


class PlayerStat(Base):
    __tablename__ = "player_stat"

    id = Column(Integer, primary_key=True, index=True)

    player_id = Column(String, unique=True, nullable=False)

    matches = Column(Integer, default=0, nullable=False)

    kills = Column(Integer, default=0, nullable=False)

    damage = Column(Integer, default=0, nullable=False)

    mvp = Column(Integer, default=0, nullable=False)