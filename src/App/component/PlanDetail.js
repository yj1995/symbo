import React, { Component } from 'react';

class PlanDetail extends Component {
    constructor(props) {
        super(props)
        this.data = props.history.location.data;
        this.planDetail = this.planDetail.bind(this);

        // This used to see which key wanted display on the page
        this.displayLabel = ['Plan Name', 'Insurance Provider Name', 'Status', 'Medical Features', 'Travel Features', 'Plan Type', 'Sum Insured'];
        this.display = ['planName', 'insuranceProviderName', 'status', 'MedicalFeatures', 'TravelFeatures', 'planType', 'sumInsured'];
    }

    // This function is used create detail view page
    planDetail() {
        const displayElement = [];
        let string = [];
        this.display.forEach((key, i) => {
            Object.keys(this.data.plan).forEach((val) => {
                if (this.data.plan[val]) {
                    if (typeof (this.data.plan[val]) !== 'object') {
                        if (key === val) {
                            displayElement.push(<div key={'val' + val} className='parentCell'>{this.displayLabel[i]}</div>);
                            displayElement.push(<div key={'val' + this.data.plan[val]} className='parentCell' style={{ textAlign: 'left', paddingLeft: 10 }}>{this.data.plan[val]}</div>);
                        }
                    } else {
                        Object.keys(this.data.plan[val]).forEach((subValue) => {
                            if (key === subValue && subValue.length === 0) {
                                displayElement.push(<div key={'subValue' + subValue} className='parentCell'>{this.displayLabel[i]}</div>);
                                displayElement.push(<div key={'subValue' + this.data.plan[val][subValue]} className='parentCell' style={{ textAlign: 'left', paddingLeft: 10 }}>{this.data.plan[val][subValue]}</div>);
                            } else {
                                if (key === subValue) {
                                    for (let i = 0; i < this.data.plan[val][subValue].length; i++) {
                                        string.push(<div className='feature'>{this.data.plan[val][subValue][i].benefitName + ' : ' + this.data.plan[val][subValue][i].benefitValue}</div>);
                                    }
                                    displayElement.push(<div key={'subValue' + subValue} className='parentCell'>{this.displayLabel[i]}</div>);
                                    displayElement.push(<div style={{ paddingLeft: 10 }} key={'subValue' + this.data.plan[val][subValue]} className='parentCell'>{string}</div>);
                                    string = [];
                                }
                            }
                        })
                    }
                }
            });
            Object.keys(this.data).forEach((val) => {
                if (key === val) {
                    displayElement.push(<div key={'val' + val} className='parentCell'>{this.displayLabel[i]}</div>);
                    displayElement.push(<div key={'val' + this.data[val]} className='parentCell' style={{ textAlign: 'left', paddingLeft: 10 }}>{this.data[val]}</div>);
                }
            })
        });
        return displayElement;
    }
    render() {
        return (
            <React.Fragment>
                <div className='parentTable'>
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



export { PlanDetail };

