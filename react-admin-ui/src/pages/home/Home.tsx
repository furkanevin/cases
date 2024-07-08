import BigChartBox from '../../components/bigChartBox/BigChartBox';
import ChartBox from '../../components/chartBox/ChartBox';
import TeamMembers from '../../components/members/Members';
import TopBox from '../../components/topBox/TopBox';
import {
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from '../../data';
import './home.scss';

const Home = () => {
  return (
    <div className="home">
      <section id="left">
        <div className="projects">
          <div>
            <img src="/search.svg" />
            <p className="count">40</p>
            <p className="text">
              Incoming <br /> Projects
            </p>
          </div>
          <div>
            <img src="/setting.svg" />

            <p className="count">87</p>
            <p className="text">
              In Progress <br /> Projects
            </p>
          </div>
          <div>
            <img src="/post.svg" />
            <p className="count">102</p>
            <p className="text">
              Completed <br /> Projects
            </p>
          </div>
        </div>

        <div className="box box2">
          <ChartBox {...chartBoxUser} />
          <ChartBox {...chartBoxProduct} />
          <ChartBox {...chartBoxConversion} />
          <ChartBox {...chartBoxRevenue} />
        </div>

        <div className="box box3">
          <BigChartBox />
        </div>
      </section>

      <section id="right">
        <div className="box box4">
          <TopBox />
        </div>
        <div className="box box5">
          <TeamMembers />
        </div>
      </section>

      {/* <div className="box box5">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box6">
        <BarChartBox {...barChartBoxRevenue} />
      </div> */}
    </div>
  );
};

export default Home;
