export default (handleChange, nameArr) =>
  [
    {
      onChange: handleChange,
      name: "name",
      type: "text",
      placeholder: "Enter your Name",
      className: "",
    },
    {
      onChange: handleChange,
      name: "email",
      type: "text",
      placeholder: "Enter your Email",
      className: "",
    },
    {
      onChange: handleChange,
      name: "password",
      type: "password",
      placeholder: "Enter your Password",
      className: "",
    },
  ].filter((field) => nameArr.includes(field.name));
