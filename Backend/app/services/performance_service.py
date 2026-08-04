from sqlalchemy.orm import Session

from app.models.match import Match


def get_top_performance(db: Session):

    matches = (
        db.query(Match)
        .order_by(Match.match_number.desc())
        .all()
    )

    player_history = {}

    for match in matches:

        players = [
            {
                "name": match.p1_name,
                "kills": match.p1_kills
            },
            {
                "name": match.p2_name,
                "kills": match.p2_kills
            },
            {
                "name": match.p3_name,
                "kills": match.p3_kills
            },
            {
                "name": match.p4_name,
                "kills": match.p4_kills
            }
        ]

        for player in players:

            # Empty player skip
            if not player["name"]:
                continue

            # First time player
            if player["name"] not in player_history:

                player_history[player["name"]] = {

                    "kills": 0,

                    "mvp": 0,

                    "recent_matches": []

                }

            history = player_history[player["name"]]

            # Already collected last 5
            if len(history["recent_matches"]) >= 5:
                continue

            # Add recent match
            history["recent_matches"].append({

                "match_number": match.match_number,

                "kills": player["kills"],

                "mvp": match.mvp_player == player["name"]

            })

            # Running total kills
            history["kills"] += player["kills"]

            # Running total MVP
            if match.mvp_player == player["name"]:
                history["mvp"] += 1

    # --------------------------
    # Prepare Response
    # --------------------------

    result = []

    for player_name, history in player_history.items():

        # Ignore players with less than 5 recent matches
        if len(history["recent_matches"]) < 5:
            continue

        average = round(history["kills"] / 5, 2)

        result.append({

            "player_id": player_name,

            "kills": history["kills"],

            "mvp": history["mvp"],

            "average": average,

            "recent_matches": history["recent_matches"]

        })

    # --------------------------
    # Sort
    # --------------------------

    result.sort(

        key=lambda x: (

            x["average"],

            x["kills"],

            x["mvp"]

        ),

        reverse=True

    )

    return result