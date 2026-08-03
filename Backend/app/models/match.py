from app.database import Base
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func


class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)

    match_number = Column(Integer, unique=True, nullable=False)

    opponent = Column(String, nullable=False)

    result = Column(Boolean, nullable=False)

    p1_name = Column(String)
    p1_kills = Column(Integer)

    p2_name = Column(String)
    p2_kills = Column(Integer)

    p3_name = Column(String)
    p3_kills = Column(Integer)

    p4_name = Column(String)
    p4_kills = Column(Integer)

    mvp_player = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )