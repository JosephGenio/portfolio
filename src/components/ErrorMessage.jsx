function ErrorMessage({ message, variant = "error" }) {
  if (!message) return null;

  const styles = {
    error: "text-red-400",
    warning: "text-accent",
  };

  return (
    <p className={`text-sm -mt-2 ${styles[variant] || styles.error}`}>
      {message}
    </p>
  );
}

export default ErrorMessage;
