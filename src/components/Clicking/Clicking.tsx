import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { User } from "../../models/user";
import { sendClick } from "../../store/actions/sockets";
import { State } from "../../store/types";
import './Clicking.css';
import pokeballImage from './pokeball.png';
import {abbreviate} from "../../utils"

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
                <PokeDollars amount={this.props.user && this.props.user.pokeDollars}
                             rate={this.props.user && this.props.user.pokeDollarRate}/>
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
        return <div><img src={pokeballImage} alt="" ref={(el) => { this.$pokeball = el; }}
               onClick={() => { this.props.onPokeballClick(); this.shakePokeball(); } }/></div>;
    }
}

class PokeDollars extends Component<{amount: number | null, rate: number | null}> {
    $dollars?: HTMLSpanElement | null;
    dead?: boolean;
    t0?: number;

    estimatedDollars(): number | null {
        if(this.t0 == null || this.props.amount == null || this.props.rate == null) {
            return null;
        }
        const deltaTime = (Date.now() - this.t0) * (1 / 1000);
        return Math.round(this.props.amount + this.props.rate * deltaTime);
    }

    render() {
        const animate = () => {
            if(!this.dead) {
                window.requestAnimationFrame(animate);
            }
            if(this.$dollars == null || this.props.amount == null || this.t0 == null) {
                return;
            }
            const est = this.estimatedDollars();
            this.$dollars.innerText = est == null ? "" : abbreviate(est, 3);
        };
        animate();
        return (
            <div className="PokeDollars">
                <p>₽<span ref={(e) => this.$dollars = e}>{this.props.amount}</span>
                <br />
                <span className="PokeDollars-rate">(+{this.props.rate} / s)</span></p>
            </div>
        );
    }

    componentWillReceiveProps() {
        this.t0 = Date.now();
    }
    componentWillUnmount() {
        this.dead = true;
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
