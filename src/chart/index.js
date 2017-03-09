import React, { Component } from 'react';
import Graph from './graph';
import CustomSelect from '../lib/select';
import Switch from '../lib/switch';
import butterfliesData from './data/butterflies.json';
import countriesData from './data/countries.json';
import speciesData from './data/species.json';

function parseCountries(countries) {
  function sort(a,b) {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  }
  return Object.keys(countries).map((key) => {
    return { value: key, label: countries[key] }
  }).sort(sort)
}

function parseSpecies(species) {
  return Object.keys(species).map((key, index) => ({
    value: key,
    label: species[key].commonName,
    title: species[key].fullName,
    active: index < 3,
    color: species[key].color
  }));
}

function parseData(data, selectedCountry, selectedSpecies) {
  const dataParsed = selectedSpecies.map((species) => {
    const dataParsed = Object.keys(data).map((year, index) => {
      let totalSum = 0;
      selectedSpecies.forEach((item) => {
        totalSum += data[year][selectedCountry][item];
      });
      return {
        x: year.replace('_', ' - '),
        y: (data[year][selectedCountry][species] * 100) / totalSum || 0
      }
    });
    return {
      data: dataParsed,
      color: speciesData[species].color };
  });
  return dataParsed;
}


function getActiveSpecies(species) {
  return species.reduce(function(result, item) {
    if (item.active) result.push(item.value)
    return result;
  }, []);
}

class Chart extends Component {
  constructor() {
    super();
    this.countries = parseCountries(countriesData);
    const countrySelected = this.countries[0];
    const species = parseSpecies(speciesData);
    this.state = {
      size: null,
      species,
      countrySelected,
      data: parseData(butterfliesData, countrySelected.value, getActiveSpecies(species))
    }
  }

  componentDidMount() {
    this.updateSize({
      height: 250,
      width: this.graph.getBoundingClientRect().width
    });
  }

  updateSize(size) {
    this.setState({ size });
  }

  updateCountry(selected) {
    if (this.state.countrySelected.value !== selected.value) {
      this.setState((state) => ({
        countrySelected: selected,
        data: parseData(butterfliesData, selected.value, getActiveSpecies(state.species)),
      }));
    }
  }

  onSwitchChange(selected) {
    this.setState((state) => {
      const species = state.species.map((item) => (
        item.value === selected.value
          ? { ...item, active: !selected.active }
          : item
      ));
      const data = parseData(butterfliesData, state.countrySelected.value, getActiveSpecies(species));
      return { data, species }
    });
  }

  getPlaceholder() {
    return (
      <div className="placeholder"><p class="light"> Please select one species </p></div>
    )
  }
  getSpecies(species) {
    return (
      <ul className="species-list">
        {species.map((item, index) => (
          <li key={index}>
            <Switch
              title={item.title}
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
            <div
              className="col1 graph"
              ref={(graph) => this.graph = graph }
              style={{ minHeight: this.state.size && this.state.size.height ? this.state.size.height : 0 }}>
              {this.state.size && this.state.data.length > 0
                ? <Graph size={this.state.size} data={this.state.data} />
                : <p className="light"> Please, select one species </p>
              }
            </div>
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
