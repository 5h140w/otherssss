import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const LineChartProvider = ({ datasets, addNewDataset }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const { width, height } = svgRef.current.getBoundingClientRect();

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(datasets.flat(), (d) => d.time))
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(datasets.flat(), (d) => d.value)])
      .range([innerHeight, 0]);

    const line = d3
      .line()
      .x((d) => xScale(d.time))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .call(
        d3
          .axisBottom(xScale)
          .ticks(d3.timeMinute.every(2))
          .tickFormat(d3.timeFormat("%H:%M"))
          .tickSizeOuter(0)
      )
      .attr("transform", `translate(0,${innerHeight})`)
      .attr("color", "white");

    g.append("g").call(d3.axisLeft(yScale)).attr("color", "white");

    datasets.forEach((data, index) => {
      const color = d3.schemeCategory10[index % 10];

      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("d", line);

      g.selectAll(`.point-${index}`)
        .data(data)
        .enter()
        .append("circle")
        .attr("class", `point-${index}`)
        .attr("cx", (d) => xScale(d.time))
        .attr("cy", (d) => yScale(d.value))
        .attr("r", 4)
        .attr("fill", color)
        .on("mouseover", (event, d) => {
          tooltip.transition().duration(200).style("opacity", 1);
          tooltip
            .html(
              `Time: ${d3.timeFormat("%H:%M:%S")(d.time)}<br>Value: ${d.value}`
            )
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", () => {
          tooltip.transition().duration(500).style("opacity", 0);
        });
    });

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("padding", "5px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "3px")
      .style("pointer-events", "none")
      .style("opacity", 0);
  }, [datasets]);

  return (
    <div>
      <svg ref={svgRef} style={{ width: "100%", height: "500px" }}></svg>
    </div>
  );
};

export default LineChartProvider;
