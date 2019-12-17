import React from 'react';
function Tile({ data, click, checkBox }) {
    return (
        <div className='tileBody'>
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
                    <div className='tileNameInfo'>{data.sumInsured}</div>
                </div>
                <div className='tileLabel' style={{ width: '100%' }}>
                    <button id={data.plan.planName} amount={data.sumInsured} className='detail' onClick={(e) => { click(e); }}>View Details</button>
                    <input type='checkbox' amount={data.sumInsured} id={data.plan.planName} onClick={(e) => { checkBox(e); }} text='compare' />
                    <span className='checkboxStyle'>Compare</span>
                </div>
            </div>
        </div>
    )
}

export { Tile };

