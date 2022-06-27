import * as d3 from 'd3';

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


  
  const getChildById = (doc, id) => {
    for (let index = 0; index < doc.getDataByKey("rw_data").Childs.length; index++) {
        const element = doc.getDataByKey("rw_data").Childs[index];
        if (element.id === id) {
            return element;
        }
    }
    
    return null;
}
 

  function processGraphicalData(document) {
    // first nodes 
    let nodes = []
    if (!document || !document.getDataByKey("rw_data")?.Childs)
      return null
    
     document.getDataByKey("rw_data").Childs.forEach(child => {
      nodes.push({
        "id": child.name,
        "color": child.color       
      })
    });

    let links = []
    document.getDataByKey("rw_data").Relations.forEach(relataion => {
      let source = getChildById(document, relataion.ChildId);
      
      relataion.affected.forEach(t_id => {
        let target = getChildById(document, t_id);
        links.push({
          "source": source.name,
          "target": target.name,
          "type": "Zuneigung"
        })
      }) 
      relataion.aversion.forEach(t_id => {
        let target = getChildById(document, t_id);
        links.push({
          "source": source.name,
          "target": target.name,
          "type": "Abneigung"
        })
      }) 
    })

    const d = {
      "nodes": nodes,
      "links": links
    }
    return d
  }

export default function CreateSoziogramm(parent, d, forDownload) {

    let data = processGraphicalData(d);
    const color = d3.scaleOrdinal().domain(types)
                                    .range(["green", "red", "green", "red", "gray"]);
    const canvas = parent;

    const DrawMetrik = (canvas) => {
        const svg = d3.select(canvas.current)
        svg.selectAll("*").remove(); // clear before setting the new ones

        if (!data)
         return null;
        
        const links = data.links.map(d => Object.create(d));
        const nodes = data.nodes.map(d => Object.create(d));

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody().strength(-1000).distanceMin(200).distanceMax(1000))
            .force("x", d3.forceX())
            .force("y", d3.forceY());

        let width = 600 
        let height = 600
        svg.attr("viewBox",  [-width / 2, -height / 2, width, height])
        svg.attr("xmlns", "http://www.w3.org/2000/svg")
        svg.attr("version", "1.1")

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
        
        let link
        if (!forDownload) {
          link = svg.append("g")
                  .attr("fill", "none")
                  .attr("stroke-width", 1.5)
                .selectAll("path")
                .data(links)
                .join("path")
                  .attr("stroke", d => color(d.type))
                  .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, window.location.href)})`);
        }
        else {
          link = svg.append("g")
                  .attr("fill", "none")
                  .attr("stroke-width", 1.5)
                .selectAll("path")
                .data(links)
                .join("path")
                  .attr("stroke", d => color(d.type))
                  .attr("marker-end", d => `url(#arrow-${d.type}`);
        }
          
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
            return canvas.current
    };

    return DrawMetrik(canvas)
}