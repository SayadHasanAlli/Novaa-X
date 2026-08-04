from pydantic import BaseModel


class RecentMatch(BaseModel):
    match_number: int
    kills: int
    mvp: bool


class TopPerformance(BaseModel):
    player_id: str

    kills: int          # Last 5 Total Kills
    mvp: int            # Last 5 Total MVP
    average: float      # Last 5 Average Kills

    recent_matches: list[RecentMatch]