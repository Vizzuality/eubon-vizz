import React, { Component } from 'react';
import Graph from './graph';
import CustomSelect from '../lib/select';
import Switch from '../lib/switch';
import countries from './data/countries.json';
import species from './data/species.json';

function parseCountries(countries) {
  return Object.keys(countries).map((key) => {
    return { value: key, label: countries[key] }
  })
}

function parseSpecies(species) {
  return Object.keys(species).map((key, index) => ({
    value: key,
    label: species[key].commonName,
    active: index < 4,
    color: species[key].color
  }));
}

class Chart extends Component {
  constructor() {
    super();
    this.countries = parseCountries(countries);
    this.state = {
      countrySelected: this.countries[0],
      species: parseSpecies(species),
      data: [[{x: 1, y: 10}, {x: 2, y: 5}, {x: 3, y: 15} ],[{x: 1, y: 10}, {x: 2, y: 5}, {x: 3, y: 15} ]]
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

  getSpecies(species) {
    return (
      <ul className="species-list">
        {species.map((item, index) => (
          <li key={index}>
            <Switch
              checkedColor={item.color}
              onChange={() => this.onSwitchChange(item)}
              checked={item.active || false}
              label={item.label}
            />
          </li>
        ))}
      </ul>
    );
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
           <Graph data={this.state.data} />
          </div>
          <div className="col2">
            {this.getSpecies(this.state.species)}
          </div>
        </div>
      </div>
    );
  }
}

export default Chart;
