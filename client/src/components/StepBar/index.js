import React from 'react'
import style from './index.module.scss'

function StepBar({ value, steps }) {
  const step = steps.find(step => step.value === value)
  const stage = step ? steps.indexOf(step) + 1 : 0
  return (
    <div className={style.stepBar}>
      {steps && steps.map((step, i) =>
        <div key={step.value} className={[style.step, stage > i ? style.complete : '', stage - 1 === i ? style.completeExact : ''].join(' ')}>
          <span>{step.label}</span>
          <div className={style.dot}>
            <i className={stage > i ? 'fas fa-check' : 'far fa-clock'} />
          </div>
        </div>
      )}
    </div>
  )
}

export default StepBar
