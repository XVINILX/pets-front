interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, ...buttonProps }) => {
  return (
    <button
      style={{
        width: "100%",
        border: "none",
        textAlign: "center",
        fontFamily: "Montserrat",
        cursor: "pointer",
      }}
      {...buttonProps}
      className="bg-mintgreen"
    >
      <p
        style={{
          textAlign: "center",
          fontFamily: "Montserrat",
          color: "#1E2733",
        }}
      >
        {text}
      </p>
    </button>
  );
};

export default Button;
