from pydantic import BaseModel
from typing import List


class PlayerData(BaseModel):
    playerId: str
    kills: int
    damage: int
    mvp: bool


class MatchCreate(BaseModel):
    opponent: str
    result: bool
    players: List[PlayerData]