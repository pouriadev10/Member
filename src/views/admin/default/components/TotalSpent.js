import React, { useEffect, useState } from "react";
// Chakra imports
import {
  Box, Text,
  useColorModeValue
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
// Controller
import { Controller } from "Controller/Controller";




export default function TotalSpent(props) {

  const [lineChartDataTotalSpentState, setLineChartDataTotalSpentState] = useState([
    {
      name: "Member",
      data: [50, 64, 48, 66, 49, 68, 70, 85, 54, 60, 12, 28],
    },
  ]
  )
  const [lineChartOptionsTotalSpentState, setLineChartOptionsTotalSpentState] = useState(
    {
      chart: {
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          top: 13,
          left: 0,
          blur: 10,
          opacity: 0.1,
          color: "#4318FF",
        },
      },
      colors: ["#4318FF", "#39B8FF"],
      markers: {
        size: 0,
        colors: "white",
        strokeColors: "#7551FF",
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true,
      },
      tooltip: {
        theme: "dark",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        type: "line",
      },
      xaxis: {
        type: "numeric",
        categories: [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG","SEP", "OCT", "NOV", "DEC"],
        labels: {
          style: {
            colors: "#A3AED0",
            fontSize: "12px",
            fontWeight: "500",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
        column: {
          color: ["#7551FF", "#39B8FF"],
          opacity: 0.5,
        },
      },
      color: ["#7551FF", "#39B8FF"],
    }
  )



  const { ...rest } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");

  const getMemberData = async () => {

    const response = await Controller.GetDashboardBarChart()
    console.log("lineChartOptionsTotalSpentState")
    var temp = []
    var tempValue = []
    for (var i in response.json) {
      temp.push(i)
      tempValue.push(response.json[i])
    }
    console.log("temp")
    console.log(temp)
    console.log(tempValue)

    temp = temp.reverse();
    tempValue = tempValue.reverse();

    setLineChartDataTotalSpentState([
      {
        name: "Member0",
        data: tempValue,
      },
    ])
    setLineChartOptionsTotalSpentState(
      {
        chart: {
          toolbar: {
            show: false,
          },
          dropShadow: {
            enabled: true,
            top: 13,
            left: 0,
            blur: 10,
            opacity: 0.1,
            color: "#4318FF",
          },
        },
        colors: ["#4318FF", "#39B8FF"],
        markers: {
          size: 0,
          colors: "white",
          strokeColors: "#7551FF",
          strokeWidth: 3,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          showNullDataPoints: true,
        },
        tooltip: {
          theme: "dark",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          type: "line",
        },
        xaxis: {
          type: "numeric",
          categories: temp,
          labels: {
            style: {
              colors: "#A3AED0",
              fontSize: "9px",
              fontWeight: "500",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        legend: {
          show: false,
        },
        grid: {
          show: false,
          column: {
            color: ["#7551FF", "#39B8FF"],
            opacity: 0.5,
          },
        },
        color: ["#7551FF", "#39B8FF"],
      }
    )

  }

  useEffect(() => {
    getMemberData();
  }, [])

  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Text
        color={textColor}
        textAlign='start'
        fontSize='22px'
        fontWeight='700'
        lineHeight='100%'>
        New Members
        
      </Text>
      <Box minH='260px' minW='75%' mt='auto'>


            <LineChart

              chartData={lineChartDataTotalSpentState}
              chartOptions={lineChartOptionsTotalSpentState}
            />

        

      </Box>

    </Card>
  );
}
