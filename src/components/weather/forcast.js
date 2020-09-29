import React from 'react'
import { transforTemp, transforTime, transforIcon } from "./transfor";

const Forcast = ({ forcast }) => {
    return (
        <div className="forcast-area">
            {forcast.map((item, index) => {
                const icons = item?.iconLink.replace('ls.hereapi', 'api.here')
                return (
                    <div key={index} >
                        <div className="display-forcast">{transforTime(item.utcTime, 7)}</div>
                        <div className="display-forcast"><img src={icons} alt="icons" width="30px" /></div>
                        <div className="display-forcast">{transforTemp(item.highTemperature)}/{transforTemp(item.lowTemperature)}</div>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default Forcast
