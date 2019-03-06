import { BoosterpackCollection } from "../../store/types";
import { Component, CSSProperties } from "react";
import { Boosterpack } from "../../models";
import chroma from 'chroma-js';
import React from "react";

import './Store.css';

interface StoreFrontProps {
    boosterpacks: BoosterpackCollection
}


export class StoreFront extends Component<StoreFrontProps>{

    render(){
        const bps = this.props.boosterpacks;
        const items = bps.allIds.map(id => bps.byId[id]).map(bp => <StoreItem boosterpack={bp}></StoreItem>)
        return <div className="StoreFront">{items}</div>
    }
}

export class StoreItem extends Component<{boosterpack: Boosterpack}>{

    color(): CSSProperties {
        const color = chroma(this.props.boosterpack.hexColor);
        const white = chroma('white');
        const black = chroma('black');
        const contrastwhite = chroma.contrast(white, color);
        const contrastblack = chroma.contrast(black, color);
        const fg = contrastwhite > contrastblack ? white : black;
        let bg = color;

        if(chroma.contrast(fg, bg) < 6){
            if(fg.hex() == "#ffffff"){
                bg = bg.darken(0.5);
            }
            else{
                bg = bg.brighten(0.5);
            }
        }
        return {backgroundColor: bg.hex(), color: fg.hex()};
    }

    render(){
        const bp = this.props.boosterpack;
        const colorProps = this.color();
        return <div className="StoreItem" style={{...colorProps}}>
            <h3>{bp.name}</h3>
            <button>${bp.price}</button>
        </div>
    }
}