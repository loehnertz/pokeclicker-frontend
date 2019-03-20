import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { User } from "../../models/user";
import { sendClick } from "../../store/actions/sockets";
import { State } from "../../store/types";
import { waitForAnimationFrame } from "../../util/async";
import { abbreviate } from "../../utils";
import './Clicking.css';
import pokeballImage from './pokeball.png';

interface ClickingProps {
    user: User | null;
}

interface ClickingDispatchProps {
    onPokeballClick(): void;
}

class Clicking extends Component<ClickingProps & ClickingDispatchProps> {
    componentDidMount() {
        document.title = "Game - PokéClicker";
    }

    render() {
        return (
            <div className="Clicking">
                <Pokeball onPokeballClick={this.props.onPokeballClick}/>
                <PokeDollars
                    amount={this.props.user ? this.props.user.pokeDollars : 0}
                    rate={this.props.user && this.props.user.pokeDollarRate}
                    lastBalanceTimestamp={this.props.user && this.props.user.lastBalanceTimestamp}
                />
            </div>
        );
    }
}

class Pokeball extends Component<{onPokeballClick(): void}> {
    $pokeball?: HTMLImageElement | null;
    shakeTimeout?: number | null;

    shakePokeball() {
        if(this.$pokeball == null) {
            return;
        }
        if(this.shakeTimeout != null) {
            clearTimeout(this.shakeTimeout);
        }
        this.$pokeball.classList.add("ShakingBall");
        this.shakeTimeout = window.setTimeout(() => this.stopShaking(), 400);
    }

    stopShaking() {
        if(this.$pokeball == null) {
            return;
        }
        this.$pokeball.classList.remove("ShakingBall");
        this.shakeTimeout = null;
    }

    render() {
        return (
            <div>
                <img
                    src={pokeballImage}
                    alt=""
                    ref={(el) => { this.$pokeball = el; }}
                    onClick={() => { this.props.onPokeballClick(); this.shakePokeball(); }}
                />
            </div>
        );
    }
}

interface PokeDollarsProps {
    amount: number;
    rate: number | null;
    lastBalanceTimestamp: number | null;
}

class PokeDollars extends Component<PokeDollarsProps> {
    $dollars?: HTMLSpanElement | null;
    mounted: boolean;

    constructor(props: PokeDollarsProps, ctx: any) {
        super(props, ctx);
        this.mounted = true;
    }

    estimatedDollars(): number | null {
        if(this.props.rate == null || this.props.lastBalanceTimestamp == null) {
            return null;
        }
        const deltaTime = (Date.now() - this.props.lastBalanceTimestamp) * (1 / 1000);
        return Math.round(this.props.amount + this.props.rate * deltaTime);
    }

    async animate() {
        while(this.mounted) {
            if(this.$dollars != null) {
                const est = this.estimatedDollars();
                this.$dollars.innerText = abbreviate(est == null ? this.props.amount : est, 3);
            }
            await waitForAnimationFrame();
        }
    }

    render() {
        this.animate();
        return (
            <div className="PokeDollars">
                <p>₽<span ref={(e) => this.$dollars = e}>{abbreviate(this.props.amount, 3)}</span>
                <br />
                <span className="PokeDollars-rate">(+{abbreviate(this.props.rate, 3)} / s)</span></p>
            </div>
        );
    }

    componentWillUnmount() {
        this.mounted = false;
    }
}

function mapStateToProps(state: State): ClickingProps {
    return {
        user: state.entities.user
    };
}

function mapDispatchToProps(dispatch: Dispatch): ClickingDispatchProps {
    return {
        onPokeballClick: bindActionCreators(sendClick, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clicking);
