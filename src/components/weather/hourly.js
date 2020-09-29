import React from "react";
import { transforTemp, transforTime, transforIcon } from "./transfor";

const Hourly = ({ hourly }) => {
  return (
    <div className="daily-area">
      <div className="table-responsive-lg table-responsive-xl table-responsive-md table-responsive-sm table-responsive">
        <table className="table-borderless">
          <tbody>
            <tr>
              {hourly.map((item, index) => {
                const icons = item?.iconLink.replace('ls.hereapi', 'api.here')
                return (
                  <td key={index}>
                    <div className="mr-1 col">
                      <div className="display-forcast">{transforTime(item.utcTime, 5)}</div>
                      <div className="display-forcast"><img src={icons} alt="icons" width="30px" /></div>
                      <div className="display-forcast">{transforTemp(item.temperature)}℃</div>
                    </div>
                  </td>
                )
              }

              )}
            </tr>
          </tbody>

        </table>
      </div>
    </div>

  );
};

export default Hourly;
