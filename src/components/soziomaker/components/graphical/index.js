import React, {useEffect, useRef} from 'react';
import CreateSoziogramm from './CreateSoziogramm'

export default function SozioGramm(props) {
    const data = props.data
    const chart = useRef()    
    
    const setSVGDataCallBack = () => {
      props.setSVGData(chart.current)
    }

    useEffect(() => {
      console.log(CreateSoziogramm(chart, data, true))
      console.log(chart)
      setSVGDataCallBack()
    }, [])
 
  return (
    <svg
        ref={chart}
        width={"full"}
        height={"full"}
    />
  );
    
}