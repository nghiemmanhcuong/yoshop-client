import sizeChartImg1 from '../asset/images/size-chart-img-1.webp';
import sizeChartImg2 from '../asset/images/size-chart-img-2.webp';
import sizeChartImg3 from '../asset/images/size-chart-img-3.webp';

const SizeChart = () => {
  return (
    <div className="size-chart">
        <h1 className="size-chart_title">BẢNG SIZE</h1>
        <div className="size-chart_img">
            <div className="size-chart_img_item">
                <img src={sizeChartImg1} alt="size chart image" />
            </div>
            <div className="size-chart_img_item">
                <img src={sizeChartImg2} alt="size chart image" />
            </div>
            <div className="size-chart_img_item">
                <img src={sizeChartImg3} alt="size chart image" />
            </div>
        </div>
    </div>
  )
}

export default SizeChart