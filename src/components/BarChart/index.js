import React, { Component } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.maxWindowWidth = props.maxWindowWidth;
    this.margin = {
      top: 30,
      right: 30,
      bottom: 40,
      left: 90
    };

    this.yLabel = "Market Capactiy (USD)";
    this.xLabel = "";
    this.xScale = d3.scaleBand().padding(0.5);
    this.yScale = d3.scaleLinear();
    this.tooltipStyles = {
      opacity: 0,
      position: "absolute",
      display: "flex",
      width: "150px",
      height: "50px",
      backgroundColor: "white",
      color: "black",
      border: "1px solid black"
    };
  }

  onResize() {
    if (this.svg) {
      this.clearChart();
    }
    this.resizeChart();
    this.setupScales();
    this.renderChart();
  }

  componentDidMount() {
    this.tooltip = d3.select(".tooltip");
    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize.bind(this));
  }

  resizeChart() {
    const _h = +window.innerHeight * 0.3;
    const _w = Math.min(this.maxWindowWidth, +window.innerWidth);
    this.width = _w - this.margin.left - this.margin.right;
    this.height = _h - this.margin.top - this.margin.bottom;
    this.svg = d3
      .select("svg.bar-chart")
      .attr("width", _w)
      .attr("height", _h);
    console.log(this.svg);
    this.xScale.rangeRound([0, this.width]);
    this.yScale.rangeRound([this.height, 0]);
  }

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    data: [],
    maxWindowWidth: 1000
  };

  addStyles(el, styles) {
    for (let style in styles) {
      el.style(style, styles[style]);
    }
  }

  setupScales() {
    const { data } = this.props;
    const xDomain = data.map(d => d.short);

    this.xScale.domain(xDomain).range([0, this.width]);

    this.yScale
      .domain(d3.extent(data.map(d => d.mktcap)))
      .rangeRound([this.height, 0]);
  }

  createXAxis() {
    this.svg
      .append("g")
      .attr("class", "axis")
      .attr(
        "transform",
        `translate(${this.margin.left}, ${this.height + this.margin.top})`
      )
      .call(d3.axisBottom(this.xScale));
    const axesStyles = {
      fill: "none",
      stroke: "#000",
      "shape-rendering": "crispEdges"
    };
    this.addStyles(d3.selectAll(".axis path"), axesStyles);
    this.addStyles(d3.selectAll(".axis line"), axesStyles);
    this.addStyles(d3.selectAll(".axis .domain"), {
      ...axesStyles,
      display: "none"
    });

    this.svg
      .append("text")
      .attr(
        "transform",
        "translate(" +
          this.width / 2 +
          " ," +
          (this.height + this.margin.top + 20) +
          ")"
      )
      .style("text-anchor", "middle")
      .text(this.xLabel);
  }

  createYAxis() {
    this.svg
      .append("g")
      .attr("class", "yaxis")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale).ticks(4));

    this.svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", this.margin.left)
      .attr("x", 0 - this.height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(this.yLabel);
  }

  componentDidUpdate() {
    this.onResize();
  }

  clearChart() {
    this.svg.html("");
  }

  renderChart() {
    const { data } = this.props;
    const g = this.svg
      .append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);
    g
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("width", this.xScale.bandwidth())
      .attr("height", d => this.height - this.yScale(d.mktcap))
      .attr("x", d => this.xScale(d.short))
      .attr("y", d => this.yScale(d.mktcap))
      .attr("fill", "steelblue");

    this.createXAxis();
    this.createYAxis();
  }

  render() {
    return (
      <div>
        <svg className="bar-chart" />
        <div className="tooltip" style={this.tooltipStyles} />
      </div>
    );
  }
}

export default BarChart;
