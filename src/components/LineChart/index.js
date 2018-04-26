import React, { Component } from "react";
import * as d3 from "d3";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.margin = {
      top: 30,
      right: 30,
      bottom: 40,
      left: 50
    };
    this.state = {
      dates: [],
      data: []
    };
  }

  static getDerivedStateFromProps(newProps) {
    const data = newProps.data.map(d => ({
      date: new Date(+d[0]),
      data: +d[1]
    }));
    return {
      data
    };
  }

  componentDidMount() {
    this.resizeChart();
    window.addEventListener("resize", () => {
      this.resizeChart();
      this.renderChart();
    });
  }

  resizeChart() {
    const _h = +window.innerHeight * 0.3;
    const _w = +window.innerWidth;
    this.svg = d3
      .select("svg.line-chart")
      .attr("width", _w)
      .attr("height", _h);
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    const { data } = this.state;
    // clear the chart
    this.svg.html("");

    const width =
      +this.svg.attr("width") - this.margin.left - this.margin.right;
    const height =
      +this.svg.attr("height") - this.margin.top - this.margin.bottom;

    const g = this.svg
      .append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);
    const x = d3
      .scaleTime()
      .domain(d3.extent(data.map(d => d.date)))
      .rangeRound([0, width]);
    const y = d3
      .scaleLinear()
      .domain(d3.extent(data.map(d => d.data)))
      .rangeRound([height, 0]);
    const line = d3
      .line()
      .x(d => x(d.date))
      .y(d => y(d.data));
    g
      .append("path")
      .datum(this.state.data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }

  render() {
    return (
      <div>
        <svg className="line-chart" />
      </div>
    );
  }
}

export default LineChart;
