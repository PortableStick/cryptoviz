import React, { Component } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

import { formatMoney } from "../../utils";

class BarChart extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    data: [],
    maxWindowWidth: 1600
  };

  margin = {
    top: 30,
    right: 30,
    bottom: 40,
    left: 90
  };

  yLabel = "Market Capacity (Million USD)";
  xLabel = "";
  xScale = d3.scaleBand().padding(0.1);
  yScale = d3.scaleLog();
  tooltipStyles = {
    opacity: 0,
    position: "absolute",
    display: "flex",
    width: "150px",
    height: "50px",
    backgroundColor: "white",
    color: "black",
    border: "1px solid black"
  };

  constructor(props) {
    super(props);
    this.maxWindowWidth = props.maxWindowWidth;
  }

  onResize() {
    if (this.svg) {
      this.clearChart();
    }
    this.resizeChart();
    this.setupScales();
    this.renderChart();
    this.createMouseEffects();
  }

  clearChart() {
    this.svg.html("");
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
    this.xScale.rangeRound([0, this.width]);
    this.yScale.rangeRound([this.height, 0]);
  }

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
      .attr(
        "transform",
        `translate(${this.margin.left - 10}, ${this.margin.top})`
      )
      .call(
        d3
          .axisLeft(this.yScale)
          .ticks(2)
          .tickFormat(d => `$${d / 1000000}`)
      );

    this.svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", this.margin.left - 10)
      .attr("x", 0 - this.height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(this.yLabel);
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

  createMouseEffects() {
    const {
      height,
      width,
      margin: { top, bottom, left, right },
      xScale,
      yScale,
      focus,
      tooltip
    } = this;
    const { data } = this.props;

    d3
      .selectAll(".bar")
      .on("mouseover", function(d, i) {
        const [x, y] = d3.mouse(this);
        tooltip
          .style("opacity", 1)
          .style("left", `${x}px`)
          .style("top", `${y}px`)
          .html(
            `<div style="text-align: center; padding-left: 10%;"><div>${
              d.long
            }</div><div>$${formatMoney(d.volume)}</div></div>`
          );
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });
  }

  componentDidMount() {
    this.tooltip = d3.select(".tooltip");
    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
  }

  componentDidUpdate() {
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize.bind(this));
  }
  render() {
    return (
      <div>
        <svg className="bar-chart" />
        <div className="tooltip" style={this.tooltipStyles}>
          Hello!
        </div>
      </div>
    );
  }
}

export default BarChart;
