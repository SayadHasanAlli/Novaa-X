from fastapi import FastAPI

from app.database import engine, Base
from app.models.match import Match
from app.models.player_stat import PlayerStat
from app.routers.matches import router
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI(title="NOVAA X Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
