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
    this.xScale = d3.scaleTime();
    this.yScale = d3.scaleLinear();
    this.tooltipStyles = {
      opacity: 0,
      position: "absolute",
      display: "flex",
      width: "150px",
      height: "50px"
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

  createXAxis() {
    this.svg
      .append("g")
      .attr(
        "transform",
        `translate(${this.margin.left}, ${this.height + this.margin.top})`
      )
      .call(d3.axisBottom(this.xScale));
  }

  createYAxis() {
    this.svg
      .append("g")
      .attr("class", "yaxis")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisRight(this.yScale));
  }

  createMouseEffects() {
    const {
      height,
      width,
      margin: { top, bottom, left, right },
      xScale,
      yScale,
      state: { data }
    } = this;
    const dates = data.map(d => d.date);
    const money = data.map(d => d.data);
    const mouseGroup = this.svg.append("g").attr("class", "mouse-effects");
    const mouseLine = mouseGroup
      .append("path")
      .attr("class", "mouse-line")
      .style("stroke", "#3d3d3d")
      .style("stroke-width", "1px")
      .style("opacity", "0");
    const circleGroup = mouseGroup
      .append("g")
      .attr("class", "circle-group")
      .append("circle")
      .attr("r", "4")
      .style("stroke", "green")
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", 0);
    mouseGroup
      .append("svg:rect")
      .attr("transform", `translate(${left}, ${top})`)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .attr("class", "mouse-event-catcher")
      .on("mouseout", () => {
        d3.select(".mouse-line").style("opacity", "0");
        d3.select("circle").style("opacity", "0");
      })
      .on("mouseover", () => {
        d3.select(".mouse-line").style("opacity", "1");
        d3.select("circle").style("opacity", "1");
      })
      .on("mousemove", function() {
        const [x] = d3.mouse(this);
        d3
          .select(".mouse-line")
          .attr("d", () => `M${x + left},${height + top} ${x + left},0`);
      });
  }

  componentDidUpdate() {
    const { data } = this.state;
    const xDomain = data.map(d => d.date);

    this.xScale.domain(d3.extent(xDomain)).rangeRound([0, this.width]);

    this.yScale
      .domain(d3.extent(data.map(d => d.data)))
      .rangeRound([this.height, 0]);

    this.renderChart();
    this.createMouseEffects();
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
