import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Title from "./Title";
import { Bar, XYAxis } from "./CashFlow";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function InvoiceOwed(props) {
  const parentWidth = 500;
  const margin = {
    top: 10,
    right: 10,
    bottom: 20,
    left: 40,
  };
  const ticks = 6;
  const t = props.t;

  const width = parentWidth - margin.left - margin.right;
  const height = parentWidth * 0.5 - margin.top - margin.bottom;

  const data = props.data;

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
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          height: 100,
        }}
      >
        <Title>Invoice Owed to you </Title>
        <div
          className="link"
        >
          {/* <input type="file" /> */}
          New Sales Invoice
        </div>
      </Grid>

      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <XYAxis {...{ xScale, yScale, height, ticks, t }} />
          <Bar
            {...{
              xScale,
              yScale,
              data,
              height,
              t,
            }}
          />
        </g>
      </svg>
    </div>
  );
}
