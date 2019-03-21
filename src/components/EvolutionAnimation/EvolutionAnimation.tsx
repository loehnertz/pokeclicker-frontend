import React, { Component, CSSProperties } from "react";
import { connect } from "react-redux";
import { EvolutionState, EvolutionStatus, State } from "../../store/types";

import { waitForAnimationFrame } from "../../util/async";
import "./EvolutionAnimation.css";

const ANIMATION_MILLISECONDS = 6 * 1000;

interface EvolutionAnimationProps {
    evolutionState: EvolutionState;
}

interface EvolutionAnimationState {
    animationState: string;
    animationProgress: number;
}

class EvolutionAnimation extends Component<EvolutionAnimationProps, EvolutionAnimationState> {
    mounted: boolean;

    constructor(props: EvolutionAnimationProps, ctx: any) {
        super(props, ctx);
        this.mounted = true;
        this.state = {
            animationState: "start",
            animationProgress: 0
        };
    }

    async animate() {
        while(this.mounted) {
            const evolutionState = this.props.evolutionState;
            if(evolutionState.status === EvolutionStatus.EVOLVING) {
                const deltatime = (Date.now() - evolutionState.data.evolutionStartTimestamp) % 20000;
                let progress = deltatime ** 2 / 1000;
                if(10000 / (2 * deltatime) < 1) {
                    progress = Math.round(progress / 1000) * 1000;
                }
                this.setState((state) => ({
                    ...state,
                    animationState: this.getAnimationState(deltatime - 1000),
                    animationProgress: Math.max(0, progress)
                }));
            }
            await waitForAnimationFrame();
        }
    }

    getAnimationState(deltatime: number): string {
        if(deltatime < 1000) {
            return "start";
        } else if(deltatime >= ANIMATION_MILLISECONDS) {
            return "complete";
        } else {
            return `pulse`;
        }
    }

    render() {
        const evolutionState = this.props.evolutionState;
        if(evolutionState.status !== EvolutionStatus.EVOLVING) {
            return <div/>;
        }
        const data = evolutionState.data;
        if(!data.pokemonOrigin.thinApiInfo || !data.pokemonEvolution.thinApiInfo) {
            return <div/>;
        }
        return (
            <div
                className={["EvolutionAnimation", `EvolutionAnimation-${this.state.animationState}`].join(" ")}
                style={{"--animation-progress": `${this.state.animationProgress / 1000}s`} as CSSProperties}
            >
                <img className="EvolutionAnimation-origin" src={data.pokemonOrigin.thinApiInfo.sprite}/>
                <img className="EvolutionAnimation-evolution" src={data.pokemonEvolution.thinApiInfo.sprite}/>
            </div>
        );
    }

    componentDidMount() {
        this.mounted = true;
        this.animate();
    }

    componentWillUnmount() {
        this.mounted = false;
    }
}

function mapStateToProps(state: State): EvolutionAnimationProps {
    return {
        evolutionState: state.globalAppState.evolutionState,
    };
}

export default connect(mapStateToProps)(EvolutionAnimation);
