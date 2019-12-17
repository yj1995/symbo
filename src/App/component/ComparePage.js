import React, { Component } from 'react';

class ComparePage extends Component {
    constructor(props) {
        super(props)
        this.data = props.history.location.selected;
        this.planDetail = this.planDetail.bind(this);
        this.displayLabel = ['Plan Name', 'Insurance Provider Name', 'Status', 'Medical Features', 'Travel Features', 'Plan Type', 'Sum Insured', 'Premium'];
        this.display = ['planName', 'insuranceProviderName', 'status', 'MedicalFeatures', 'TravelFeatures', 'planType', 'sumInsured', 'amountValue'];
    }

    planDetail() {
        console.log(this.data[0]);
        const displayElement = [];
        let string = [];
        this.display.forEach((val, i) => {
            displayElement.push(<div key={'val' + val} className='parentCell'>{this.displayLabel[i]}</div>);
            this.data.forEach((dataValue) => {
                Object.keys(dataValue.plan).forEach((key) => {
                    if (val === key) {
                        displayElement.push(<div key={'key' + key} className='parentCell'>{dataValue.plan[key]}</div>);
                    } else if (dataValue.plan[key] && typeof (dataValue.plan[key]) === 'object') {
                        Object.keys(dataValue.plan[key]).forEach((subKey) => {
                            if (val === subKey) {
                                for (let i = 0; i < dataValue.plan[key][subKey].length; i++) {
                                    string.push(<div key={dataValue.plan[key][subKey][i].benefitName} style={{ padding: '5px 0px' }} className='feature'>{dataValue.plan[key][subKey][i].benefitName + ' : ' + dataValue.plan[key][subKey][i].benefitValue}</div>);
                                }
                                displayElement.push(<div style={{ paddingLeft: 10 }} key={'subKey' + dataValue.plan[key][subKey]} className='parentCell'>{string}</div>);
                                string = [];
                            }
                        })
                    }
                });
                Object.keys(dataValue).forEach((key) => {
                    if (val === key) {
                        displayElement.push(<div key={'key' + key} className='parentCell'>{dataValue[key]}</div>);
                    }
                })
                Object.keys(dataValue.totalAmount).forEach((subKey) => {
                    if (subKey === val) {
                        displayElement.push(<div key={'subKey' + subKey} className='parentCell'>{dataValue.totalAmount[subKey]}</div>);
                    }
                });
            })
        });
        return displayElement;
    }

    render() {
        const selectedLength = this.data.length;
        const size = (100 - 12) / selectedLength;
        let columns = '12%';
        for (let i = 0; i < selectedLength; i++) {
            columns += size + '% ';
        }
        return (
            <React.Fragment>
                <div className='parentTable' style={{ gridTemplateColumns: columns }}>
                    {this.planDetail()}
                </div>
                <button className='backButton' onClick={() => {
                    this.props.history.push({
                        pathname: '/',
                    });
                }}>Back</button>
            </React.Fragment>
        )
    }
}

export { ComparePage };