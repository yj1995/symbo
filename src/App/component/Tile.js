import React from 'react';

function Tile({ data, click }) {
    return (
        <div className='tileBody' id={data.plan.planName} onClick={(e) => { click(e); }}>
            <div className='tileImage' style={{ backgroundImage: 'url(./image/' + data.insuranceProviderId + '.png)' }} />
            <div className='tileInfo'>
                <div className='tileLabel'>
                    <div className='tileName'>Plan Name:</div>
                    <div className='tileNameInfo'>{data.plan.planName}</div>
                </div>
                <div className='tileLabel'>
                    <div className='tileProvider'>Insurance Provider Name:</div>
                    <div className='tileNameInfo'>{data.plan.insuranceProviderName}</div>
                </div>
                <div className='tileLabel'>
                    <div className='tileName'>Sum Insured:</div>
                    <div className='tileNameInfo'>{data.plan.sumInsureds[0]}</div>
                </div>
            </div>
        </div>
    )
}

export { Tile };

