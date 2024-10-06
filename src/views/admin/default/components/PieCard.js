// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import { VSeparator } from "components/separator/Separator";
import { Controller } from "Controller/Controller";
import React, { useState, useEffect } from "react";

export default function Conversion(props) {
  const [duration, setDuration] = useState("month")
  const [pieChartData, setPieChartData] = useState(
    [63, 25, 12]
  )
  const [pieChartOptions, setPieChartOptions] = useState(
    {
      dataLabels: {
        enabled: false,
      },
      labels: [],
      colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
      chart: {
        width: "300",
      },
      states: {
        hover: {
          filter: {
            type: "none",
          },
        },
      },

  
      hover: { mode: null },
      plotOptions: {
        donut: {
          expandOnClick: false,

        },
      },
      fill: {
        colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
      },
      tooltip: {
        enabled: true,
        theme: "dark",
      },
    }
  )

  const getData = async () => {
    console.log("resppp")
    const response = await Controller.GetDashboardPyChart(duration)


    var temp = []
    var tempValue = []

    for (var i in response.json) {
      temp.push(i)
      tempValue.push(response.json[i])
    }
    console.log("resppp")
    console.log(temp)
    console.log(tempValue)
    setPieChartOptions({
      ...pieChartOptions,
      labels: temp
    })
    setPieChartData(
      tempValue
    )
  }


  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    getData()
  }, [duration])

  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card p='20px' align='center' direction='column' w='100%' {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
        <Text
          color={textColor}
          textAlign='start'
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Memberships

        </Text>
        <Select
          onChange={(e) => {
            //console.log(e.target.value)
            setDuration(e.target.value)
          }}
          fontSize='sm'
          variant='subtle'
          value={duration}
          width='unset'
          fontWeight='700'>
          <option value='day'>Daily</option>
          <option value='month'>Monthly</option>
          <option value='year'>Yearly</option>
        </Select>
      </Flex>

      <PieChart
        h='100%'
        w='100%'
        chartData={pieChartData}
        chartOptions={pieChartOptions}
      />
    
    </Card>
  );
}
