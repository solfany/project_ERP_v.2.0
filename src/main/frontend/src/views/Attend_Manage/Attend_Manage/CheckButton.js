import './CheckButton.css';

function CheckButton(handleAttendance) {
  return (
    <div className="card">
      {' '}
      <div className="CBcontent">
        <label htmlFor="big-check">
          <input
            type="checkbox"
            className="big-check"
            id="big-check"
            onClick={handleAttendance}
          />
          <div className="CBcontainer">
            <div className="blok check-a"></div>
            <div className="blok side-top"></div>
            <div className="blok check-b"></div>
            <div className="blok side-left"></div>
            <div className="blok center"></div>
            <div className="blok side-right"></div>
            <div className="blok check-d"></div>
            <div className="blok side-bottom"></div>
            <div className="blok check-c"></div>
          </div>
        </label>
      </div>
    </div>
  );
}
export default CheckButton;
