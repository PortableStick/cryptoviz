import React, { Component } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import { formatMoney } from "../../utils";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.maxWindowWidth = props.maxWindowWidth;
    this.yLabel = "Market Volume (USD)";
    this.xLabel = "";
    this.margin = {
      top: 30,
      right: 30,
      bottom: 40,
      left: 90
    };
    this.state = {
      dates: [],
      data: []
    };
    this.xScale = d3.scaleTime();
    this.yScale = d3.scaleLinear();
    this.tooltipStyles = {
      opacity: 0,
      position: "absolute",
      display: "flex",
      width: "150px",
      height: "50px",
      border: "1px solid black",
      overflow: "hidden",
      backgroundColor: "white"
    };
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
    const { isoParse } = d3;
    const data = newProps.data.map(d => ({
      date: isoParse(+d[0]),
      data: +d[1]
    }));

    return {
      data
    };
  }

  setupFocus() {
    this.focus = this.svg
      .append("g")
      .attr("class", "focus")
      .style("display", "none");

    this.focus.append("circle").attr("r", 4.5);

    this.focus.append("line").classed("x", true);

    this.focus.append("line").classed("y", true);

    this.focus
      .append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

    d3.selectAll(".focus").style("opacity", 0.7);

    d3
      .selectAll(".focus circle")
      .style("fill", "none")
      .style("stroke", "black");

    d3
      .selectAll(".focus line")
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", "1.5px")
      .style("stroke-dasharray", "3 3");
  }

  componentDidMount() {
    this.tooltip = d3.select(".tooltip");
    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize.bind(this));
  }

  onResize() {
    this.resizeChart();
    this.renderChart();
    this.setupFocus();
    this.setupOverlay();
    this.createMouseEffects();
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
    this.xScale.rangeRound([0, this.width]);
    this.yScale.rangeRound([this.height, 0]);
  }

  setupOverlay() {
    this.overlay = this.svg
      .append("rect")
      .attr("class", "overlay")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);
  }

  addStyles(el, styles) {
    for (let style in styles) {
      el.style(style, styles[style]);
    }
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

  createMouseEffects() {
    const {
      height,
      width,
      margin: { top, bottom, left, right },
      xScale,
      yScale,
      focus,
      tooltip,
      state: { data }
    } = this;

    this.overlay
      .on("mouseover", function() {
        focus.style("display", null);
        tooltip.style("opacity", "1");
      })
      .on("mouseout", () => {
        focus.style("display", "none");
        tooltip.style("opacity", "0");
      })
      .on("mousemove", function() {
        if (data.length === 0) return;
        const [x, y] = d3.mouse(this);
        const date = xScale.invert(x);
        const bisectDate = d3.bisector(d => d.date).left;
        const i = bisectDate(data, date, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const d = x - d0.date > d1.date - x ? d1 : d0;
        focus.attr(
          "transform",
          `translate(${xScale(d.date) + left}, ${yScale(d.data) + top})`
        );
        focus
          .select("line.x")
          .attr("x1", 0)
          .attr("x2", -xScale(d.date))
          .attr("y1", 0)
          .attr("y2", 0);

        focus
          .select("line.y")
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("y1", 0)
          .attr("y2", height - yScale(d.data));

        tooltip
          .style("left", `${x - 69}px`)
          .style("top", `${height + y - 10}px`)
          .html(`<div>$${formatMoney(d.data)} ${d.date}</div>`);
      });
  }

  componentDidUpdate() {
    const { data } = this.state;
    const xDomain = data.map(d => d.date);

    this.xScale.domain(d3.extent(xDomain)).rangeRound([0, this.width]);

    this.yScale
      .domain(d3.extent(data.map(d => d.data)))
      .rangeRound([this.height, 0]);

    this.onResize();
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
      .x(d => this.xScale(d.date))
      .y(d => this.yScale(d.data));
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
        <div className="tooltip" style={this.tooltipStyles}>
          Surprise!
        </div>
      </div>
    );
  }
}

export default LineChart;
