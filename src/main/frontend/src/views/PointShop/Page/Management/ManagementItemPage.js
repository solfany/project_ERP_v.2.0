import MoreItem from './MoreItem';

const { default: PointShopNav } = require('../../PointShopNav');

const ManagementItemPage = () => {
  return (
    <div className="content">
      <div className="app-content">
        <PointShopNav />
        <MoreItem />
      </div>
    </div>
  );
};
export default ManagementItemPage;
