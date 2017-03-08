import React from 'react';

function Switch(props) {
  const classNames = ['toggle'];
  let checkedColor = {};

  if (props.checked) {
    classNames.push('-checked');
    if (props.checkedColor) checkedColor = { backgroundColor: props.checkedColor }
  }

  return (
    <div className="c-switch" onClick={props.onChange}>
      <span style={checkedColor} className={classNames.join(' ')} />
      {props.label &&
        <span className="label">{props.label}</span>
      }
    </div>
  );
}

Switch.propTypes = {
  /**
  * Define the component "state"
  */
  checked: React.PropTypes.bool,
  /**
  * Define the color in checked state
  */
  checkedColor: React.PropTypes.string,
  /**
  * Define the switch label
  */
  label: React.PropTypes.string,
  /**
  * Define the function to handle the changes
  */
  onChange: React.PropTypes.func.isRequired
};

export default Switch;
