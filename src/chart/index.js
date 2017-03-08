import React, { Component } from 'react';
import CustomSelect from '../lib/select';
import countries from './data/countries.json';

function parseCountries(countries) {
  return Object.keys(countries).map((key) => {
    return { value: key, label: countries[key] }
  })
}

class Chart extends Component {
  constructor() {
    super();
    this.countries = parseCountries(countries);
    this.state = {
      countrySelected: this.countries[0]
    }
  }

  updateCountry(selected) {
    this.setState({
      countrySelected: selected
    });
  }

  onSwitchChange(selected) {
    this.setState((state) => ({
      species: state.species.map((item) => (
        item.value === selected.value
          ? { ...item, active: !selected.active }
          : item
      ))
    }));
  }

  render() {
    return (
      <div className="c-chart">
        <div className="chart-row">
          <div className="col1">
            <h2 className="title">Relative Abundance of Butterfly Species over time</h2>
          </div>
          <div className="col2">
            <div className="c-select">
              <div className="select-header">
                <span className="title">Select a country</span>
              </div>
              <CustomSelect
                options={this.countries}
                value={this.state.countrySelected.value}
                onValueChange={selected => selected && this.updateCountry(selected)}
              />
            </div>
          </div>
        </div>
        <div className="chart-row">
          <div className="col1">
            <p>Chart</p>
          </div>
          <div className="col2">
            Species
          </div>
        </div>
      </div>
    );
  }
}

export default Chart;
