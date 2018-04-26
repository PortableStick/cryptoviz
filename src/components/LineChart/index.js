import React, { Component } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.maxWindowWidth = props.maxWindowWidth;
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
    this.x = d3.scaleTime();
    this.y = d3.scaleLinear();
  }

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    maxWindowWidth: PropTypes.number
  };

  static defaultProps = {
    data: [],
    maxWindowWidth: 1000
  };

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
    window.addEventListener("resize", this.onResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize.bind(this));
  }

  onResize() {
    this.resizeChart();
    this.renderChart();
  }

  resizeChart() {
    const _h = +window.innerHeight * 0.3;
    const _w = Math.min(this.maxWindowWidth, +window.innerWidth);
    this.width = _w - this.margin.left - this.margin.right;
    this.height = _h - this.margin.top - this.margin.bottom;
    this.svg = d3
      .select("svg.line-chart")
      .attr("width", _w)
      .attr("height", _h);
    this.x.rangeRound([0, this.width]);
    this.y.rangeRound([this.height, 0]);
  }

  createYAxis() {
    this.svg
      .append("g")
      .attr(
        "transform",
        `translate(${this.margin.right + this.margin.left}, ${this.margin.top})`
      )
      .call(d3.axisRight(this.y));
  }

  createXAxis() {
    this.svg
      .append("g")
      .attr(
        "transform",
        `translate(${this.margin.left}, ${this.height + this.margin.top + 10})`
      )
      .call(d3.axisBottom(this.x));
  }

  createYAxis() {
    this.svg
      .append("g")
      .attr("class", "yaxis")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisRight(this.y));
  }

  componentDidUpdate() {
    const { data } = this.state;

    this.x.domain(d3.extent(data.map(d => d.date))).rangeRound([0, this.width]);
    this.y
      .domain(d3.extent(data.map(d => d.data)))
      .rangeRound([this.height, 0]);

    this.renderChart();
  }

  renderChart() {
    const { data } = this.state;
    // clear the chart
    this.svg.html("");

    const g = this.svg
      .append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);
    const line = d3
      .line()
      .x(d => this.x(d.date))
      .y(d => this.y(d.data));
    g
      .append("path")
      .datum(this.state.data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    this.createXAxis();
    this.createYAxis();
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
