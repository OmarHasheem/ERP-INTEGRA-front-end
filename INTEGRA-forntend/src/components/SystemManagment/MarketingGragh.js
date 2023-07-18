import Chart from 'react-apexcharts';
import classes from './MarketingGragh.module.scss';
import { Card } from '@mui/material';
import { useCampaignInfo, useMarketingChart } from '../../hooks/useApi';
import { Children, Fragment, useEffect, useState } from 'react';
import Loader from '../layout/Loaders/Loader';
import CountUp from 'react-countup';

const MarketingGragh = () => {
  const [firstChart, setFirstChart] = useState([]);
  const [y, sety] = useState([]);
  const [campaignDetail, setCampaignDetail] = useState([]);
  const marketingChart = useMarketingChart();
  const campaignsInfo = useCampaignInfo();
  const [chartExpectedRevenue, setChartExpectedRevenue] = useState([]);
  const [chartActualRevenue, setChartActualRevenue] = useState([]);
  const [chartItemName, setChartItemName] = useState([]);
  let socialmediaExpectedRevenues = 0;
  let socialmediaActualRevenues = 0;
  let eventExpectedRevenues = 0;
  let eventActualRevenues = 0;
  let tvExpectedRevenues = 0;
  let tvActualRevenues = 0;
  const [x, setx] = useState([]);

  useEffect(() => {
    setFirstChart(marketingChart);
  }, [marketingChart]);

  useEffect(() => {

    for (let i = 0; i < firstChart.length; i++) {
      if (firstChart[i] == null) {
        y[i] = 0;
      } else {
        y[i] = firstChart[i];
      }

    }
    y.map((info, index) => (
      chartExpectedRevenue[index] = info.expected_revenue,
        chartActualRevenue[index] = info.actual_revenue,
        chartItemName[index] = info.campaign_name
    ));
  }, [firstChart]);

  useEffect(() => {
    setCampaignDetail(campaignsInfo);
  }, [campaignsInfo]);

  useEffect(() => {
    {
      campaignDetail.map((data) => (
        data.socialmedia_Revenue.map((info) => (
          socialmediaExpectedRevenues = socialmediaExpectedRevenues + info.socialmedia_expected_revenue,
            x[0] = socialmediaExpectedRevenues,
            socialmediaActualRevenues = socialmediaActualRevenues + info.socialmedia_actual_revenue,
            x[1] = socialmediaActualRevenues
        )),
          data.events_Revenue.map((info) => (
            eventExpectedRevenues = eventExpectedRevenues + info.event_expected_revenue,
              x[2] = eventExpectedRevenues,
              eventActualRevenues = eventActualRevenues + info.event_actual_revenue,
              x[3] = eventActualRevenues
          )),
          data.TV_Revenue.map((info) => (
            tvExpectedRevenues = tvExpectedRevenues + info.tv_expected_revenue,
              x[4] = tvExpectedRevenues,
              tvActualRevenues = tvActualRevenues + info.tv_actual_revenue,
              x[5] = tvActualRevenues
          ))
      ));
    }
  }, [campaignDetail]);

  console.log(chartExpectedRevenue)
  console.log(chartActualRevenue)
  return (<Fragment>
      <Card className={classes.containar}>
        <Card className={classes.box}>
          {chartExpectedRevenue.length > 0 && <Chart
            type='donut'
            width={400}
            height={550}
            series={chartExpectedRevenue ? chartExpectedRevenue : [1, 1, 1]}
            options={{
              labels: chartItemName ? [...chartItemName] : ['A', 'B', 'C'],
              title: {
                text: 'Expected Revenue'
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      total: {
                        show: true
                      }
                    }
                  }
                }
              }
            }}

          />}
          {chartActualRevenue.length > 0 && <Chart
            type='donut'
            width={400}
            height={550}
            series={chartActualRevenue ? chartActualRevenue : [1, 1, 1]}
            options={{
              labels: chartItemName ? [...chartItemName] : ['A', 'B', 'C'],
              title: {
                text: 'Actual Revenue'
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      total: {
                        show: true
                      }
                    }
                  }
                }
              }
            }}
          />}
        </Card>
        <h1>Revenue </h1>
        {chartExpectedRevenue.length > 0 && chartActualRevenue.length > 0 && <div className={classes.childrenCard}>
          <Card className={classes.cards}><h4>Event Expected</h4>
            <div className={classes.countUp}>
              <CountUp end={x[2]} start={0} duration={3} />$
            </div>
          </Card>
          <Card className={classes.cards}><h4>Event Actual</h4>
            <div className={classes.countUp}><CountUp end={x[3]} start={0} duration={3} />$</div>
          </Card>
          <Card className={classes.cards}><h4>Socialmedia Expected</h4>
            <div className={classes.countUp}><CountUp end={x[0]} start={0} duration={3} />$</div>
          </Card>
          <Card className={classes.cards}><h4>Socialmedia Actual</h4>
            <div className={classes.countUp}><CountUp end={x[1]} start={0} duration={3} />$</div>
          </Card>
          <Card className={classes.cards}><h4>Tv Expected</h4>
            <div className={classes.countUp}><CountUp end={x[4]} start={0} duration={3} />$</div>
          </Card>
          <Card className={classes.cards}><h4>Tv Actual</h4>
            <div className={classes.countUp}><CountUp end={x[5]} start={0} duration={3} />$</div>
          </Card>
        </div>}
      </Card>
    </Fragment>
  );
};

export default MarketingGragh;