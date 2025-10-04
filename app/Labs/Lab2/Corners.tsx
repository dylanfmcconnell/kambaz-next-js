export default function Corners() {
  return (
    <div id="wd-corners">
      <h2>Corners</h2>
      <div className="wd-border-fat wd-border-red wd-border-solid wd-dimension-portrait wd-rounded-corners-top">
        Round corners on the top
      </div>
      <div className="wd-border-fat wd-border-red wd-border-solid wd-dimension-portrait wd-rounded-corners-bottom">
        Round corners at the bottom
      </div>
      <div className="wd-border-fat wd-border-red wd-border-solid wd-dimension-portrait wd-rounded-corners-all-around">
        Round corners all around
      </div>
      <div className="wd-border-fat wd-border-red wd-border-solid wd-dimension-portrait wd-rounded-corners-fat">
        Different rounded corners
      </div>
    </div>
  );
}