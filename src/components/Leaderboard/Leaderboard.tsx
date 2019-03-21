import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import { LeaderboardState, State } from "../../store/types";
import { abbreviate } from "../../utils";
import './Leaderboard.css';

interface LeaderboardProps {
    leaderboard: LeaderboardState;
}

class LeaderboardComponent extends Component<LeaderboardProps> {
    render() {
        const items = this.props.leaderboard.map((entry) => (
            <div className="Leaderboard-entry" key={entry.name}>
                <div>{entry.name}</div><div>{abbreviate(entry.pokeDollars, 3)}</div>
            </div>
        ));
        return (
            <div className="Leaderboard">
                {items}
            </div>
        );
    }
}

function mapStateToProps(state: State): LeaderboardProps {
    return {
        leaderboard: state.globalAppState.leaderboard
    };
}

export default connect(mapStateToProps)(LeaderboardComponent);
