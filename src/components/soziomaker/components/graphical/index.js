import React, {useEffect, useRef} from 'react';
import CreateSoziogramm from './CreateSoziogramm'

export default function SozioGramm(props) {
    const data = props.data
    const chart = useRef()    
    
    const setSVGDataCallBack = () => {
      props.setSVGData(chart.current)
    }

    useEffect(() => {
      console.log(CreateSoziogramm(chart, data, false))
      console.log(chart)
      setSVGDataCallBack()
    }, [])
 
  return (
    <svg
        ref={chart}
        id="graph"
        width={"full"}
        height={"full"}
    />
  );
    
}