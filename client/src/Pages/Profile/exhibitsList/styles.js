import React from 'react'
import {render} from 'react-dom'
import {createUseStyles} from 'react-jss'


export const useStyles = createUseStyles({
  controlBar: {
    margin: {

      top: 50
    },
    '& span': {
      // jss-plugin-nested applies this to a child span
      fontWeight: 'bold' // jss-plugin-camel-case turns this into 'font-weight'
    }
  },
  myLabel: {
    fontStyle: 'italic'
  }
})


