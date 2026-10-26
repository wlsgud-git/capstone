import "../css/App.css";

export const Loading = ({ text }) => {
  return (
    <div className="loading_container">
      <spinner className="spinner"></spinner>
      <span>{text}</span>
    </div>
  );
};
