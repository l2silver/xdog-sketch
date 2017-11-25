import React from 'react'
import { Field } from 'redux-form'
import numeral from 'numeral'
import cx from 'classnames'

const renderSlider = props => {
  const { min, max, step, disabled } = props

  return field => (<input {...field.input} className='slider tooltip' type='range' min={ min } max={ max } step={ step } data-formatted-value={ numeral(field.input.value).format('0.00') } disabled={ disabled } />)
}

const Slider = props => {
  const { min, max, step, name, label, disabled } = props
  const labelClass = cx('form-label', { disabled })

  return (
    <div className="form-group">
      <div className="col-3">
        <label className={ labelClass } htmlFor={ name }>
          { label }
        </label>
      </div>
      <div className="col-9">
        <Field name={ name } component={ renderSlider({ min, max, step, disabled }) } />
      </div>
    </div>
  )
}
export default Slider