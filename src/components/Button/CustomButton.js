import './Button.css';
export default function CustomButton(props) {
  return (
    <>
      <button
        type={props.type}
        onClick={props.onClick}
        className={props.className}
      >
        <span className={props.spanClass}>{props.text}</span>
      </button>
    </>
  );
}
