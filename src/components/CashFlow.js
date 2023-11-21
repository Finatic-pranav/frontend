import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Title from "./Title";


export default function CashFlow(props) {
  
  const parentWidth = 500;
  const margin = {
    top: 10,
    right: 10,
    bottom: 20,
    left: 40,
  };
  const ticks = 6;
  const t2 = props.t

  const width = parentWidth - margin.left - margin.right;
  const height = parentWidth * 0.5 - margin.top - margin.bottom;

  const data = props.data


  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, width])
    .padding(0.26);

  const yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...data.map((d) => d.value))])
    .range([height, 0])
    .nice();
  return (
    <div>
     <Title>Total Cash Flow</Title>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <XYAxis {...{ xScale, yScale, height, ticks, t2 }} />
          <Bar
            {...{
              xScale,
              yScale,
              data,
              height,
              t2,
            }}
          />
        </g>
      </svg>
    </div>
  );
}

export function Bar(props) {
  const ref = React.useRef();

  useEffect(() => {
    init();
    return barTransition();
  }, [barTransition]);

  function barTransition() {
    const node = ref.current;
    const { yScale, height, data, t } = props;

    d3.select(node)
      .selectAll(".bar")
      .data(data)
      .transition(t)
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => height - yScale(d.value));
  }
  function init() {
    const { xScale, yScale, data, height } = props;
    const node = ref.current;

    // prepare initial data from where transition starts.
    const initialData = data.map((obj) => ({
      name: obj.name,
      value: 0,
    }));

    // prepare the field
    const bar = d3.select(node).selectAll(".bar").data(initialData);

    // add rect to svg
    bar
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.name))
      .attr("y", height)
      .attr("width", xScale.bandwidth());

    barTransition();
  }
  return <g className="bar-group" ref={ref} />;
}

export function Axis(props) {
  const ref = useRef();

  useEffect(() => {
    renderAxis();
    return updateAxis();
  }, [updateAxis]);

  function renderAxis() {
    const { scale, orient, ticks } = props;
    const node = ref.current;
    let axis;

    if (orient === "bottom") {
      axis = d3.axisBottom(scale);
    }
    if (orient === "left") {
      axis = d3.axisLeft(scale).ticks(ticks);
    }
    d3.select(node).call(axis);
  }
  function updateAxis() {
    const { scale, orient, ticks, t } = props;

    if (orient === "left") {
      const axis = d3.axisLeft(scale).ticks(ticks);
      d3.selectAll(`.${orient}`).transition(t).call(axis);
    }
  }
  const { orient, transform } = props;
  return <g ref={ref} transform={transform} className={`${orient} axis`} />;
}

export const XYAxis = ({ xScale, yScale, height, ticks, t }) => {
  const xSettings = {
    scale: xScale,
    orient: "bottom",
    transform: `translate(0, ${height})`,
    t,
  };
  const ySettings = {
    scale: yScale,
    orient: "left",
    transform: "translate(0, 0)",
    ticks,
    t,
  };
  console.log(xScale)
  return (
    <g className="axis-group">
      <Axis {...xSettings} />
    </g>
  );
};
