import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { intlPercentNumFormat } from "../../helpers/functions";

export default function TreeMap({ rawData, width }) {
    const svgRef = useRef(null);

    useEffect(() => {
        if (rawData.length > 0 && width) {
            const margin = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            };
            const outerWidth = width;
            const outerHeight = 260;
            const innerWidth = outerWidth - margin.left - margin.right;
            const innerHeight = outerHeight - margin.top - margin.bottom;

            const data = {
                children: []
            }

            const others = {
                symbol: "Others",
                quote: 0,
                percentage: 0
            }

            rawData.forEach(elem => {
                if (elem.quote !== 0) {
                    if (elem.percentage < 0.05) {
                        others.quote += elem.quote;
                        others.percentage += elem.percentage;
                    } else {
                        data.children.push({
                            symbol: elem.symbol,
                            quote: elem.quote,
                            percentage: elem.percentage
                        });
                    }
                }
            });

            if (others.quote > 0 && others.percentage > 0) {
                data.children.push(others);
            }

            const svg = d3.select(svgRef.current)
                .data([null])
                .join("svg")
                .classed("svgChart treeMap", true)
                .attr("width", outerWidth)
                .attr("height", outerHeight)
                .attr("viewBox", [0, 0, outerWidth, outerHeight])
                .style("border-bottom", "1px solid var(--lightgray)");

            const tree = svg.selectAll(".tree")
                .data([null])
                .join("g")
                .classed("tree", true)
                .attr("width", innerWidth)
                .attr("height", innerHeight)
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const root = d3.hierarchy(data)
                .sum(d => d.quote)
                .sort((a, b) => b.quote - a.quote);

            const treemap = d3.treemap()
                .size([innerWidth, innerHeight])
                .tile(d3.treemapBinary)
                .padding(-1);

            const nodes = treemap(root);

            const leaf = tree.selectAll("g")
                .data(nodes.leaves())
                .join("g")
                .classed("tree", "leaf")
                .attr("transform", d => `translate(${d.x0},${d.y0})`);

            leaf.append("rect")
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0)
                .style("fill", d => {
                    if(d.data.percentage > 0.5) {
                        return "rgba(77,71,247,0.3)";
                    }
                    if(d.data.percentage > 0.25) {
                        return "rgba(77,71,247,0.25)";
                    }
                    return "rgba(77,71,247,0.1)";
                })

            leaf.append("text")
                .text(d => d.data.symbol)
                .classed("leafTicker", true)
                .attr("x", d => (d.x1 - d.x0) / 2)
                .attr("y", d => (d.y1 - d.y0) / 2)
                .style("alignment-baseline", "ideographic")
                .style("font-size", (d, i) => calcFontSize((d.x1 - d.x0), (d.y1 - d.y0)) - 4)
                .style("font-family", '"Inter", sans-serif')
                .style("fill", "var(--white)")
                .style("text-anchor", "middle");

            leaf.append("text")
                .text(d => {
                    return intlPercentNumFormat(d.data.percentage);
                })
                .classed("leafValue", true)
                .attr("x", d => (d.x1 - d.x0) / 2)
                .attr("y", d => (d.y1 - d.y0) / 2 + 4)
                .style("alignment-baseline", "hanging")
                .style("font-size", (d, i) => calcFontSize((d.x1 - d.x0), (d.y1 - d.y0)))
                .style("font-family", '"Inter", sans-serif')
                .style("fill", "var(--white)")
                .style("text-anchor", "middle");
        }
    }, [rawData, width]);

    const calcFontSize = (w, h) => {
        const a = 20;
        const b = 40;
        const x = 10;

        for (let i = 1; i < 100; i++) {
            if (h < a * i || w < b * i) return (x + i * 2);
        }
    }

    return <svg ref={svgRef}></svg>;
}
