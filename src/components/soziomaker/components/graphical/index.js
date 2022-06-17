import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';


// const links = [{"source":"Microsoft","target":"Amazon","type":"licensing"},{"source":"Microsoft","target":"HTC","type":"licensing"},{"source":"Samsung","target":"Apple","type":"suit"},{"source":"Motorola","target":"Apple","type":"suit"},{"source":"Nokia","target":"Apple","type":"resolved"},{"source":"HTC","target":"Apple","type":"suit"},{"source":"Kodak","target":"Apple","type":"suit"},{"source":"Microsoft","target":"Barnes & Noble","type":"suit"},{"source":"Microsoft","target":"Foxconn","type":"suit"},{"source":"Oracle","target":"Google","type":"suit"},{"source":"Apple","target":"HTC","type":"suit"},{"source":"Microsoft","target":"Inventec","type":"suit"},{"source":"Samsung","target":"Kodak","type":"resolved"},{"source":"LG","target":"Kodak","type":"resolved"},{"source":"RIM","target":"Kodak","type":"suit"},{"source":"Sony","target":"LG","type":"suit"},{"source":"Kodak","target":"LG","type":"resolved"},{"source":"Apple","target":"Nokia","type":"resolved"},{"source":"Qualcomm","target":"Nokia","type":"resolved"},{"source":"Apple","target":"Motorola","type":"suit"},{"source":"Microsoft","target":"Motorola","type":"suit"},{"source":"Motorola","target":"Microsoft","type":"suit"},{"source":"Huawei","target":"ZTE","type":"suit"},{"source":"Ericsson","target":"ZTE","type":"suit"},{"source":"Kodak","target":"Samsung","type":"resolved"},{"source":"Apple","target":"Samsung","type":"suit"},{"source":"Kodak","target":"RIM","type":"suit"},{"source":"Nokia","target":"Qualcomm","type":"suit"}];
const types = ["Zuneigung","Abneigung", "GgsZuneigung", "GgsAbneigung", "Neutral"];


const drag = simulation => {
  
    function dragstarted(event, d) {
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event, d) {
      d.fx = null;
      d.fy = null;
    }
    
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
  }

function linkArc(d) {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
      M${d.source.x},${d.source.y}
      A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
    `;
  }

export default function SozioGramm(props) {
    const data = props.data
    const color = d3.scaleOrdinal().domain(types)
                                    .range(["green", "red", "green", "red", "gray"]);
    const chart = useRef()
    
    
    const setSVGDataCallBack = () => {
      props.setSVGData(chart.current)
    }

    useEffect(() => {
      DrawMetrik(chart);
      setSVGDataCallBack()
    }, [])
        
    const DrawMetrik = (canvas) => {
            const links = data.links.map(d => Object.create(d));
            const nodes = data.nodes.map(d => Object.create(d));

            const svg = d3.select(canvas.current)
            svg.selectAll("*").remove(); // clear before setting the new ones


            const simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id(d => d.id))
                .force("charge", d3.forceManyBody().strength(-1000).distanceMin(200).distanceMax(1000))
                .force("x", d3.forceX())
                .force("y", d3.forceY());

            let width = 600 
            let height = 600
            svg.attr("viewBox",  [-width / 2, -height / 2, width, height])

            // Per-type markers, as they don't inherit styles.
            svg.append("defs").selectAll("marker")
            .data(types)
            .join("marker")
                .attr("id", d => `arrow-${d}`)
                .attr("viewBox", "0 -5 16 16")
                .attr("refX", 15)
                .attr("refY", -0.5)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
            .append("path")
                .attr("fill", color)
                .attr("d", "M0,-5L10,0L0,5");
            
                const link = svg.append("g")
                    .attr("fill", "none")
                    .attr("stroke-width", 1.5)
                  .selectAll("path")
                  .data(links)
                  .join("path")
                    .attr("stroke", d => color(d.type))
                    .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, window.location.href)})`);
              
                const node = svg.append("g")
                    .attr("fill", "currentColor")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-linejoin", "round")
                  .selectAll("g")
                  .data(nodes)
                  .join("g")
                    .call(drag(simulation));
                
                node.append("circle")
                    .attr("stroke", "white")
                    .attr("stroke-width", 1.5)
                    .attr("fill", d => d.color)
                    .attr("r", 16)
            
              
                node.append("text")
                    .attr("x", 16)
                    .attr("y", "0.31em")
                    .text(d => d.id)
                  .clone(true).lower()
                    .attr("fill", "none")
                    .attr("stroke", "white")
                    .attr("stroke-width", 3);
              
                simulation.on("tick", () => {
                  link.attr("d", linkArc);
                  node.attr("transform", d => `translate(${d.x},${d.y})`);
                });

                // d3.invalidation.then(() => simulation.stop());
        
    };
 
  return (
    <svg
        ref={chart}
        width={"full"}
        length={"full"}
        height={"full"}
    />
  );
    
}