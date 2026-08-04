from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.match import Match
from app.models.player_stat import PlayerStat
from app.schemas.match import MatchCreate

from app.schemas.top_performance import TopPerformance
from app.services.performance_service import get_top_performance

router = APIRouter(
    prefix="/matches",
    tags=["Matches"]
)


@router.post("/")
def create_match(
    data: MatchCreate,
    db: Session = Depends(get_db)
):

    # Next Match Number
    last_match = db.query(
        func.max(Match.match_number)
    ).scalar()

    next_match_number = (last_match or 0) + 1

    # Match History
    match = Match(
        match_number=next_match_number,
        opponent=data.opponent,
        result=data.result,

        p1_name=data.players[0].playerId if len(data.players) > 0 else None,
        p1_kills=data.players[0].kills if len(data.players) > 0 else None,

        p2_name=data.players[1].playerId if len(data.players) > 1 else None,
        p2_kills=data.players[1].kills if len(data.players) > 1 else None,

        p3_name=data.players[2].playerId if len(data.players) > 2 else None,
        p3_kills=data.players[2].kills if len(data.players) > 2 else None,

        p4_name=data.players[3].playerId if len(data.players) > 3 else None,
        p4_kills=data.players[3].kills if len(data.players) > 3 else None,

        mvp_player=next(
            (
                player.playerId
                for player in data.players
                if player.mvp
            ),
            None
        )
    )

    db.add(match)

    # Leaderboard Update
    for player in data.players:

        player_stat = db.query(PlayerStat).filter(
            PlayerStat.player_id == player.playerId
        ).first()

        # New Player
        if player_stat is None:

            player_stat = PlayerStat(
                player_id=player.playerId,
                matches=1,
                kills=player.kills,
                damage=player.damage,
                mvp=1 if player.mvp else 0
            )

            db.add(player_stat)

        # Existing Player
        else:

            player_stat.matches += 1
            player_stat.kills += player.kills
            player_stat.damage += player.damage

            if player.mvp:
                player_stat.mvp += 1

    db.commit()

    return {
        "message": "Match Saved Successfully",
        "match_number": next_match_number
    }


@router.get("/leaderboard")
def get_leaderboard(db:Session = Depends(get_db)):
    leaderboard = db.query(PlayerStat).all()

    return leaderboard


@router.get("/")
def get_matches(
    db: Session = Depends(get_db)
):

    matches = (
        db.query(Match)
        .order_by(Match.match_number.desc())
        .all()
    )

    return matches


@router.get(
    "/top-performance",
    response_model=list[TopPerformance]
)
def top_performance(db: Session = Depends(get_db)):
    return get_top_performance(db)
