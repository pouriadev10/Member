import React from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.chartData !== this.props.chartData || prevProps.chartOptions !== this.props.chartOptions) {
      this.setState({
        chartData: this.props.chartData,
        chartOptions: this.props.chartOptions,
      });
    }
  }
  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type='pie'
        width='100%'
        height='100%'
      />
    );
  }
}

export default PieChart;