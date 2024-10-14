import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const GroupedBarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const { width, height } = svgRef.current.getBoundingClientRect();

    // Set up margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous content
    svg.selectAll("*").remove();

    // Create scales
    const x0 = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, innerWidth])
      .padding(0.1);

    const x1 = d3
      .scaleBand()
      .domain(data[0].values.map((d) => d.name))
      .range([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d3.max(d.values, (v) => v.value))])
      .nice()
      .range([innerHeight, 0]);

    const color = d3
      .scaleOrdinal()
      .domain(data[0].values.map((d) => d.name))
      .range(["white", "gold", "blue"]); // Updated colors

    // Create the SVG container
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add the bars
    g.append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", (d) => `translate(${x0(d.date)},0)`)
      .selectAll("rect")
      .data((d) => d.values)
      .join("rect")
      .attr("x", (d) => x1(d.name))
      .attr("y", (d) => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => innerHeight - y(d.value))
      .attr("fill", (d) => color(d.name)); // Use color scale

    // Add x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x0).tickFormat(d3.timeFormat("%H:%M")).tickSize(0))
      .selectAll("text")
      .style("text-anchor", "middle");

    // Add y-axis
    g.append("g").call(d3.axisLeft(y));

    // Add legend
    const legend = g
      .append("g")
      .attr("transform", `translate(${innerWidth}, 0)`);

    legend
      .selectAll("rect")
      .data(data[0].values)
      .enter()
      .append("rect")
      .attr("x", -20)
      .attr("y", (d, i) => i * 20)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d) => color(d.name));

    legend
      .selectAll("text")
      .data(data[0].values)
      .enter()
      .append("text")
      .attr("x", -24)
      .attr("y", (d, i) => i * 20 + 9)
      .attr("dy", "0.35em")
      .style("text-anchor", "end")
      .text((d) => d.name);
  }, [data]);

  return <svg ref={svgRef} style={{ width: "100%", height: "500px" }}></svg>;
};

export default GroupedBarChart;
